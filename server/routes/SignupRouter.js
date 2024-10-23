const express = require('express');
const router = express.Router();
const user = require('../model/user');  // 사용자 모델 불러오기

const bcrypt = require('bcrypt');  // npm install bcrypt 설치 필요
const saltRounds = 10; // 비밀번호 해싱을 위한 솔트 라운드 수 (해싱 알고리즘의 복잡성 결정)



// 회원가입 요청을 처리하고 사용자 정보를 DB에 저장
router.post('/', async (req, res) => {
    // 회원가입 창에서 입력받은 데이터를 추출
    const { user_id, user_pw, user_name, user_nick, user_gender, user_phone, user_email } = req.body;

    try {
        console.log('회원가입 시도:', { user_id, user_name, user_nick, user_gender, user_phone, user_email });

        // 중복 아이디 체크
        const existingUser = await user.findByUsername(user_id);  // db에서 아이디로 사용자 검색
        if (existingUser) {   // 이미 존재하는 아이디인 경우
            console.log('이미 존재하는 아이디:', user_id);
            return res.status(400).json({ message: '이미 존재하는 아이디입니다.' });
        }

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(user_pw, saltRounds);  // 비밀번호를 해싱하여 보안 강화

        // 사용자 정보 객체 생성
        const userInfo = { 
            user_id,
            user_pw: hashedPassword, // 해싱된 비밀번호 저장
            user_name,
            user_nick,
            user_gender,
            user_phone,
            user_email };

        console.log('해싱된 비밀번호:', hashedPassword);


        // 사용자 정보 저장
        user.create(userInfo, (err, results) => {
            if (err) {
                console.error('회원가입 중 오류 발생:', err); 
                return res.status(500).json({ message: '서버 오류가 발생했습니다.' });  // 서버 오류 메세지 반환(상태코드 500)
            }
            console.log('회원가입 성공:', results);
            res.json({ message: '회원가입이 성공적으로 완료되었습니다!' });
        });
    } catch (err) {
        console.error('서버 오류 발생:', err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });   // 서버 오류 메세지 반환(상태코드 500)
    }
});

module.exports = router;
