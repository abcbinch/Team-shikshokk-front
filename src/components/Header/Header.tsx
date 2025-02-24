import { useSelector } from "react-redux";
import "../../styles/header.scss"; // Sass 파일 불러오기
import { Link } from "react-router-dom";
import { RootState } from "../../store/rootReducer";

interface HeaderProps {
  nickname: string;
}

const Header: React.FC<HeaderProps> = ({ nickname }) => {
  const loginId = useSelector((state: RootState) => state.login.loginId);
  console.log("loginId 나와라 =", loginId);
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
            <div>{nickname}님 환영합니다</div>
            <Link to="/mypage">
              <div>마이페이지</div>
            </Link>
            <Link to="/testorder">
              <div>주문내역</div>
            </Link>
            <Link to="">
              <div>로그아웃</div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
