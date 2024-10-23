const express = require('express');
const router = express.Router();
const foods = require('../model/foods'); // foods 모델을 불러옴

// 게시글 상세 조회 API
router.get('/', (req, res) => {
    const { food_idx } = req.query; // 쿼리 파라미터로 food_idx를 받음
    console.log('게시글 보기 요청:', food_idx);

    foods.postsee(food_idx, (err, result) => {
        if (err) {
            console.error('서버 오류 발생:', err);
            res.status(500).send('서버 오류 발생'); // 에러 발생 시
        } else {
            console.log('게시글 보기 응답:', result[0]);
            res.json(result[0]); // 조회된 게시글 정보를 JSON으로 응답
        }
    });
});

module.exports = router;
