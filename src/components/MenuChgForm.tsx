import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/menu-form.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface Menus {
  id: number;
  menuName: string;
  category: string;
  price: string;
  menudesc: string;
  originMfile: string;
}
interface MenuAddFormProps {
  selectMenu: Menus;
  setIsChgShow: React.Dispatch<React.SetStateAction<boolean>>;
  setImgS3route: React.Dispatch<React.SetStateAction<string>>;
}
//props로 Menus에서 메뉴 정보를 여기로 전달한다.
//value에 메뉴 정보를 넣는다.
export default function MenuChgForm({
  selectMenu,
  setIsChgShow,
  setImgS3route,
}: MenuAddFormProps) {
  let [chgname, setChgname] = useState(selectMenu.menuName);
  let [chgcategory, setChgcategory] = useState(selectMenu.category);
  let [chgprice, setChgprice] = useState(selectMenu.price);
  let [chgdesc, setChgcontent] = useState(selectMenu.menudesc);
  let [chgfile, setChgfile] = useState<File | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  //메뉴 수정정
  const menuChg = async (e: React.FormEvent) => {
    try {
      if (formRef.current && formRef.current.checkValidity()) {
        const formData = new FormData();
        formData.append("chgname", chgname);
        formData.append("chgcategory", chgcategory);
        formData.append("chgprice", chgprice);
        formData.append("chgdesc", chgdesc);
        if (chgfile) {
          formData.append("image", chgfile);
          formData.append("chgfile", chgfile.name);
        }
        const response = await axios.patch(
          "http://localhost:8082/api-server/menu-change",
          // { id: selectMenu.id, chgname, chgcategory, chgprice, chgdesc }
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response) alert("수정이 완료되었습니다.");
      }
      setIsChgShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  //메뉴 삭제
  const menuDel = async () => {
    try {
      const result = await axios.delete(
        "http://localhost:8082/api-server/menu-delete",
        {
          data: {
            id: selectMenu.id,
          },
        }
      );
      console.log(result.data.isDelete);
      if (result.data.isDelete) {
        alert("삭제되었습니다");

        setIsChgShow(false);
      }
    } catch (err) {
      console.log("삭제 실패:", err);
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
            name="chgprice"
            value={chgprice}
            onChange={(e) => setChgprice(e.target.value)}
          />
        </label>
        <br />
        <label>
          설명
          <br />{" "}
          <input
            type="text"
            name="chgdesc"
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
              name="chgfile"
              onChange={(e) => {
                if (e.target.files) {
                  console.log(e.target.files[0]);
                  setChgfile(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>
        <br />
        <div className="btn-container">
          <button type="submit">수정하기</button>
          <button type="button" onClick={menuDel}>
            삭제하기
          </button>
        </div>
      </form>
    </div>
  );
}
