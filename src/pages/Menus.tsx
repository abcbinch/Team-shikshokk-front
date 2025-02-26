import "../styles/menu.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faGear } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import MenuAddForm from "../components/MenuAddForm";
import axios from "axios";
import MenuChgForm from "../components/MenuChgForm";

interface Menus {
  id: number;
  menuName: string;
  category: string;
  price: string;
  menudesc: string;
  originMfile: string;
  saveMfile: string;
}

export default function Menus() {
  let [isShow, setIsShow] = useState(false);
  let [isChgShow, setIsChgShow] = useState(false);
  let [menuArr, setMenuArr] = useState<Menus[]>([]);
  let [categoryArr, setCategoryArr] = useState<string[]>([]);
  let [selectMenu, setSelectMenu] = useState<Menus | null>(null);
  let [imgS3route, setImgS3route] = useState<string>("");

  //메뉴 전체 조회 axios
  useEffect(() => {
    try {
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
    } catch (err) {
      console.log("err", err);
    }
  }, []);

  //카테고리 set. 중복 제거.
  useEffect(() => {
    let categories = [...new Set(menuArr.map((el) => el.category))];
    setCategoryArr(categories);
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
      </ul>

      {/* 메뉴 보드들 */}
      {categoryArr.length > 0 ? (
        categoryArr.map((comp) => {
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
                      <li key={mel.id}>
                        <div className="icon-box">
                          <FontAwesomeIcon
                            icon={faGear}
                            className="setting-icon m-2"
                            onClick={() => {
                              setIsChgShow(true);
                              setSelectMenu({
                                id: mel.id,
                                menuName: mel.menuName,
                                price: mel.price,
                                menudesc: mel.menudesc,
                                category: mel.category,
                                originMfile: mel.originMfile,
                                saveMfile: mel.saveMfile,
                              });
                            }}
                          />
                        </div>
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

                <li onClick={() => setIsShow(true)}>
                  <FontAwesomeIcon icon={faPlus} className="add-icon" />
                </li>
              </ul>
            </div>
          );
        })
      ) : (
        <div>
          <hr />
          <ul className="menu-board flex list-none overflow-x-scroll">
            <li onClick={() => setIsShow(true)}>
              <FontAwesomeIcon icon={faPlus} className="add-icon" />
            </li>
          </ul>
          <hr />
        </div>
      )}
      {/* categoryArr 끝 */}

      {isShow && (
        <MenuAddForm setIsShow={setIsShow} setImgS3route={setImgS3route} />
      )}
      {isChgShow && selectMenu && (
        <MenuChgForm
          selectMenu={selectMenu}
          setIsChgShow={setIsChgShow}
          setImgS3route={setImgS3route}
        />
      )}
      {/* selectMenu가 null이 아닐 때만 실행 */}
    </main>
  );
}
