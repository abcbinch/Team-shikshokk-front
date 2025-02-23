import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/menu-form.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface MenuAddFormProps {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MenuAddForm({ setIsShow }: MenuAddFormProps) {
  let [mname, setMname] = useState("");
  let [mcategory, setMcategory] = useState("");
  let [mprice, setMprice] = useState(0);
  let [mdesc, setMcontent] = useState("");
  let [mfile, setMfile] = useState("");
  //파일 첨부 기능 만들 때 사용
  let [fileInput, setFileInput] = useState("클릭해서 파일을 첨부해주세요.");

  const formRef = useRef<HTMLFormElement | null>(null);
  const form = formRef.current;

  const menuAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formRef.current && formRef.current.checkValidity()) {
        axios.post("http://localhost:8082/api-server/menu-register", {
          mname,
          mcategory,
          mprice,
          mdesc,
        });
      }
      setIsShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="m-reg-container">
      <form className="menu-modal" ref={formRef} onSubmit={menuAdd}>
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
            value={mname}
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
            value={mcategory}
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
            value={mprice}
            onChange={(e) => setMprice(Number(e.target.value))}
          />
        </label>
        <br />
        <label>
          설명
          <br />{" "}
          <input
            type="text"
            name="mdesc"
            value={mdesc}
            onChange={(e) => setMcontent(e.target.value)}
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
              value={mfile}
              onChange={(e) => setMfile(e.target.value)}
            />
          </div>
        </div>
        <br />
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}
