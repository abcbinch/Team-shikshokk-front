import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import axios from 'axios';
import '../../styles/MyPage.scss';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>(''); // 닉네임 상태 정의

  // 사용자 정보 로드
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8082/api-server/me',
          {
            withCredentials: true,
          },
        );
        console.log('응답 데이터:', response.data); // 응답 데이터 로그 추가
        setNickname(response.data.user.nickname); // 응답에서 닉네임 설정
      } catch (error) {
        console.error('사용자 정보 로드 오류:', error);
        alert('사용자 정보를 로드하는 데 오류가 발생했습니다.');
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleDeleteMember = () => {
    if (nickname) {
      navigate(`/delete/${nickname}`); // nickname을 URL에 포함
    } else {
      alert('사용자 닉네임을 찾을 수 없습니다.'); // 경고 메시지 추가
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="card">
        <img
          src={require('../../assets/dprofile.jpg')} // 이미지 경로 수정
          alt="Profile"
          className="profile-pic"
        />
        <h2 className="username">{nickname || '사용자 이름'}</h2>
        <p className="bio"></p>
      </div>
      <div className="menu">
        <div className="menu-item">
          <h3 className="menu-title" onClick={handleEditProfile}>
            정보수정
          </h3>
        </div>
        <div className="menu-item">
          <h3 className="menu-title" onClick={handleDeleteMember}>
            회원 탈퇴
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
