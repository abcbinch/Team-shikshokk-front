import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { updateReview } from "../store/modules/reviewSlice";
import { RootState } from "../store/rootReducer";

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

//--- 추가 (사용하지 않음 )
interface ReviewProps {
  review: {
    // id: number;
    // owner_review?: string;
    // content: string;
    // customer_nickname: string;
    // writeTime: string;
    // reviewfile?: string | null;  // 순서? 리뷰 이미지 파일 추가
    // score: number;
    content: string;
    cus_rev_id: number;
    customer_nickname: string;
    id: number;
    owner_review?: string;
    reviewfile?: string;
    score: number;
    shop_id: number;
    writeTime: string;
  };
}

export default function OwnerReviewBox({ review, isOpen, onClick }: Props) {
  //추가
  const dispatch = useDispatch<AppDispatch>();
  const [editMode, setEditMode] = useState(false);
  const [newReview, setNewReview] = useState(review.owner_review || "");

  //--수정 핸들러
  const handleUpdate = () => {
    dispatch(updateReview({ id: review.id, owner_review: newReview }));
    setEditMode(false);
  };

  // 리플
  // const [newRe, setNewRe] = useState<string>("");
  const [newRe, setNewRe] = useState(review.owner_review || "");
  const reRef = useRef<HTMLTextAreaElement>(null);
  const [reMode, setReMode] = useState(true); // 등록인지 아닌지

  // ref 지정
  const parentRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);

  // Redux 스토어에서 최신 리뷰 상태 가져오기
  const updatedReview = useSelector((state: RootState) =>
    state.reviews.reviews.find((r) => r.id === review.id)
  );
  // Redux 스토어에서 업데이트된 `owner_review` 값을 가져와 `newRe`에 반영
  useEffect(() => {
    if (updatedReview) {
      setNewRe(updatedReview.owner_review || "");
    }
  }, [updatedReview]); // `updatedReview`가 변경될 때마다 실행

  const addRe = () => {
    // 등록 버튼
    if (newRe.trim() !== "") {
      setReMode(true);
      if (parentRef.current && childRef.current) {
        if (isOpen) {
          parentRef.current.style.height = `${
            childRef.current.scrollHeight + 50
          }px`;
        }
      }
      dispatch(updateReview({ id: review.id, owner_review: newRe }));
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
          childRef.current.scrollHeight + 30
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
              {/*  -------새로운------- */}

              {updatedReview?.owner_review !== null ? (
                reMode ? (
                  <div className="newReBox border-t  p-3 my-3">
                    <p className="mt-2 font-bold"> 점주 </p>
                    {updatedReview?.owner_review && (
                      <p className="text-center w-full h-1/2 bg-white p-2 shadow-sm">
                        {updatedReview.owner_review}
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
               bg-white absolute right-14"
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
                )
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
