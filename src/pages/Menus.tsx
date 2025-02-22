import "../styles/menu.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faGear } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MenuAddForm from "../components/MenuAddForm";
import axios from "axios";

interface Item {
  mname: string;
  mcategory: string;
  mprice: number;
  mdesc: string;
} //setMenuArr에 mname을 넣을 때 빨간 줄이 뜬다.
//그런데 이걸 정의한 뒤, menuArr state에 이걸로 타입지정을 해 주니 없어졌다.

export default function Menus() {
  let [isShow, setIsShow] = useState(false);
  let [menuArr, setMenuArr] = useState<Item[]>([]);
  let [mname, setMname] = useState("");
  let [mcategory, setMcategory] = useState("");
  let [mprice, setMprice] = useState(0);
  let [mdesc, setMcontent] = useState("");

  //메뉴 전체 조회 axios
  useEffect(() => {
    const menuList = async () => {
      const response = await axios.get(
        "http://localhost:8082/api-server/menu-list"
      );
      console.log(response.data);
      //아마 menuName, price, menudesc, category가 들어있을테니
      //이를 참고해서 구조분해할당을 해주면 될 것 같다.
      //확인을 해 봐야 한다.
      const { menuName, price, menudesc, category } = response.data;

      setMname(menuName);
      setMprice(price);
      setMcontent(menudesc);
      setMcategory(category);
      setMenuArr((prevMenuArr) => [
        ...prevMenuArr, // 기존 메뉴 항목들
        { mname, mprice, mdesc, mcategory }, // 새로운 메뉴 객체 추가
      ]);
      //이제 이 state를 map으로 돌리면 된다.
    };

    menuList();
  }, []);

  return (
    <main className="max-w-7xl m-auto">
      <h3 className="text-3xl font-bold m-5">메뉴 관리</h3>
      {/* 메뉴 탭 */}
      <ul className="menu-tab flex list-none">
        <li className="choose">전체 메뉴</li>
        {menuArr.map((el) => {
          return <li>{el.mcategory}</li>;
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
            <span className="bg-gray-100 text-gray-800 text-xl font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300">
              {comp.mcategory}
            </span>
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
                    <p>{el.mname}</p>
                    <p>{el.mprice}</p>
                    <div className="content-box">{el.mdesc}</div>
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
