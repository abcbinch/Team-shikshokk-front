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
  let [mcontent, setMcontent] = useState("");

  const close = () => {
    console.log("모달 close 함수 테스트");
    setIsShow(false);
  };

  // useEffect(() => {
  //   axios.post("/menu-register", { mname, mcategory, mprice, mcontent });
  // }); //미완성. async, await 필요. 받아온 데이터를 담을 state 필요.
  // //등록 버튼을 눌렀을 때 axios가 실행되어야 한다.
  // controller, routes 설정
  return (
    <div className="m-reg-container">
      <form className="menu-modal">
        <div className="x-box">
          <FontAwesomeIcon
            icon={faXmark}
            className="close-btn"
            onClick={close}
          />
        </div>

        <label>
          메뉴명
          <br />{" "}
          <input type="text" onChange={(e) => setMname(e.target.value)} />
        </label>
        <br />
        <label>
          분류
          <br />{" "}
          <input type="text" onChange={(e) => setMcategory(e.target.value)} />
        </label>
        <br />
        <label>
          가격
          <br />{" "}
          <input type="text" onChange={(e) => setMprice(e.target.value)} />
        </label>
        <br />
        <label>
          설명
          <br />{" "}
          <input type="text" onChange={(e) => setMcontent(e.target.value)} />
        </label>
        <br />
        <button>등록하기</button>
      </form>
    </div>
  );
}
