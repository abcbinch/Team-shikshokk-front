import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/DeleteMember.scss';
import Header from '../../components/Header/Header';
import axios from 'axios';

const DeleteMember: React.FC = () => {
  const { nickname } = useParams<{ nickname: string }>(); // nickname 받기
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('닉네임:', nickname);
  }, [nickname]);

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  const handleDelete = async () => {
    if (!nickname) {
      alert('탈퇴할 수 있는 사용자 정보가 없습니다.');
      return; // 리다이렉트 대신 경고 메시지 출력
    }

    if (isAgreed) {
      try {
        const response = await axios.delete(
          `http://localhost:8082/api-server/delete/${nickname}`, // nickname으로 변경
          { withCredentials: true },
        );

        alert(response.data.message);
        navigate('/login'); // 회원 탈퇴 후 로그인 페이지로 리다이렉트
      } catch (error) {
        console.error('회원 탈퇴 오류:', error);
        alert('회원 탈퇴 중 오류가 발생했습니다.');
      }
    } else {
      alert('이용 약관에 동의해주세요.');
    }
  };

  return (
    <div className="delete-member-container">
      <Header />
      <div className="content-wrapper">
        <div className="content-container">
          <h1 className="title">
            회원 탈퇴를 신청하기 전, 다음 내용을 꼭 확인해 주세요.
          </h1>
          <ul className="info-list">
            <li>
              고객 정보 및 개인형 서비스 이용 기록은 개인 정보 보호 처리 방침
              기준에 따라 삭제됩니다.
            </li>
            <li>
              회원 탈퇴 시 보유하고 계신 적립금은 회원 정보에 등록된 계좌로 3-7
              영업일 이내에 자동 이체됩니다.
            </li>
            <li>회원 탈퇴 시 더 이상 식쇽 서비스 사용이 불가능합니다.</li>
          </ul>
          <div className="agreement-container">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={handleCheckboxChange}
              className="agreement-checkbox"
            />
            <label className="agreement-label">
              안내 사항을 모두 확인하였으며, 이에 동의합니다.
            </label>
          </div>
          <div className="button-container">
            <button className="delete-button" onClick={handleDelete}>
              식쇽 회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteMember;
