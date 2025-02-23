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

  const formRef = useRef<HTMLFormElement | null>(null);
  const form = formRef.current;

  const menuAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formRef.current && formRef.current.checkValidity()) {
        axios.patch("http://localhost:8082/api-server/menu-change", {
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

  // onSubmit={menuAdd}

  useEffect(() => {
    const menuOne = async () => {
      const response = await axios.get(
        "http://localhost:8082/api-server/menu-one"
      );
      console.log("response data", response.data);
      //아마 menuName, price, menudesc, category가 들어있을테니
      //이를 참고해서 구조분해할당을 해주면 될 것 같다.
      //확인을 해 봐야 한다.
    };

    menuOne();
  }, []);

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
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}
