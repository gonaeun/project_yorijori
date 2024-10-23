const express = require('express');
const router = express.Router();
const favorite = require('../model/favorite'); // 이 모듈이 데이터베이스와 연결됨

// 북마크 추가
router.post('/add', async (req, res) => {
  const { userId, foodIdx } = req.body;
  try {
    await favorite.addFavorite(userId, foodIdx);
    res.json({ message: '즐겨찾기가 추가되었습니다.' });
  } catch (error) {
    console.error('즐겨찾기 추가 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 북마크 제거
router.post('/remove', async (req, res) => {
  const { userId, foodIdx } = req.body;
  try {
    await favorite.removeFavorite(userId, foodIdx);
    res.json({ message: '즐겨찾기가 제거되었습니다.' });
  } catch (error) {
    console.error('즐겨찾기 제거 오류:', error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
});

// 즐겨찾기 확인
router.get('/check', (req, res) => {
    const { userId, foodIdx } = req.query;

    if (!userId || !foodIdx) {
        return res.status(400).json({ message: 'userId와 foodIdx는 필수입니다.' });
    }

    favorite.checkFavorite(userId, foodIdx, (err, isFavorite) => {
        if (err) {
            console.error('즐겨찾기 확인 오류:', err);
            return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
        }

        res.json({ isFavorite });
    });
});


module.exports = router;
