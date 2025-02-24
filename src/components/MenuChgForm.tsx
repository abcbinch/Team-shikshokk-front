import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/menu-form.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface Menus {
  id: number;
  menuName: string;
  category: string;
  price: number;
  menudesc: string;
  originMfile: string;
}
interface MenuAddFormProps {
  selectMenu: Menus;
  setIsChgShow: React.Dispatch<React.SetStateAction<boolean>>;
}
//props로 Menus에서 메뉴 정보를 여기로 전달한다.
//value에 메뉴 정보를 넣는다.
export default function MenuChgForm({
  selectMenu,
  setIsChgShow,
}: MenuAddFormProps) {
  let [chgname, setChgname] = useState(selectMenu.menuName);
  let [chgcategory, setChgcategory] = useState(selectMenu.category);
  let [chgprice, setChgprice] = useState(selectMenu.price);
  let [chgdesc, setChgcontent] = useState(selectMenu.menudesc);
  let [chgfile, setChgfile] = useState(selectMenu.originMfile);

  const formRef = useRef<HTMLFormElement | null>(null);

  const menuChg = async (e: React.FormEvent) => {
    try {
      if (formRef.current && formRef.current.checkValidity()) {
        const response = await axios.patch(
          "http://localhost:8082/api-server/menu-change",
          { id: selectMenu.id, chgname, chgcategory, chgprice, chgdesc }
        );

        if (response) alert("수정이 완료되었습니다.");
      }
      setIsChgShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="m-reg-container">
      <form className="menu-modal" ref={formRef} onSubmit={menuChg}>
        <div className="x-box">
          <FontAwesomeIcon
            icon={faXmark}
            className="close-btn"
            onClick={() => setIsChgShow(false)}
          />
        </div>

        <label>
          메뉴명
          <br />{" "}
          <input
            type="text"
            name="mname"
            value={chgname}
            onChange={(e) => setChgname(e.target.value)}
          />
        </label>
        <br />
        <label>
          분류
          <br />{" "}
          <input
            type="text"
            name="mcategory"
            value={chgcategory}
            onChange={(e) => setChgcategory(e.target.value)}
          />
        </label>
        <br />
        <label>
          가격
          <br />{" "}
          <input
            type="text"
            name="mprice"
            value={chgprice}
            onChange={(e) => setChgprice(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          설명
          <br />{" "}
          <input
            type="text"
            name="mdesc"
            value={chgdesc}
            onChange={(e) => setChgcontent(e.target.value)}
          />
        </label>
        <br />
        <div className="custom-container">
          사진
          <br />
          <div className="custom-input">
            <input
              type="file"
              name="mfile"
              value={chgfile}
              onChange={(e) => setChgfile(e.target.value)}
            />
          </div>
        </div>
        <br />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}
