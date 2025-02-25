import { useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/header.scss"; // Sass 파일 불러오기
import { Link } from "react-router-dom";
import { RootState } from "../../store/rootReducer";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {
  const id = useSelector((state: RootState) => state.login.id);
  const loginId = useSelector((state: RootState) => state.login.loginId);
  const nickname = useSelector((state: RootState) => state.login.nickname);

  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  useEffect(() => {
    console.log("id 나와라(기본키 나중에 db쿼리에서 사용) =", id);
    console.log("loginId 나와라 =", loginId);
    console.log("nickname 나와라 =", nickname);
  }, [id, loginId, nickname]);

  const toggleSideMenu = () => {
    setSideMenuVisible(!sideMenuVisible);
  };

  return (
    <header>
      <div className="wrap-container-header">
        <div className="header-container">
          <div className="logo-container">
            <Link to="/">
              <img
                src={`${process.env.PUBLIC_URL}/assets/logo.png`}
                alt="Logo"
              />
            </Link>
          </div>
          <div className="menu-container">
            {id ? (
              <>
                <div className="menu-item">{nickname}님 환영합니다</div>
                <Link to="/mypage" className="menu-item">
                  <div>마이페이지</div>
                </Link>
                <Link to="/testorder" className="menu-item">
                  <div>주문내역</div>
                </Link>
                <Link to="" className="menu-item">
                  <div>로그아웃</div>
                </Link>
                <div className="menu-sidebar" onClick={toggleSideMenu}>
                  <FontAwesomeIcon icon={faBars} size="4x" />
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="menu-item">
                  <div> 로그인</div>
                </Link>
                <Link to="/signup" className="menu-item">
                  <div>회원가입</div>
                </Link>
                <div className="menu-sidebar" onClick={toggleSideMenu}>
                  <FontAwesomeIcon icon={faBars} size="4x" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {sideMenuVisible && (
        <div className="side-menu-container">
          <div className="side-menu">마이페이지</div>
          <div className="side-menu">주문내역</div>
          <div className="side-menu">로그아웃</div>
        </div>
      )}
    </header>
  );
};

export default Header;
