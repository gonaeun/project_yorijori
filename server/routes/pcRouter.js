const express = require("express");
const router = express.Router();
const foods = require("../model/foods");

// POST 요청을 처리하여 게시글을 생성하는 라우트
router.post('/', (req, res) => {
    const { food_name, food_desc, food_video, food_recipe, food_mood, ingre_img, user_id } = req.body;

    // 필수 데이터가 누락된 경우 오류 응답 반환
    if (!food_name || !food_desc || !food_video || !food_recipe || !user_id) {
        return res.status(400).json({ message: '필수 정보가 들어오지 않았습니다.' });
    }

    const newPost = { food_name, food_desc, food_video, food_recipe, food_mood, ingre_img, user_id };

    // 데이터베이스에 새 게시글 삽입
    foods.postcreat(newPost, (err, results) => {
        if (err) {
            console.error('데이터 삽입 중 오류 발생:', err);
            return res.status(500).json({ message: '데이터 삽입 중 오류가 발생했습니다.', error: err });
        }
        return res.status(201).json({ message: '데이터가 성공적으로 삽입되었습니다.', data: results });
    });
});

module.exports = router;
