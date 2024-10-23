// const express = require('express');
// const router = express.Router();

// // 세션 상태를 확인하는 라우터
// router.get('/', (req, res) => {
//   console.log('세션 상태 확인 요청 받음');

//   if (req.session.user) {
//     // 세션이 존재하는 경우
//     console.log('세션 존재:', req.session.user);
//     res.json({ loggedIn: true, user: req.session.user });
//   } else {
//     // 세션이 존재하지 않는 경우
//     console.log('세션 없음');
//     res.json({ loggedIn: false });
//     // 서버가 JSON형식으로 데이터를 보내면, 클라이언트가 JS에서 axios를 사용하여 응답을 받아서 작업함
//   }
// });

// module.exports = router;