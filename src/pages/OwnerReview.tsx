import axios from "axios";
import { useEffect, useState } from "react";
import OwnerReviewBox from "../components/OwnerReviewBox";
import "../styles/ownerReview.scss";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "../store/rootReducer";

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

export default function OwnerReview() {
  // shopid 받기
  const location = useLocation();
  const { shopId } = location.state || { shopId: null }; // 기본 값을 null로 설정
  // const { shopId } = location.state;
  // const dispatch = useDispatch<AppDispatch>();

  console.log(shopId);

  //--- 추가
  async function getData() {
    try {
      // 세션 로컬 스토리지에서 토큰 가져오기
      // const token = localStorage.getItem("authToken");
      // if (!token) {
      //   console.error("No token found");
      //   return;
      // }
      const response = await axios.get(
        "http://localhost:8082/api-server/owner-review",
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          params: {
            shopId: shopId, // 가게 아이디 test
          },
        }
      );
      console.log("res", response.data.reviews);
      const reviews = response.data.reviews;
      setText(reviews);
    } catch (error) {
      console.error("Error fetching shop data:", error);
    }
  }

  const [text, setText] = useState<test[]>([]); // 리뷰들
  const [openId, setOpenId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = text.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(text.length / itemsPerPage);

  return (
    <>
      <div className="con m-10 flex flex-col items-center">
        <div className="reviewTitle mb-8 pb-2 w-3/5 border-b ">
          <h1 className="text-2xl font-bold">리뷰 관리</h1>
        </div>
        <div className="title flex h-14 shadow-sm relative items-center  bg-amber-500 text-white w-3/5">
          <div className="flex justify-between justify-items-center w-full">
            <p className="w-24 text-center">작성일</p>
            <p className="">제목</p>
            <p className="w-20 text-center">작성자</p>
          </div>
        </div>

        {currentItems.map((review) => (
          <OwnerReviewBox
            review={review}
            key={review.id}
            isOpen={openId === review.id}
            onClick={() => handleClick(review.id)}
          />
        ))}

        {/* 페이지네이션 */}
        <div className="pagination flex mt-4">
          <button
            className="px-4 py-2 mx-1 text-xs "
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            이전
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={` px-3 py-2 mx-1 text-xs ${
                currentPage === index + 1 &&
                "border border-amber-500 text-amber-500"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className=" px-4 py-2 mx-1 text-xs"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}
