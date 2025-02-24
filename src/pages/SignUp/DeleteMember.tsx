import React, { useState } from "react";
import "../../styles/DeleteMember.scss";
import Header from "../../components/Header/Header";

interface DeleteMemberProps {
  nickname?: string; // nickname을 선택적으로 변경
}

const DeleteMember: React.FC<DeleteMemberProps> = ({
  nickname = "사용자 이름",
}) => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  const handleDelete = () => {
    if (isAgreed) {
      alert("회원 탈퇴가 진행되었습니다.");
    } else {
      alert("이용 약관에 동의해주세요.");
    }
  };

  return (
    <div className="delete-member-container">
      <Header />
      <div className="content-wrapper">
        {" "}
        {/* 새로 추가된 div 그룹 */}
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
