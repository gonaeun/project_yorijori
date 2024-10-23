const express = require('express');
const router = express.Router();
const foods = require('../model/foods');

// 재료를 기반으로 음식 검색
router.get('/', (req, res) => {
    // 쿼리 파라미터에서 'q'를 추출하거나 기본값을 빈 배열로 설정
    const queryParam = req.query.q;
    const ingredients = queryParam ? queryParam.split(',') : [];

    if (ingredients.length === 0) {
        return res.status(400).json({ error: 'No ingredients provided' });
    }

    foods.findMatchingFoods(ingredients, (err, results) => {
        if (err) {
            console.error('Error fetching foods by ingredients:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // 결과 반환
        res.json(results);
    });
});

module.exports = router;
