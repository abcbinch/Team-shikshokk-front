import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Star from "../components/Star";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
// import "../styles/cusReivew.scss";
import "../styles/cusReview.scss";

export default function CusReview() {
  // 주문id로 메뉴,가격,총가격 가져오기(get),
  // 등록버튼 클릭=>rieview에 추가 + 사진도 reviewfile에

  //===== 이미지
  const [imgFile, setImgFile] = useState<string | ArrayBuffer | null>("");
  const imgRef = useRef<HTMLInputElement | null>(null);

  const saveImgFile = () => {
    // if (imgRef.current !== null)
    if (imgRef.current !== null && imgRef.current.files!.length > 0) {
      const file = imgRef.current.files![0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgFile(reader.result);
      };
      reader.readAsDataURL(file);
      console.log("안", imgRef.current.files![0]);
    }
  };
  if (imgRef.current !== null) {
    console.log("밖", imgRef.current.files![0]);
  }

  //=--------------

  // test
  const menu = [
    {
      name: "치즈버거",
      count: "3",
    },
    {
      name: "칠리프라이즈",
      count: "2",
    },
    {
      name: "닥터페퍼",
      count: "2",
    },
  ];

  return (
    <>
      <main className="max-w-[1200px] flex justify-center my-0 mx-auto">
        <form
          className="con my-10 border rounded w-3/5 
        flex flex-col items-center shadow-md"
        >
          <div className="title border-b mt-4 pb-2 w-4/5">
            <h1 className="text-2xl font-bold pl-2">리뷰 작성</h1>
          </div>
          <ul className="menuUl bg-[#fefcf5] w-4/5 m-3 p-3 shadow-sm ">
            {menu.map((el, index) => {
              return (
                <li className="relative pl-3 flex" key={index}>
                  {el.name}{" "}
                  <span className="absolute right-2">x{el.count}</span>
                </li>
              );
            })}
          </ul>
          <div className="star w-full flex flex-col items-center my-6">
            <p className="text-stone-400">
              <span className="star-s font-bold">식사</span>는 어떠셨나요?
            </p>
            <p className="text-stone-400 mb-3">
              리뷰를 <span className="star-s text-amber-500 font-bold">쇽</span>{" "}
              남겨주세요
            </p>

            <Star />
          </div>

          <div className="textBox w-full my-7 flex justify-center">
            <textarea
              placeholder="리뷰를 입력해주세요.(공백 포함 200자 이내 작성)"
              maxLength={200}
              className="resize-none border block w-4/5 h-24 p-2 rounded text-sm"
            ></textarea>
          </div>

          {/* 이미지 */}
          <div className="imgUpload w-full h-28 flex justify-center mb-5">
            <div className="imgBox w-4/5 h-full flex justify-center">
              <label
                htmlFor="profileImg"
                className="inline-block cursor-pointer w-32 h-full 
                border rounded text-center leading-[105px] mr-4"
              >
                <FontAwesomeIcon
                  icon={faCamera}
                  size="2xl"
                  style={{ color: "#fe9a00" }}
                />
              </label>
              <input
                type="file"
                id="profileImg"
                accept="image/jpg, image/png, image/jpeg"
                className="absolute w-0 h-0 p-0 m-[-1px] 
                overflow-hidden sr-only" // clip: rect(0, 0, 0, 0);
                onChange={saveImgFile}
                ref={imgRef}
              />
              {imgFile && (
                <div
                  className="imgSum w-32 h-full 
                 border rounded p-1"
                >
                  <img
                    src={`${imgFile}`}
                    alt="imgSum"
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
          {/* 여기 */}

          <div className="buttonBox w-full text-center mb-10">
            <button
              type="submit"
              className="register w-1/5 h-14 m-2 rounded bg-amber-500
            text-white hover:bg-amber-600 shadow-sm"
            >
              등록
            </button>
            {/* 주문목록으로 돌아가기 navigate? */}
            <Link to={"/"}>
              <button
                type="button"
                className="cancel w-1/5 h-14 border rounded m-2 
            shadow-sm hover:bg-gray-50"
              >
                취소
              </button>
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
