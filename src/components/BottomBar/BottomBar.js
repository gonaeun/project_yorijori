import React from 'react';
import './BottomBar.css';

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <a href="/category" className="nav-item">
        <img className="Category" alt="Category" src="/static/img/puzzle.png" />
        <span>카테고리</span>
      </a>
      <a href="/RecipeAddPage" className="nav-item">
        <img className="Post" alt="Post" src="/static/img/message.png" />
        <span>게시글작성</span>
      </a>
      <a href="/" className="nav-item">
        <img className="Home" alt="Home" src="/static/img/home.png" />
        <span>홈</span>
      </a>
      <a href="/like" className="nav-item">
        <img className="Like" alt="Like" src="/static/img/heart.png" />
        <span>좋아요</span>
      </a>
      <a href="/mypage" className="nav-item">
        <img className="MyPage" alt="MyPage" src="/static/img/users.png" />
        <span>내 정보</span>
      </a>
    </div>
  );
};

export default BottomNav;
