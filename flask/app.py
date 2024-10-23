from flask import Flask, request, jsonify
import torch
from transformers import BertTokenizer, BertForSequenceClassification
import mysql.connector
from mysql.connector import Error
import torch.nn.functional as F

# Flask 애플리케이션 생성
app = Flask(__name__)

# 모델 및 토크나이저 로드
model_path = 'yorijori_model.pth'  # 모델 가중치 파일 경로
# 사전 훈련된 BERT 모델 로드 (이 모델은 2개의 레이블로 분류하는 모델)
model = BertForSequenceClassification.from_pretrained('monologg/kobert', num_labels=2)
# 모델 가중치를 로드 (CPU에서 로드)
model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
model.eval()  # 모델을 평가 모드로 설정

# BERT 토크나이저 로드
tokenizer = BertTokenizer.from_pretrained('monologg/kobert')

def preprocess_comment(comment):
    # 댓글을 BERT 모델의 입력 형식으로 변환하는 함수.
    inputs = tokenizer.encode_plus(
        comment,
        add_special_tokens=True,  # [CLS]와 [SEP] 토큰 추가
        max_length=128,  # 최대 길이 설정
        padding='max_length',  # 길이를 최대 길이에 맞게 패딩
        return_tensors='pt',  # PyTorch 텐서로 반환
        truncation=True  # 최대 길이를 초과하는 경우 잘라냄
    )
    return inputs['input_ids'], inputs['attention_mask']

def predict_sentiment(comment):
    # 댓글의 감정을 예측하는 함수.
    input_ids, attention_mask = preprocess_comment(comment)
    with torch.no_grad():
        # 모델에 입력을 전달하여 예측
        outputs = model(input_ids, attention_mask=attention_mask)
        logits = outputs.logits
        probabilities = F.softmax(logits, dim=-1)  # 로짓을 확률로 변환
        predicted_label = torch.argmax(probabilities, dim=1).item()  # 가장 높은 확률의 레이블 선택
    sentiment = 'positive' if predicted_label == 1 else 'negative'
    return sentiment

def get_db_connection():
    # MySQL 데이터베이스에 연결하는 함수.
    try:
        connection = mysql.connector.connect(
            host='project-db-stu3.smhrd.com',
            port=3307,
            user='Insa5_JSB_hacksim_1',
            password='aischool1',
            database='Insa5_JSB_hacksim_1',
            charset='utf8mb4',  # 여기서 charset을 utf8mb4로 설정
            use_unicode=True  # 유니코드 사용 설정
        )
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None

@app.route('/')
def home():
    return '연결 완료', 200

@app.route('/submit', methods=['POST'])
def submit():
    # 댓글을 제출하고 감정을 예측하여 데이터베이스에 저장하는 엔드포인트.
    data = request.json
    comments_idx = data.get('comments_idx')
    comment_text = data.get('comment_text')
    user_id = data.get('user_id')
    food_idx = data.get('food_idx')

    # 필수 파라미터가 누락된 경우 오류 응답 반환
    if not comments_idx or not comment_text or not user_id or not food_idx:
        return jsonify({'status': 'error', 'message': 'Missing one or more fields'}), 400

    # 감정 예측
    sentiment = predict_sentiment(comment_text)
    # 'positive'와 'negative'를 1과 0으로 매핑
    food_emotion = 1 if sentiment == 'positive' else 0

    connection = get_db_connection()
    if connection:
        cursor = connection.cursor()
        try:
            # 댓글, 사용자 ID, 음식 인덱스와 예측된 감정을 데이터베이스에 저장
            cursor.execute(
                "INSERT INTO Comts (comments_idx, comment_text, user_id, food_idx, food_emotion, comments_time) VALUES (%s, %s, %s, %s, %s, NOW())",
                (comments_idx, comment_text, user_id, food_idx, food_emotion)
            )
            connection.commit()
            response = {'status': 'success', 'message': 'Data inserted successfully', 'sentiment': sentiment}
        except Error as e:
            response = {'status': 'error', 'message': str(e)}
        finally:
            cursor.close()
            connection.close()
    else:
        response = {'status': 'error', 'message': 'Failed to connect to database'}

    return jsonify(response), 200 if response['status'] == 'success' else 400

@app.route('/comments', methods=['GET'])
def get_comments():
    # 데이터베이스에서 모든 댓글을 조회하는 엔드포인트.
    connection = get_db_connection()
    if connection:
        cursor = connection.cursor(dictionary=True)
        try:
            # 댓글 데이터 조회
            cursor.execute("SELECT * FROM Comts")  # 테이블 이름을 Comts로 수정
            rows = cursor.fetchall()
            response = {'status': 'success', 'data': rows}
        except Error as e:
            response = {'status': 'error', 'message': str(e)}
        finally:
            cursor.close()
            connection.close()
    else:
        response = {'status': 'error', 'message': 'Failed to connect to database'}

    return jsonify(response), 200 if response['status'] == 'success' else 400

if __name__ == '__main__':
    # 애플리케이션을 실행
    app.run(host='localhost', port=5000, debug=False)
