import { useEffect, useRef, useState } from "react";
import "../styles/shoppingCart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function ShoppingCart() {
  const btnRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기에 따라 isMobile 상태 업데이트
  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth <= 480) {
        setIsMobile(true); // 모바일 화면이면 true
      } else {
        setIsMobile(false); // 데스크탑 화면이면 false
      }
    };

    // 초기화 시 확인
    checkIfMobile();

    // 화면 크기 변경 시마다 호출
    window.addEventListener("resize", checkIfMobile);
    return () => {
      window.removeEventListener("resize", checkIfMobile); // 리소스 해제
    };
  }, []);

  const cartFold = () => {
    console.log(window.innerWidth);
    console.log(isMobile);
    if (!isMobile) {
      //데스크톱
      if (cartRef.current) {
        const cartStyle = getComputedStyle(cartRef.current);
        const cartRight = cartStyle.right;

        if (cartRight === "0px") {
          cartRef.current.style.right = "-400px";
        } else if (cartRight === "-400px") {
          cartRef.current.style.right = "0px";
        }
      }
    } else {
      //모바일
      if (cartRef.current) {
        const cartStyle = getComputedStyle(cartRef.current);
        const cartBottom = cartStyle.bottom;

        if (cartBottom === "-600px") {
          cartRef.current.style.bottom = "0px";
        } else if (cartBottom === "0px") {
          cartRef.current.style.bottom = "-600px";
        }
      }
    }
  };
  return (
    <div className="cart-container" ref={cartRef}>
      <div className="fold-btn" ref={btnRef} onClick={cartFold}>
        <div className="menu-length hidden"></div>
        <FontAwesomeIcon icon={faCartShopping} className="cart" />
      </div>
      <div className="pay-info">
        <ul>
          <li>주문한 메뉴</li>
          <li>주문한 메뉴</li>
          <li>주문한 메뉴</li>
          <li>주문한 메뉴</li>
        </ul>
        <hr />그 외 주문 옵션 나오는 공간
        <button type="submit">결제하기(50,000원)</button>
      </div>
    </div>
  );
}
