const express = require('express');
const router = express.Router();
const user = require('../model/user');

const app = express()
// const { sessionMiddleware, cookieParser } = require('../session');
// app.use(cookieParser);
// app.use(sessionMiddleware);

// 인증 미들웨어
// const authMiddleware = (req, res, next) => {
//     console.log('인증 미들웨어 호출됨');
//     console.log(`요청 URL: ${req.originalUrl}`);
//     console.log(`요청 메서드: ${req.method}`);
//     console.log(`요청 시간: ${new Date().toISOString()}`);

//     // 세션 및 유저 정보 확인
//     console.log('MypageRouter에서 세션 데이터 로그 출력:', req.session);
//     if (req.session && req.session.user) {
//         console.log('유저 인증 성공');
//         console.log(`유저 ID: ${req.session.user.id}`);
//         console.log(`유저 이름: ${req.session.user.name}`);
//         next(); // 세션에 유저 정보가 있으면, 요청을 다음 미들웨어 또는 라우트로 넘김
//     } else {
//         res.status(401).json({ message: '인증이 필요합니다.' }); // 세션에 유저 정보가 없으면, 인증 오류 반환
//     }
// };


// 프로필 라우터에 인증 미들웨어 적용 
// router.get('/profile', (req, res) => {


//     const userId = ;
//     console.log('프로필 정보 요청:', userId);

//     user.getById(userId, (error, results) => {
//         if (error) {
//             console.error('프로필 정보 가져오기 오류:', error);
//             return res.status(500).json({ message: '프로필 정보를 가져오는 중 오류가 발생했습니다.' });
//         }

//         if (results.length > 0) {
//             console.log('프로필 정보 가져오기 성공:', results[0]);
//             res.json(results[0]);
//         } else {
//             console.log('사용자 정보를 찾을 수 없음:', userId);
//             res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
//         }
//     });
// });

// 프로필 정보 라우터
router.post('/profile', (req, res) => {
    const userId = req.body.user;
    console.log('프로필 정보 요청:', userId);

    user.getById(userId, (error, results) => {
        if (error) {
            console.error('프로필 정보 가져오기 오류:', error);
            return res.status(500).json({ message: '프로필 정보를 가져오는 중 오류가 발생했습니다.' });
        }

        if (results.length > 0) {
            console.log('프로필 정보 가져오기 성공:', results[0]);
            res.json(results[0]);
        } else {
            console.log('사용자 정보를 찾을 수 없음:', userId);
            res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
        }
    });
});


// 회원 정보 수정 라우터
router.put('/edit', (req, res) => {
    const { user_id, user_nick, user_phone, user_email } = req.body;
    console.log('회원정보 수정 요청 데이터:', req.body);

    try {
        const updateInfo = { user_nick, user_phone, user_email };
        console.log('업데이트 요청 데이터:', updateInfo);

        user.update(user_id, updateInfo, (err, results) => {
            if (err) {
                console.error('회원정보 수정 에러:', err); 
                return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
            }
            console.log('회원정보 수정 결과:', results);
            res.json({ message: '회원정보가 성공적으로 수정되었습니다!' });
        });
    } catch (err) {
        console.error('회원정보 수정 중 오류 발생:', err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

// 회원 탈퇴 라우터
router.delete('/delete', async (req, res) => { 
    const userId = req.body.user;
    console.log('회원 탈퇴 요청:', userId);

    try {
        user.delete(userId, (err, results) => {
            if (err) {
                console.error('회원 탈퇴 에러:', err);
                return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
            }
            console.log('회원 탈퇴 결과:', results);
            res.json({ message: '회원 탈퇴가 성공적으로 완료되었습니다.' });
        });
    } catch (err) {
        console.error('회원 탈퇴 중 예외 발생:', err); 
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});


module.exports = router;