import React, { useState, useEffect } from 'react';
import './TopBar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TopBar = () => {
  // 로그인 상태와 사용자 정보를 관리하기 위한 state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);


  console.log('메인에서 확인한 세션 값', sessionStorage.getItem('user'))
  // if (sessionStorage.getItem('user')) { console.log('로그인상태') } else {
  //   console.log('로그아웃상태')
  // }

  // 로그인 버튼 클릭 시 호출되는 함수
  const handleLogin = async () => {
    try {

      const response = await axios.post('http://localhost:4000/user/login', {
        user_id: 'testuser',
        user_pw: 'password123'
      }, { withCredentials: true });  // 세션 쿠키를 포함하여 요청
      console.log('백엔드 응답:', response);

      if (response.status === 200) {
        alert('로그인 되었습니다.');
        setIsLoggedIn(true);
        // 여기가 로그인 상태를 true로 바꾸는 곳인데, 애초에 이 페이지로 정보가 response 오지도 않음!!!!!!!!!!!!!!
        setUser(response.data.user); // 사용자 정보를 state에 저장
        console.log('로그인 성공:', response.data.user);
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
    }
  };

  // // 세션을 통해 로그인 상태 확인
  // useEffect(() => {   // useEffect 훅을 사용하여 컴포넌트가 처음 렌더링될 때 세션 상태를 확인
  //   console.log('세션 상태 확인 요청 시작');
  //   axios.get('http://localhost:4000/check-session', { withCredentials: true })  // 서버에 세션 상태를 확인하기 위한 요청
  //     .then(response => {
  //       if (response.data.user) {
  //         setIsLoggedIn(true);  // 세션에 유저 정보가 있으면 로그인 상태로 설정
  //         console.log('세션 상태 확인 성공:', response.data);
  //       } else {
  //         console.log('세션 상태 확인: 세션 없음');
  //       }
  //     })
  //     .catch(error => {
  //       console.error('세션 확인 오류:', error);
  //     });
  // }, []);  // 빈 배열을 두 번째 인수로 전달하여 컴포넌트가 처음 렌더링될 때만 실행



  // 로그아웃 버튼 클릭시
  const handleLogout = async () => {   // handleLogout 함수 호출하여 로그아웃 요청 처리
    console.log('로그아웃 요청 시작');

    // 세션삭제 
    sessionStorage.clear()
    
    alert("로그아웃합니다.")
    window.location.href="/"
  };

  return (
    <div className="top-bar">
      <a href="/notifications" className="top-bar-item">
        <img className="icon" alt="Notifications" src="/static/img/xnix-line-notification-12-1.png" />
      </a>
      <div className="spacer1"></div> {/* 왼쪽 아이템과 중앙 로고 사이 공간 */}
      <a href="/" className="top-bar-item-logo">
        <img className="icon" alt="Logo" src="/static/img/logo-s.png" />
      </a>
      <div className="spacer2"></div> {/* 왼쪽 아이템과 중앙 로고 사이 공간 */}
      {sessionStorage.getItem('user') ? (
        <button onClick={handleLogout} className="top-bar-item-login">로그아웃</button>
      ) : (
        <Link to="/login" className="top-bar-item-login">로그인</Link>
      )}
      <a href="/search" className="top-bar-item">
        <img className="icon" alt="Search" src="/static/img/search.png" />
      </a>
      <a href="/menu" className="top-bar-item">
        <img className="icon" alt="Menu" src="/static/img/xnix-line-hamburger-4-1.png" />
      </a>
    </div>
  );
};

export default TopBar;
