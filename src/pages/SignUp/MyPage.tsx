import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/rootReducer"; // 경로 수정
import {
  setUserId,
  setLoginId,
  setNickname,
  setType,
} from "../../store/login/actions"; // 경로 수정
import Header from "../../components/Header/Header"; // 경로 수정
import axios from "axios";
import "../../styles/MyPage.scss"; // 경로 수정
import profileImage from "../../assets/dprofile.jpg"; // import 형식으로 수정

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // dispatch 훅 사용
  const loginId = useSelector((state: RootState) => state.login.loginId);
  const nicknameFromStore = useSelector(
    (state: RootState) => state.login.nickname
  );
  const type = useSelector((state: RootState) => state.login.type);

  // 사용자 정보 로드
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_SERVER}/me`,
          {
            withCredentials: true,
          }
        );
        console.log("응답 데이터:", response.data);
        const { id, loginId, nickname, membershipType, storeId } =
          response.data.user;
      } catch (error) {
        console.error("사용자 정보 로드 오류:", error);
        alert("사용자 정보를 로드하는 데 오류가 발생했습니다.");
      }
    };

    fetchUserData();
  }, [nicknameFromStore, dispatch]);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleDeleteMember = () => {
    if (nicknameFromStore) {
      navigate(`/delete/${nicknameFromStore}`);
    } else {
      alert("사용자 닉네임을 찾을 수 없습니다.");
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="card">
        <img
          src={profileImage} // import한 이미지 사용
          alt="Profile"
          className="profile-pic"
        />
        <h2 className="username">{nicknameFromStore || "사용자 이름"}</h2>
        <p className="bio">로그인 ID: {loginId}</p> {/* 로그인 ID 표시 */}
        <p className="bio">회원 유형: {type}</p> {/* 회원 유형 표시 */}
        <p className="bio">
          가게 ID:{" "}
          {useSelector((state: RootState) => state.login.shopId) ||
            "가게 ID 없음"}
        </p>{" "}
        {/* 가게 ID 표시 */}
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
