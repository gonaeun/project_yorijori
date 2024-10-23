const express = require('express');
const router = express.Router();
const comts = require('../model/comts'); // 모델을 import

// 랜덤 food_idx를 가져오는 엔드포인트
router.get('/', (req, res) => {
    const { userId } = req.query; // 쿼리 파라미터에서 userId 추출

    if (!userId) {
        return res.status(400).json({ message: 'userId는 필수입니다.' });
    }

    comts.getRandomFoodIdx(userId, (err, result) => {
        if (err) {
            console.error('데이터베이스 오류:', err);
            return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }

        res.json(result);
    });
});

module.exports = router;