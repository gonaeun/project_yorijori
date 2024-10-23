const express = require('express');
const router = express.Router();
const user = require('../model/user');

// 로그아웃 라우터
router.post('/logout', (req, res) => {
  console.log('로그아웃 요청 수신:', req.session.user);
  
  req.session.destroy(err => {
    if (err) {
      console.error('로그아웃 도중 오류 발생:', err);
      return res.status(500).json({ message: '로그아웃 오류' });
    }
    console.log('로그아웃 완료');
    res.clearCookie('sessionId'); // 세션 쿠키 삭제
    res.json({ message: '로그아웃 완료' });
  });
});

module.exports = router;
