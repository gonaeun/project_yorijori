const express = require('express');
const router = express.Router();
const user = require('../model/user');
const bcrypt = require('bcrypt');   // npm install bcrypt 설치 필요
// bcrypt : 비밀번호를 안전하게 해싱하고 저장하는데 사용되는 라이브러리
// 비밀번호 해싱(Hashing) : 사용자가 입력한 비밀번호를 해시 값으로 변환하여 DB에 저장
const app = express()
const { sessionMiddleware, cookieParser } = require('../session');
app.use(cookieParser);
app.use(sessionMiddleware);

// 로그인 요청을 처리하고 사용자 인증
router.post('/', async (req, res) => {
    const { user_id, user_pw } = req.body;   // 사용자의 아이디, 비밀번호 추출

    try {
        console.log('로그인 시도:', { user_id, user_pw });

        // 사용자 아이디 조회
        const foundUser = await user.findByUsername(user_id);

        if (!foundUser) {
            console.log('사용자를 찾을 수 없습니다:', user_id);
            return res.status(400).json({ message: '사용자를 찾을 수 없습니다.' });
        } // 사용자가 db에 존재하지 않는 경우, 400 코드와 오류메세지 반환

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(user_pw, foundUser.user_pw); // 입력된 비밀번호와 db에 저장된 해시된 비밀번호 비교
        if (!isMatch) {
            console.log('비밀번호 불일치:', user_id);
            return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
        } // 일치하지 않는 경우, 오류메세지 반환




        // 세션 데이터 로그 출력


        // req.session.save(() => {
        //     // 세션에 사용자 정보 저장!!!!!!!!!!!! 여기까지도 잘 됨
        //     req.session.user = {
        //         user_id: foundUser.user_id,
        //         user_name: foundUser.user_name,
        //         user_nick: foundUser.user_nick,
        //         user_email: foundUser.user_email
        //     };
        //     console.log('세션 등록 완료:', req.session.user.user_id);
        // })
        
        res.json({ message: '로그인 성공', user: foundUser.user_id });  // 성공 메세지와 함께 사용자 정보 반환

        // 서버 오류 처리
    } catch (err) {
        console.error('서버 오류 발생:', err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});





module.exports = router;