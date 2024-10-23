const express = require('express');
const router = express.Router();
const comts = require('../model/comts');

// 댓글 생성 라우터
router.post('/', (req, res) => {
    const { comment_idx, comment_text, user_id, food_idx, food_emotion } = req.body;

    if (!comment_idx || !comment_text || !user_id || !food_idx || !food_emotion) {
        return res.status(400).json({ error: '모든 필드 입력해야합니다.' });
    }

    comts.comtscreate(comment_idx, user_id, comment_text, food_idx, food_emotion, (err, results) => {
        if (err) {
            return res.status(500).json({ error: '댓글 생성 실패', details: err });
        }
        res.status(201).json({ message: '댓글 생성 성공', data: results });
    });
});

module.exports = router;
