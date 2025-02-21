import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/menu-form.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

interface MenuAddFormProps {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuAddForm({ setIsShow }: MenuAddFormProps) {
  let [mname, setMname] = useState("");
  let [mcategory, setMcategory] = useState("");
  let [mprice, setMprice] = useState("");
  let [mdesc, setMcontent] = useState("");

  // const close = () => {
  //   setIsShow(false);
  // };
  //만약 안 된다면 가위표 아이콘 부분에서 화살표 함수를 그냥 close로 써 준다.

  axios.post("/menu-register", { mname, mcategory, mprice, mdesc });

  useEffect(() => {
    const menuList = async () => {
      const response = await axios.get("/menu-list");
      console.log(response.data);
      //아마 menuName, price, menudesc, category가 들어있을테니
      //이를 참고해서 구조분해할당을 해주면 될 것 같다.
      const { menuName, price, menudesc, category } = response.data;
    };

    menuList();
  });

  return (
    <div className="m-reg-container">
      <form className="menu-modal">
        <div className="x-box">
          <FontAwesomeIcon
            icon={faXmark}
            className="close-btn"
            onClick={() => setIsShow(false)}
          />
        </div>

        <label>
          메뉴명
          <br />{" "}
          <input
            type="text"
            name="mname"
            onChange={(e) => setMname(e.target.value)}
          />
        </label>
        <br />
        <label>
          분류
          <br />{" "}
          <input
            type="text"
            name="mcategory"
            onChange={(e) => setMcategory(e.target.value)}
          />
        </label>
        <br />
        <label>
          가격
          <br />{" "}
          <input
            type="text"
            name="mprice"
            onChange={(e) => setMprice(e.target.value)}
          />
        </label>
        <br />
        <label>
          설명
          <br />{" "}
          <input
            type="text"
            name="mdesc"
            onChange={(e) => setMcontent(e.target.value)}
          />
        </label>
        <br />
        <button>등록하기</button>
      </form>
    </div>
  );
}
