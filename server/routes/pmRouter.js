const express = require('express');
const router = express.Router();
const foods = require('../model/foods'); // foods 모델을 불러옴

// 게시글 수정 라우터 (PUT 요청)
router.put('/', (req, res) => {
    const { food_idx, food_name, food_desc, food_video, food_recipe, food_mood, ingre_img, user_id } = req.body;

    if (!food_idx || !user_id) {
        return res.status(400).send('food_idx와 user_id는 필수입니다.');
    }

    const updatedPost = {
        food_name,
        food_desc,
        food_video: food_video === 'null' ? null : food_video,
        food_recipe,
        food_mood,
        ingre_img: ingre_img === 'null' ? null : ingre_img
    };

    console.log('게시글 수정 요청:', food_idx, updatedPost);

    foods.postmodify(food_idx, user_id, updatedPost, (err, result) => {
        if (err) {
            console.error('서버 오류 발생:', err);
            return res.status(500).send('서버 오류 발생');
        }
        if (result.affectedRows === 0) {
            console.log('게시글을 찾을 수 없거나 권한이 없음:', food_idx);
            return res.status(404).send('게시글을 찾을 수 없거나 권한이 없습니다.');
        }
        console.log('게시글 수정 응답:', result);
        res.json({ message: '게시글이 수정되었습니다.', result });
    });
});

module.exports = router;
