import React, { useRef, useState } from "react";

//test interface
interface test {
  content: string;
  cus_rev_id: number;
  customer_nickname: string;
  id: number;
  owner_review?: string;
  reviewfile?: string;
  score: number;
  shop_id: number;
  writeTime: string;
}

interface Props {
  review: test;
  isOpen: boolean; // 현재 열려있는지
  onClick: () => void; // 클릭시 실행할 함수
}

export default function OwnerReviewBox({ review, isOpen, onClick }: Props) {
  // 리플
  const [newRe, setNewRe] = useState<string>("");
  const reRef = useRef<HTMLTextAreaElement>(null);
  const [reMode, setReMode] = useState(false);

  // ref 지정
  const parentRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);

  const addRe = () => {
    // 등록 버튼
    if (newRe.trim() !== "") {
      setReMode(true);
      if (parentRef.current && childRef.current) {
        if (isOpen) {
          parentRef.current.style.height = `${
            childRef.current.clientHeight + 50
          }px`;
        }
      }
    } else {
      alert("댓글을 입력해주세요");
    }
  };

  //엔터입력
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      //nativeEvent은 맥에서 한글오류방지
      addRe();
    }
  };

  //수정 버튼
  const updateRe = () => {
    if (reRef.current) reRef.current.value = newRe;
    setReMode(false);
  };

  React.useEffect(() => {
    if (parentRef.current && childRef.current) {
      if (isOpen) {
        parentRef.current.style.height = `${
          childRef.current.clientHeight + 30
        }px`;
        parentRef.current.style.background = "#fefcf5";
      } else {
        parentRef.current.style.height = "0";
        parentRef.current.style.background = "white";
      }
    }
  }, [isOpen]);

  //작성날짜
  const writeDate = new Date(review.writeTime).toISOString().split("T")[0];

  return (
    <>
      <section
        className="flex flex-col relative justify-center 
       border-b border-gray-300 w-3/5 shadow-sm"
      >
        <header
          className="flex items-center h-14 cursor-pointer relative 
          overflow-hidden justify-items-center shadow-inner"
          onClick={onClick}
        >
          <div className="flex justify-between w-full mx-1">
            <p className="w-24 text-center">{writeDate}</p>
            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap w-2/5">
              {review.content.slice(0, 40)}...
            </p>
            <p className="w-24 text-center">{review.customer_nickname}</p>
          </div>
        </header>

        <div
          className="contentWrapper h-0 w-full overflow-hidden "
          ref={parentRef}
        >
          <div className="innerContent py-1 px-2" ref={childRef}>
            {review.reviewfile && (
              <div
                //------------------- 여기도수정
                className="reviewImg w-full h-56 my-3 flex justify-center"
              >
                <img
                  className="w-3/5 
                border border-gray-300 shadow-sm
                "
                  src={`${review.reviewfile}`}
                  alt="review-image"
                />
              </div>
            )}
            <div className="customer border shadow-sm my-2">
              <div className="customerT mt-2 p-2 flex">
                <p className="mr-2 font-bold">{review.customer_nickname}</p>
                {Array.from({ length: review.score }).map((_, index) => (
                  <img
                    className="w-4 h-5 inline-block mx-1"
                    key={index}
                    src={process.env.PUBLIC_URL + "/assets/fork-F.png"}
                  />
                ))}
              </div>
              <p className="h-1/3 p-2 ">{review.content}</p>
            </div>

            {/* 댓글 */}
            <div className="reBox w-full h-36 relative">
              {reMode ? (
                // --------- 수정-----------------------------
                <div className="newReBox border-t">
                  <p className="text-sm mt-2 text-center"> 점주 </p>
                  {review.owner_review && (
                    <p className="text-center w-full h-1/2">
                      {review.owner_review}
                    </p>
                  )}

                  <button
                    className="border rounded m-2 w-12 h-7 text-sm
                 bg-white absolute right-1"
                    onClick={updateRe}
                  >
                    수정
                  </button>
                  <button
                    className="border rounded m-2 w-12 h-7 text-sm
                 bg-white absolute"
                  >
                    삭제
                  </button>
                </div>
              ) : (
                <>
                  <textarea
                    placeholder="댓글 내용을 입력해주세요.(공백 포함 200자 이내 작성)"
                    maxLength={200}
                    className="resize-none border block w-full h-1/2 p-2 
                  rounded text-sm"
                    value={newRe}
                    onChange={(e) => setNewRe(e.target.value)}
                    onKeyDown={handleKeyDown}
                    ref={reRef}
                  ></textarea>
                  <button
                    className="border rounded m-2 w-12 h-7 text-sm
                 bg-white absolute right-1"
                    onClick={addRe}
                  >
                    등록
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
