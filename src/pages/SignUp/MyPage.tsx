import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header'; // 헤더 임포트
import '../../styles/MyPage.scss';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const nickname = 'admin1234'; // nickname 정의

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleDeleteMember = () => {
    navigate('/delete');
  };

  return (
    <div className="container">
      <Header nickname={nickname} /> {/* nickname 속성 전달 */}
      <div className="card">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="profile-pic"
        />
        <h2 className="username">{nickname}</h2>
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
