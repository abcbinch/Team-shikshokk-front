import React, { useState } from 'react';
import '../../styles/LoginPage.scss';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    membershipType: 'individual', // 기본값 개인회원
  });

  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    // 로그인 요청을 위한 API 호출
    try {
      const response = await fetch('http://localhost:8082/api-server/login', {
        // 수정된 API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 세션을 사용하므로 필요
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '로그인 실패');
      }

      const data = await response.json();
      console.log('로그인 성공:', data);
      // 로그인 성공 후 추가 동작 (예: 대시보드로 리다이렉트)
      alert('로그인 성공!'); // 예시로 알림 추가
      // 이곳에 대시보드로 리다이렉트하는 코드 추가 가능
    } catch (error) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-title">로그인</h1>
      <div className="membership-container">
        {/* 회원 유형 선택 박스 */}
        <div className="membership-type">
          <button
            onClick={() =>
              setFormData({ ...formData, membershipType: 'individual' })
            }
            className={formData.membershipType === 'individual' ? 'active' : ''}
          >
            개인회원
          </button>
          <button
            onClick={() =>
              setFormData({ ...formData, membershipType: 'business' })
            }
            className={formData.membershipType === 'business' ? 'active' : ''}
          >
            기업회원
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>아이디</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요"
              required
            />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
              required
            />
          </div>
          {error && <span className="error">{error}</span>}
          <button type="submit">로그인</button>
        </form>
        {/* 아이디 찾기, 비밀번호 찾기, 회원가입 링크 추가 */}
        <div className="additional-links">
          <a href="/signup">회원가입</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
