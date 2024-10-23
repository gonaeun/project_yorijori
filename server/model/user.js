const conn = require("./db");


// 사용자 정보 조회 및 저장을 위한 객체
const user = {

    // 모든 사용자 정보 조회
    getAll: (callback) => {
        const sql = "SELECT * FROM Users";
        console.log(`SQL 실행: ${sql}`);   // 모든 사용자 정보 조회시, 실행 로그 출력
        conn.query(sql, (err, results) => {   // db에 쿼리 실행
            if (err) {
                console.error('getAll 에러:', err);  // 쿼리 실행 중 에러 발생시, 에러 로그 출력
            } else {
                console.log('getAll 결과:', results);  // 쿼리 실행 결과 로그 출력
            }
            callback(err, results);   // 쿼리 실행 후, callback 함수 호출하여 에러와 결과 전댈
        });
    },

     // 사용자 정보를 DB에 저장
     // create 메서드를 통해 프론트에서 받은 회원가입 정보를 Users 테이블에 삽입
    create: (userInfo, callback) => {
        // sql 쿼리 문자열 정의 : 사용자 정보를 Users 테이블에 삽입
        const sql = `INSERT INTO Users (user_id, user_pw, user_name, user_nick, user_gender, user_phone, user_email, joined_at) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;
        // userInfo 객체에서 필요한 필드를 추출
        const { user_id, user_pw, user_name, user_nick, user_gender, user_phone, user_email } = userInfo;
        console.log(`SQL 실행: ${sql}, 파라미터:`, userInfo);

        // 데이터베이스에 쿼리 실행
        conn.query(sql, [user_id, user_pw, user_name, user_nick, user_gender, user_phone, user_email], (err, results) => {
            if (err) {
                console.error('create 에러:', err);
            } else {
                console.log('create 결과:', results);
            }
            // 쿼리 실행 후, 콜백 함수 호출하여 에러와 결과 전달
            callback(err, results);
        });
        // 데이터베이스에 쿼리 실행 - (콘솔로그 추가하기 전, 기존코드)
        // conn.query(sql, [user_id, user_pw, user_name, user_nick, user_gender, user_phone, user_email], callback);
    },

     // 사용자 이름으로 조회
     // findByUsername 메서드 추가 : 회원가입,로그인 라우터에서 중복 체크할 때 사용
    findByUsername: (username) => {
        return new Promise((resolve, reject) => {
            // sql 쿼리 문자열 정의 : 특정 사용자 이름으로 조회
            const sql = "SELECT * FROM Users WHERE user_id = ?";
            console.log(`SQL 실행: ${sql}, 파라미터: ${username}`);
            // DB에 쿼리 실행
            conn.query(sql, [username], (err, results) => {
                if (err) {
                    console.error('findByUsername 에러:', err);
                    reject(err);
                } else {
                    console.log('findByUsername 결과:', results);
                    resolve(results[0]);
                }
            });
        });
    },

    // 사용자 정보를 DB에서 업데이트
    // update 메서드 추가 : 사용자 정보 수정에 사용
    update: (userId, updateInfo, callback) => {
        // sql 쿼리 문자열 정의 : 사용자 아이디를 기준으로 닉네임, 핸드폰 번호, 이메일을 업데이트
        const sql = `UPDATE Users SET user_nick = ?, user_phone = ?, user_email = ? WHERE user_id = ?`;
        const { user_nick, user_phone, user_email } = updateInfo;
        console.log(`SQL 실행: ${sql}, 파라미터:`, updateInfo);
        
        // 데이터베이스에 쿼리 실행
        conn.query(sql, [user_nick, user_phone, user_email, userId], (err, results) => {
            if (err) {
                console.error('update 에러:', err); 
            } else {
                console.log('update 결과:', results);
            }
            // 쿼리 실행 후, 콜백 함수 호출하여 에러와 결과 전달
            callback(err, results);
        });
    },

    // 사용자 정보를 DB에서 삭제
    // delete 메서드 추가
    delete: (userId, callback) => {
        // sql 쿼리 문자열 정의 : 사용자 아이디를 기준으로 사용자 삭제
        const sql = "DELETE FROM Users WHERE user_id = ?";
        console.log(`SQL 실행: ${sql}, 파라미터: ${userId}`);
        
        // 데이터베이스에 쿼리 실행
        conn.query(sql, [userId], (err, results) => {
            if (err) {
                console.error('delete 에러:', err); 
            } else {
                console.log('delete 결과:', results);
            }
            // 쿼리 실행 후, 콜백 함수 호출하여 에러와 결과 전달
            console.log('쿼리 실행 완료, 콜백 호출');
            callback(err, results);
        });
    },

    // 특정 사용자 정보 조회
    getById: (userId, callback) => {
        const sql = "SELECT user_id, user_name, user_nick, user_phone, user_email FROM Users WHERE user_id = ?";
        console.log(`SQL 실행: ${sql}, 파라미터: ${userId}`);
        
        // 데이터베이스에 쿼리 실행
        conn.query(sql, [userId], (err, results) => {
            if (err) {
                console.error('getById 에러:', err); 
            } else {
                console.log('getById 결과:', results);
            }
            // 쿼리 실행 후, 콜백 함수 호출하여 에러와 결과 전달
            callback(err, results);
        });
    }

};


module.exports = user;