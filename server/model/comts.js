const conn = require("./db");

const comts = {
    // 0. 댓글 생성
    comtscreate: (comment_idx, comment_text, user_id, food_idx, food_emotion, callback) => {
        const sql = `INSERT INTO Comts (comment_idx, comment_text, user_id, food_idx, food_emotion, comments_time) VALUES (?, ?, ?, ?, ?, NOW())`;
        conn.query(sql, [comment_idx, comment_text, user_id, food_idx, food_emotion], callback);
    },
    // 댓글 보기
    comtssee: (food_idx, callback) => {
        const sql = `SELECT * FROM Comts WHERE food_idx = ?`;
        conn.query(sql, [food_idx], (err, results) => {
            if (err) {
                console.error('데이터 검색 중 오류 발생:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    
    // 1. 댓글 삭제
    comtsdelete: (comments_idx, user_id, callback) => {
        const sql = `DELETE FROM Comts WHERE comments_idx = ? AND user_id = ?`;
        conn.query(sql, [comments_idx, user_id], callback);
    },

    // 2. 댓글 수정
    comtsmodify: (comments_idx, user_id, updatedComment, callback) => {
        const sql = `UPDATE Comts SET comment_text = ?, comments_time = NOW() WHERE comments_idx = ? AND user_id = ?`;
        const { comment_text } = updatedComment;
        conn.query(sql, [comment_text, comments_idx, user_id], callback);
    },
        // 3. 특정 유저의 food_emotion = 1인 경우 food_idx와 food_name 조회
        getUserFoodIdx: (userId, callback) => {
            const sql = `
                SELECT DISTINCT f.*
                FROM Comts c
                JOIN Foods f ON c.food_idx = f.food_idx
                WHERE c.user_id = ? AND c.food_emotion = 1
            `;
            conn.query(sql, [userId], callback);
        },
    
        // 4. 모든 사용자 기준으로 food_emotion = 1인 food_idx와 food_name 조회
        getAllFoodIdx: (callback) => {
            const sql = `
                SELECT DISTINCT f.*
                FROM Comts c
                JOIN Foods f ON c.food_idx = f.food_idx
                WHERE c.food_emotion = 1
            `;
            conn.query(sql, callback);
        },
    
        // 5. 특정 유저의 food_emotion = 1이 6개 이상인지 확인하고, 랜덤으로 food_idx 6개 반환
        getRandomFoodIdx: (userId, callback) => {
            comts.getUserFoodIdx(userId, (err, userRows) => {
                if (err) return callback(err);
    
                let rowsToReturn;
    
                if (userRows.length >= 6) {
                    // 사용자의 food_emotion = 1이 6개 이상인 경우
                    rowsToReturn = userRows.sort(() => 0.5 - Math.random()).slice(0, 6);
                } else {
                    // 모든 사용자 기준으로 food_emotion = 1인 food_idx 조회
                    comts.getAllFoodIdx((err, allRows) => {
                        if (err) return callback(err);
    
                        rowsToReturn = allRows.sort(() => 0.5 - Math.random()).slice(0, 6);
                        return callback(null, { foods: rowsToReturn });
                    });
                    return;
                }
    
                return callback(null, { foods: rowsToReturn });
            });
        }
};

module.exports = comts;
