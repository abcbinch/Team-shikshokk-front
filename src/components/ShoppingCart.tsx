import { useEffect, useRef, useState } from "react";
import "../styles/shoppingCart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { removeMenu } from "../store/menupick/actions";
import { RootState } from "../store/rootReducer";
import Header from "./Header/Header";

// interface Pickups {
//   setItems: React.Dispatch<
//     React.SetStateAction<{ name: string; price: number }[]>
//   >;
//   // items: { name: string; price: number }[];
// }
// { setItems }: Pickups

interface MenuWithPrice {
  name: string;
  price: number;
}

export default function ShoppingCart() {
  const btnRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  // let [total, setTotal] = useState<number>(0); //이건 총합 계산

  const dispatch = useDispatch();
  const menuWithPrice = useSelector(
    (state: RootState) => state.menu.menuWithPrice
  );
  console.log("여기 menuWithPrice", menuWithPrice);
  const handleRemoveMenu = (name: string) => {
    dispatch(removeMenu(name));
  };
  const total = Array.isArray(menuWithPrice)
    ? menuWithPrice.reduce(
        (acc: number, el: MenuWithPrice) => acc + Number(el.price),
        0
      )
    : 0;

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

  // //메뉴 삭제
  // const removeMenu = (name: string) => {
  //   if (menuWithPrice.length > 0) {
  //     const updatedMenuWithPrice = menuWithPrice.filter(
  //       (el: { name: string; price: number }) => el.name !== name
  //     );
  //     setMenuWithPrice(updatedMenuWithPrice); // 새로운 배열로 상태 업데이트
  //   }
  // };

  const cartFold = () => {
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

  //리스트가 바뀔 때마다 토탈이 계산된다
  // useEffect(() => {
  //   const newTotal = menuWithPrice.reduce((acc, el) => acc + el.price, 0);
  //   // setTotal(newTotal);
  // }, [menuWithPrice]);

  return (
    <div className="cart-container" ref={cartRef}>
      <div className="fold-btn" ref={btnRef} onClick={cartFold}>
        <div className="menu-length">
          {menuWithPrice &&
            (menuWithPrice.length > 0 ? menuWithPrice.length : 0)}{" "}
        </div>
        <FontAwesomeIcon icon={faCartShopping} className="cart" />
      </div>
      <div className="pay-info">
        <ul>
          {menuWithPrice &&
            (menuWithPrice.length > 0
              ? menuWithPrice.map((el: { name: string; price: number }) => {
                  return (
                    <li>
                      {el.name} {el.price}원
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="delete-btn"
                        onClick={() => handleRemoveMenu(el.name)}
                      />
                    </li>
                  );
                })
              : "주문한 메뉴가 없습니다.")}
        </ul>
        <hr />
        <button type="submit">결제하기({total}원)</button>
      </div>
    </div>
  );
}
