const express = require("express");
const router = express.Router();
const comts = require("../model/comts");

// 댓글 삭제 라우터 (DELETE 요청)
router.delete('/', (req, res) => {
    const { comments_idx, user_id } = req.query; // 쿼리 파라미터로 comments_idx와 user_id를 받음

    console.log('댓글 삭제 요청:', comments_idx, user_id);

    // 데이터베이스에서 댓글 삭제
    comts.comtsdelete(comments_idx, user_id, (err, results) => {
        if (err) {
            console.error('댓글 삭제 중 오류 발생:', err);
            return res.status(500).json({ message: '댓글 삭제 중 오류가 발생했습니다.' });
        } else if (results.affectedRows === 0) {
            console.log('삭제할 댓글을 찾을 수 없거나 권한이 없음:', comments_idx);
            return res.status(404).json({ message: '삭제할 댓글을 찾을 수 없거나 권한이 없습니다.' });
        } else {
            return res.status(200).json({ message: '댓글이 성공적으로 삭제되었습니다.', data: results });
        }
    });
});

module.exports = router;
