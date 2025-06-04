# 🧑🏻‍🍳 project yorijori
![image](https://github.com/user-attachments/assets/4dcfb83a-b752-4f90-aad0-d1f35e7bc448)
> 식재료 기반 음식 검색 및 사용자 취향 추천 서비스

</br>

## 1. 제작 기간 & 참여 인원
- 2024년 7월 19일 ~ 8월 02일
- 5인 (강우석, 권하은, 김훈민, 이채원, 임지훈)

</br>

## 2. 사용 기술
![image](https://github.com/user-attachments/assets/13bd07f0-f6cf-412d-aee6-9b1d1922c79d)


</br>

## 3. ERD 설계
![image](https://github.com/user-attachments/assets/ef192af1-1d1c-4543-b513-7ca6d3d9b9ba)



## 4. 핵심 기능
해당 서비스의 핵심 기능은 사용자의 식재료 키워드 or 이미지 기반 검색 기반을</br>
통해 관련 식재료에 따른 음식을 추천하는 서비스 입니다.</br>
 또한 로그인을 할시 댓글 또는 음식 게시판 정보를 바탕으로 AI를 통해 사용자가 </br>
선호하는 음식을 추천하도록 알고리즘을 구현하였습니다.</br>
 마지막으로 해당 프로젝트는 Front_end와 Back_end를 개별 관리하며 프로젝트 오류를 최소화 하엿습니다.</br>


### 시스템 아키텍처
![image](https://github.com/user-attachments/assets/5b5fdbaa-24f4-4a3f-af3c-c0237d7628ba)


</br>

## 5. 핵심 트러블 슈팅
### 5.1. 데이터 과적합 문제
- 내용 : 데이터 세트의 데이터 불균형에 따른 결과값 오류 문제
- 문제 : 데이터의 긍정 부정의 데이터 양의 불균형
- 해결 : 가중치 조절을 통해 문제 해결
![image](https://github.com/user-attachments/assets/c0b8767c-e577-44c7-b80b-fe91828159d1)

### 5.2. React 컴포넌트 오류 문제
- 내용 : React 컴포넌트된 페이지의 출력 문제 
- 문제 : React 컴포넌트 충돌로 발생한 다중 출력 및 화면 정지
- 해결 : 의존성 배열의 재선언 및 주석을 통해 협업 관리</br>
![image](https://github.com/user-attachments/assets/7c5a1234-dadc-4e16-b774-7599ecf64cfd)

### 5.3. 협업도구 관리 문제
- 내용 : 헙업도구 활용에 불편한 
- 문제 : React 및 node.js & express를 활용에 node_modules의 깃허브 업로딩
- 해결 : .gitignore을 활용하여 node_modules의 업로드 방지</br>
![image](https://github.com/user-attachments/assets/f5826db5-afec-40a8-a256-10d1bbb6eb26)




<br>

## 6. 팀원 소개
|강우석|권하은|김훈민|이채원|임지훈|
|:---:|:---:|:---:|:---:|:---:|
|Back-End, <br> Front-End|Back-End|AI|Front-End|Front-End|
|- DB 설계<br>- Back-end환경구축<br>- Back-end API구현<br>- 크롤링(데이터 수집)<br>- Front-End API호출(댓글,게시글 관련)<br> |- Back-end API구현<br>- Front-End API호출(댓글,게시글 관련)<br>|- Flask 서버 구축<br>- 머신러닝 모델 학습 및 구현<br><br>|- UI/UX 구현<br>- Figma를 활용한 디자인 구현<br>- React기반 구축|- UI/UX 구현<br>- Figma를 활용한 디자인 구현<br>- React기반 구축



## 7. 실행 방법
- 서버1 npm start
- 서버2 nodemon MainRouter.js


