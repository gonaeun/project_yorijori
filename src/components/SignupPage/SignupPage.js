import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css'; // 기존 CSS 파일 가져오기
import axios from 'axios';
import TopBar from '../TopBar/TopBar.js';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: '',
    user_pw: '',
    confirmPassword: '',
    user_name: '',
    user_nick: '',
    user_phone: '',
    user_gender: '',
    user_email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.user_pw !== formData.confirmPassword) {
      alert('비밀번호 일치하지 않음');
      return;
    }

    try {
      console.log('회원가입 시도:', formData);
      const response = await axios.post("http://localhost:4000/user/signup", formData);
      console.log('서버 응답:', response);
      if (response.status === 200) {
        alert('회원가입 성공');
        navigate('/login');
      } else {
        alert('회원가입 실패');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('회원가입 도중 오류 발생');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="SignupPage">
      <TopBar />
      <h1>회 원 가 입</h1>
      <form onSubmit={handleSubmit}>
        <div className="group-1">
          <div className="view">
            <img className="star" alt="star" src="/static/img/xnix-line-star.png" />
            <input
              type="text"
              id="username"
              name="user_id"
              placeholder="아이디 입력"
              value={formData.user_id}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="view-2">
            <img className="star" alt="star" src="/static/img/xnix-line-star.png" />
            <input
              type="password"
              id="password"
              name="user_pw"
              placeholder="비밀번호 입력"
              value={formData.user_pw}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="view-3">
            <img className="star" alt="star" src="/static/img/xnix-line-star.png" />
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="비밀번호 입력 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="view-4">
            <img className="star" alt="star" src="/static/img/xnix-line-star.png" />
            <input
              type="text"
              id="fullName"
              name="user_name"
              placeholder="회원 이름 입력"
              value={formData.user_name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="view-5">
            <img className="star" alt="star" src="/static/img/xnix-line-star.png" />
            <input
              type="text"
              id="nickname"
              name="user_nick"
              placeholder="사용할 닉네임 입력"
              value={formData.user_nick}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="view-6">
            <img className="star" alt="star" src="/static/img/xnix-line-star.png" />
            <input
              type="text"
              id="phone"
              name="user_phone"
              placeholder="핸드폰 번호 입력"
              value={formData.user_phone}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="view-7">
            <img className="star" alt="star" src="/static/img/xnix-line-star.png" />
            <label className="gender-label">
              <input type="radio" name="user_gender" value="male" checked={formData.user_gender === 'male'} onChange={handleChange} required />
              <img className="male" alt="male" src="/static/img/xnix-line-male.png" />남성
            </label>
            <label className="gender-label">
              <input type="radio" name="user_gender" value="female" checked={formData.user_gender === 'female'} onChange={handleChange} required /> 
              <img className="female" alt="female" src="/static/img/xnix-line-female.png" />여성
            </label>
          </div>
          <div className="view-8">
            <input
              type="text"
              id="phone"
              name="user_email"
              placeholder="이메일 입력(선택)"
              value={formData.user_email}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="group-2">
            <button type="submit" className="view-10">회원가입</button>
            <button type="button" onClick={handleCancel} className="view-9">취소</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
