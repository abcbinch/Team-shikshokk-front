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
  const type = useSelector((state: RootState) => state.login.type);

  const [sideMenuVisible, setSideMenuVisible] = useState(false);

  useEffect(() => {
    console.log("id 나와라(기본키 나중에 db쿼리에서 사용) =", id);
    console.log("loginId 나와라 =", loginId);
    console.log("nickname 나와라 =", nickname);
    console.log("type 나와라 = ", type);
  }, [id, loginId, nickname, type]);

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
            {/* 비로그인 헤더 */}
            {loginId === null && (
              <>
                <Link to="/login" className="menu-item">
                  <div>로그인</div>
                </Link>
                <Link to="/signup" className="menu-item">
                  <div>회원가입</div>
                </Link>
                <div className="menu-sidebar" onClick={toggleSideMenu}>
                  <FontAwesomeIcon icon={faBars} size="4x" />
                </div>
              </>
            )}

            {/* 점주회원 헤더  */}
            {type === "business" && (
              <>
                <div className="menu-item">{nickname}님 환영합니다</div>
                <Link to="/mypage" className="menu-item">
                  <div>마이페이지</div>
                </Link>
                <Link to="/ownerOrderHistory" className="menu-item">
                  <div>주문내역</div>
                </Link>
                <Link to="/logout" className="menu-item">
                  <div>로그아웃</div>
                </Link>
                <div className="menu-sidebar" onClick={toggleSideMenu}>
                  <FontAwesomeIcon icon={faBars} size="4x" />
                </div>
              </>
            )}

            {/* 일반회원원 헤더 */}
            {type === "individual" && (
              <>
                <div className="menu-item">{nickname}님 환영합니다</div>
                <Link to="/mypage" className="menu-item">
                  <div>마이페이지</div>
                </Link>
                <Link to="/customerOrderHistory" className="menu-item">
                  <div>주문내역</div>
                </Link>
                <Link to="/logout" className="menu-item">
                  <div>로그아웃</div>
                </Link>
                <div className="menu-sidebar" onClick={toggleSideMenu}>
                  <FontAwesomeIcon icon={faBars} size="4x" />
                </div>
              </>
            )}
          </div>

          {/* 점주회원 헤더 */}
          {sideMenuVisible && type === "business" && (
            <div className="side-menu-container">
              <Link to="/mypage">
                <div className="side-menu">마이페이지</div>
              </Link>
              <Link to="/ownerOrderHistory">
                <div className="side-menu">주문내역</div>
              </Link>
              <Link to="/logout">
                <div className="side-menu">로그아웃</div>
              </Link>
            </div>
          )}

          {/* 일반회원 헤더 */}
          {sideMenuVisible && type === "individual" && (
            <div className="side-menu-container">
              <Link to="/mypage">
                <div className="side-menu">마이페이지</div>
              </Link>
              <Link to="/customerOrderHistory">
                <div className="side-menu">주문내역</div>
              </Link>
              <Link to="/logout">
                <div className="side-menu">로그아웃</div>
              </Link>
            </div>
          )}

          {sideMenuVisible && loginId === null && (
            <div className="side-menu-container">
              <Link to="/login">
                <div className="side-menu">로그인</div>
              </Link>
              <Link to="/signup">
                <div className="side-menu">회원가입</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
