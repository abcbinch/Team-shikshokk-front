import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import Header from '../../components/Header/Header';
import axios from 'axios';
import '../../styles/MyPage.scss';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const id = useSelector((state: RootState) => state.login.id);
  const loginId = useSelector((state: RootState) => state.login.loginId);
  const nicknameFromStore = useSelector(
    (state: RootState) => state.login.nickname,
  );
  const type = useSelector((state: RootState) => state.login.type);

  // 닉네임 상태 정의
  const [nickname, setNickname] = useState<string>(nicknameFromStore || ''); // 초기값을 빈 문자열로 설정

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
        console.log('응답 데이터:', response.data);
        setNickname(response.data.user.nickname || nicknameFromStore || ''); // 응답에서 닉네임 설정
      } catch (error) {
        console.error('사용자 정보 로드 오류:', error);
        alert('사용자 정보를 로드하는 데 오류가 발생했습니다.');
      }
    };

    fetchUserData();
  }, [nicknameFromStore]);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleDeleteMember = () => {
    if (nickname) {
      navigate(`/delete/${nickname}`);
    } else {
      alert('사용자 닉네임을 찾을 수 없습니다.');
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="card">
        <img
          src={require('../../assets/dprofile.jpg')}
          alt="Profile"
          className="profile-pic"
        />
        <h2 className="username">{nickname || '사용자 이름'}</h2>
        <p className="bio">로그인 ID: {loginId}</p> {/* 로그인 ID 표시 */}
        <p className="bio">회원 유형: {type}</p> {/* 회원 유형 표시 */}
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
