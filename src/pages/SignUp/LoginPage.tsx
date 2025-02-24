import React, { useState } from "react";
import "../../styles/LoginPage.scss";
import Header from "../../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import * as T from "../../store/login";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
    membershipType: "individual", // 기본값 개인회원
  });

  //로그인 상태관리 리덕스 커스텀 훅
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("폼데이터 확인 = ", formData);
    if (!formData.user_id || !formData.password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    // 로그인 요청을 위한 API 호출
    try {
      const response = await fetch("http://localhost:8082/api-server/login", {
        // 수정된 API URL
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 세션을 사용하므로 필요
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "로그인 실패");
      }

      const data = await response.json();
      console.log("결과값 = :", data);

      if (data.isSuccess) {
        alert("로그인 성공!"); // 예시로 알림 추가

        // 로그인 아이디 저장 리덕스에
        dispatch(T.setLoginId(data.user.user_id));
        //기본키 id 저장 나중에 db 쿼리사용할때 사용
        dispatch(T.setUserId(data.user.id));
        //헤더에서 닉네임 표시위한 리덕스 저장
        dispatch(T.setNickname(data.user.nickname));
      } else {
        alert("로그인 실패!"); // 예시로 알림 추가
      }
    } catch (error) {
      setError("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Header />
      <div className="login-page">
        <h1 className="login-title">로그인</h1>
        <div className="membership-container">
          {/* 회원 유형 선택 박스 */}
          <div className="membership-type">
            <button
              onClick={() =>
                setFormData({ ...formData, membershipType: "individual" })
              }
              className={
                formData.membershipType === "individual" ? "active" : ""
              }
            >
              개인회원
            </button>
            <button
              onClick={() =>
                setFormData({ ...formData, membershipType: "business" })
              }
              className={formData.membershipType === "business" ? "active" : ""}
            >
              기업회원
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>아이디</label>
              <input
                type="text"
                name="user_id"
                value={formData.user_id}
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
    </>
  );
};

export default LoginPage;
