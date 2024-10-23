const express = require('express');
const router = express.Router();
const comts = require('../model/comts'); // comts 모델을 불러옴

router.get('/', (req, res) => {
    const { food_idx } = req.query; // 쿼리 파라미터로 food_idx를 받음
    console.log('댓글:', food_idx);

    comts.comtssee(food_idx, (err, result) => {
        if (err) {
            console.error('서버 오류 발생:', err);
            res.status(500).send('서버 오류 발생'); // 에러 발생 시
        } else {
            console.log('댓글 보기 응답:', result);
            res.json(result); // 조회된 댓글 정보를 JSON으로 응답
        }
    });
});

module.exports = router;
