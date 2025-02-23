import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import "..//styles/shopDetail.scss";
import ShoppingCart from "../components/ShoppingCart";

interface Menus {
  menuName: string;
  category: string;
  price: number;
  menudesc: string;
}
export default function CustomerShopDetail() {
  let [isShow, setIsShow] = useState(false);
  let [menuArr, setMenuArr] = useState<Menus[]>([]);
  let [categoryArr, setCategoryArr] = useState<string[]>([]);

  //메뉴 전체 조회 axios
  useEffect(() => {
    const menuList = async () => {
      const response = await axios.get(
        "http://localhost:8082/api-server/menu-list"
      );
      console.log("response data", response.data);

      let result = response.data.map((el: Menus) => {
        const { menuName, price, menudesc, category } = el;
        return { menuName, price, menudesc, category };
      });

      console.log("result", result);

      setMenuArr((prevMenuArr) => [
        // ...prevMenuArr, // 기존 메뉴 항목들
        ...result,
        // {
        //   mname: menuName,
        //   mprice: price,
        //   mdesc: menudesc,
        //   mcategory: category,
        // }, // 새로운 메뉴 객체 추가
      ]);
      //이제 이 state를 map으로 돌리면 된다.
    };

    menuList();
  }, []);

  //menuArr 확인용.
  useEffect(() => {
    console.log("menuArr", menuArr); // menuArr가 업데이트 된 후 이 코드가 실행됩니다.
    let categories = [...new Set(menuArr.map((el) => el.category))];
    setCategoryArr(categories);

    console.log("categories", categories);
  }, [menuArr]);

  return (
    <main className="max-w-7xl m-auto">
      <div className="shop-image-container">
        <div className="img-sample"></div>
      </div>
      <hr />
      {/* 메뉴 탭 */}
      <ul className="menu-tab flex list-none">
        <li className="choose">전체 메뉴</li>
        {categoryArr.map((el) => {
          return <li>{el}</li>;
        })}
      </ul>

      {/* 메뉴 보드들 */}
      {categoryArr.map((comp) => {
        return (
          <div>
            <hr className="mb-3" />

            <span className="bg-gray-100 text-gray-800 text-xl font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">
              {comp}
            </span>

            <ul className="menu-board flex list-none overflow-x-scroll">
              {menuArr.map((mel) => {
                if (comp === mel.category) {
                  return (
                    <li>
                      <div className="icon-box"></div>
                      <div className="img-box"></div>
                      <p>{mel.menuName}</p>
                      <p>{mel.price}</p>
                      <div className="content-box">{mel.menudesc}</div>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        );
      })}
      <ShoppingCart />
    </main>
  );
}
