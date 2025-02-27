import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { act, useEffect, useState } from "react";
import "..//styles/shopDetail.scss";
import ShoppingCart from "../components/ShoppingCart";
import ShopAddForm from "../components/ShopAddForm";
import { useDispatch, useSelector } from "react-redux";
import { addMenu } from "../store/menupick/actions";
import Header from "../components/Header/Header";
import { RootState } from "../store/rootReducer";
import { v4 as uuidv4 } from "uuid";
interface Menus {
  id: number;
  menuName: string;
  category: string;
  price: string;
  menudesc: string;
  originMfile: string;
  saveMfile: string;
}
export default function CustomerShopDetail() {
  let [isShopShow, setIsShopShow] = useState(false);
  let [menuArr, setMenuArr] = useState<Menus[]>([]);
  let [categoryArr, setCategoryArr] = useState<string[]>([]);

  const menuData = useSelector((state: RootState) => state.menu.items);
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.login.loginId);
  const handlerOrder = (menu: string[], price: string[]) => {
    const lastMenu = menuData.length > 0 ? menuData[menuData.length - 1] : {};
    const newMenu = {
      ...lastMenu,
      loginId: userId,
      orderTime: new Date(),
      orderNumber: uuidv4(),
      // shopName : ,
      // shopLoginId :,
      items: Array.isArray(menu) ? menu : [menu],
      price: Array.isArray(price) ? price : [price],
      total: price.reduce((acc, p) => acc + Number(p), 0).toString(),
    };
    dispatch({ type: "menu/addMenu", payload: newMenu });
    console.log(newMenu);
  };

  //메뉴 전체 조회 axios
  useEffect(() => {
    const menuList = async () => {
      const response = await axios.get(
        "http://localhost:8082/api-server/menu-list"
      );

      let result = response.data.map((el: Menus) => {
        const {
          id,
          menuName,
          price,
          menudesc,
          category,
          originMfile,
          saveMfile,
        } = el;
        return {
          id,
          menuName,
          price,
          menudesc,
          category,
          originMfile,
          saveMfile,
        };
      });

      setMenuArr(() => [...result]);
    };

    menuList();
  }, []);

  //카테고리 set. 중복 제거.
  useEffect(() => {
    let categories = [...new Set(menuArr.map((el) => el.category))];
    setCategoryArr(categories);

    console.log("categories", categories);
  }, [menuArr]);

  return (
    <main className="max-w-7xl m-auto">
      <Header />
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
                    <li
                      onClick={() => {
                        handlerOrder([mel.menuName], [mel.price]);
                      }}
                    >
                      <div className="icon-box"></div>
                      <div className="img-box">
                        <img
                          src={
                            "https://lhm-bucket.s3.ap-northeast-2.amazonaws.com/" +
                            mel.saveMfile
                          }
                          alt="aws s3에 저장된 이미지"
                        />
                      </div>
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
