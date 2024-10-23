const express = require("express");
const router = express.Router();
const comts = require("../model/comts"); // comts 모델을 불러옴

// 댓글 수정 라우터 (PUT 요청)
router.put('/', (req, res) => {
    const { comments_idx, user_id } = req.query; // 쿼리 파라미터로 comments_idx와 user_id를 받음
    const { comment_text, food_emotion } = req.body;
    const updatedComment = { comment_text, food_emotion };

    console.log('댓글 수정 요청:', comments_idx, updatedComment);

    comts.comtsmodify(comments_idx, user_id, updatedComment, (err, results) => {
        if (err) {
            console.error('댓글 수정 중 오류 발생:', err);
            return res.status(500).json({ message: '댓글 수정 중 오류가 발생했습니다.' });
        } else if (results.affectedRows === 0) {
            console.log('수정할 댓글을 찾을 수 없거나 권한이 없음:', comments_idx);
            return res.status(404).json({ message: '수정할 댓글을 찾을 수 없거나 권한이 없습니다.' });
        } else {
            return res.status(200).json({ message: '댓글이 성공적으로 수정되었습니다.', data: results });
        }
    });
});

module.exports = router;
