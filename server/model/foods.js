const conn = require("./db"); // 데이터베이스 연결 모듈을 불러옴

// 게시글 관련 모델 설정
const foods = {
    // 1. 게시글 등록 API
    postcreat: (postcreat, callback) => {
        const sql = `INSERT INTO Foods(food_name, food_desc, food_video, food_recipe, food_mood, ingre_img, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const { food_name, food_desc, food_video, food_recipe, food_mood, ingre_img, user_id } = postcreat;

        conn.query(sql, [food_name, food_desc, food_video, food_recipe, food_mood, ingre_img, user_id], (err, results) => {
            if (err) {
                console.error('데이터 삽입 중 오류 발생:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    },


     // 2. 게시글 보기 API
     postsee: (food_idx, callback) => {
        const sql = `SELECT * FROM Foods WHERE food_idx = ?`;
        conn.query(sql, [food_idx], (err, results) => {
            if (err) {
                console.error('데이터 검색 중 오류 발생:', err);
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    
    // 3. 게시글 수정 API
    postmodify: (food_idx, user_id, updatedPost, callback) => {
        const sql = `
            UPDATE Foods
            SET food_name = ?, food_desc = ?, food_video = ?, food_recipe = ?, food_mood = ?, ingre_img = ?
            WHERE food_idx = ? AND user_id = ?
        `;
    const { food_name, food_desc, food_video, food_recipe, food_mood, ingre_img } = updatedPost;
    conn.query(sql, [food_name, food_desc, food_video, food_recipe, food_mood, ingre_img, food_idx, user_id], callback);
    },
    // 4. 게시글 삭제 API
    postdelete: (food_idx, user_id, callback) => {
        const sql = `DELETE FROM Foods WHERE food_idx = ? AND user_id = ?`;
        conn.query(sql, [food_idx, user_id], callback);
    },
    // 5. 키워드 검색 API
    findMatchingFoods: (ingredients, callback) => {
        if (ingredients.length === 0) {
            return callback(null, []);
        }

        // 각 재료를 '%재료%' 형태로 변환하여 LIKE 쿼리에 포함
        const conditions = ingredients.map(() => 'food_mood LIKE ?').join(' AND ');
        const values = ingredients.map(ingredient => `%${ingredient}%`);
        const query = `SELECT * FROM Foods WHERE ${conditions}`;

        conn.query(query, values, callback);
    }
    
};

module.exports = foods; // foods 객체를 외부에서 사용할 수 있도록 내보냄
