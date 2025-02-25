import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/menu-form.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

interface MenuAddFormProps {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  setImgS3route: React.Dispatch<React.SetStateAction<string>>;
}

export default function MenuAddForm({
  setIsShow,
  setImgS3route,
}: MenuAddFormProps) {
  let [mname, setMname] = useState("");
  let [mcategory, setMcategory] = useState("");
  let [mprice, setMprice] = useState("0");
  let [mdesc, setMcontent] = useState("");
  let [mfile, setMfile] = useState<File | null>(null);
  //파일 첨부 기능 만들 때 사용
  let [fileInput, setFileInput] = useState("클릭해서 파일을 첨부해주세요.");

  const formRef = useRef<HTMLFormElement | null>(null);

  const menuAdd = async (e: React.FormEvent) => {
    try {
      if (formRef.current && formRef.current.checkValidity()) {
        const formData = new FormData();
        formData.append("mname", mname);
        formData.append("mcategory", mcategory);
        formData.append("mprice", mprice);
        formData.append("mdesc", mdesc);
        if (mfile) {
          formData.append("image", mfile);
          formData.append("mfile", mfile.name);
        }

        const response = await axios.post(
          "http://localhost:8082/api-server/menu-register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data.s3Url);

        //s3에 업로드하고 나서, 그 결과값으로 나온 경로를 state에 넣기
        const { s3Url } = response.data;
        console.log("이것은 fileUrl이다: ", s3Url);
        setImgS3route(s3Url);

        if (response) alert("등록이 완료됐습니다.");
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
              onChange={(e) => {
                if (e.target.files) {
                  console.log(e.target.files[0]);
                  setMfile(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>
        <br />
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}
