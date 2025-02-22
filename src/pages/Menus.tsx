import "../styles/menu.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faGear } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MenuAddForm from "../components/MenuAddForm";
import axios from "axios";

interface Menus {
  menuName: string;
  category: string;
  price: number;
  menudesc: string;
}

export default function Menus() {
  let [isShow, setIsShow] = useState(false);
  let [menuArr, setMenuArr] = useState<Menus[]>([]);
  let [categoryArr, setCategoryArr] = useState<string[]>([]);
  // let [mname, setMname] = useState("");
  // let [mcategory, setMcategory] = useState("");
  // let [mprice, setMprice] = useState(0);
  // let [mdesc, setMcontent] = useState("");

  //메뉴 전체 조회 axios
  useEffect(() => {
    const menuList = async () => {
      const response = await axios.get(
        "http://localhost:8082/api-server/menu-list"
      );
      console.log("response data", response.data);
      //아마 menuName, price, menudesc, category가 들어있을테니
      //이를 참고해서 구조분해할당을 해주면 될 것 같다.
      //확인을 해 봐야 한다.
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
      <h3 className="text-3xl font-bold m-5">메뉴 관리</h3>
      {/* 메뉴 탭 */}
      <ul className="menu-tab flex list-none">
        <li className="choose">전체 메뉴</li>
        {categoryArr.map((el) => {
          return <li>{el}</li>;
        })}
        <li>
          <FontAwesomeIcon icon={faPlus} />
        </li>
      </ul>

      {/* 메뉴 보드들 */}
      {menuArr.map((comp) => {
        return (
          <div>
            <hr className="mb-3" />
            {categoryArr.map((cel) => {
              return (
                <span className="bg-gray-100 text-gray-800 text-xl font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">
                  {cel}
                </span>
              );
            })}

            <ul className="menu-board flex list-none overflow-x-scroll">
              {menuArr.map((el) => {
                return (
                  <li>
                    <div className="icon-box">
                      <FontAwesomeIcon
                        icon={faGear}
                        className="setting-icon m-2"
                      />
                    </div>
                    <div className="img-box"></div>
                    <p>{el.menuName}</p>
                    <p>{el.price}</p>
                    <div className="content-box">{el.menudesc}</div>
                  </li>
                );
              })}

              <li onClick={() => setIsShow(true)}>
                <FontAwesomeIcon icon={faPlus} className="add-icon" />
              </li>
            </ul>
          </div>
        );
      })}

      {isShow && <MenuAddForm setIsShow={setIsShow} />}
    </main>
  );
}
