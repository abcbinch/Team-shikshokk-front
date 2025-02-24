import { useEffect, useRef, useState } from "react";
import "../styles/ownerMain.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";

//가게 정보 interface
interface shopIn {
  id: number; // 가게아이디
  shopName: string;
}

export default function OwnerMain() {
  const [shopId, setShopId] = useState<number | null>(null); //선택된 shop id
  const [shops, setShops] = useState<shopIn[]>([]);
  const navigate = useNavigate();

  async function getData() {
    try {
      // 세션 로컬 스토리지에서 토큰 가져오기
      // const token = localStorage.getItem("authToken");
      // if (!token) {
      //   console.error("No token found");
      //   return;
      // }
      const token = localStorage.getItem("authToken");
      console.log("토큰?", token);

      const response = await axios.get(
        "http://localhost:8082/api-server/owner",
        {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          params: {
            userId: "1", // 로그인시에 점주 아이디 test
          },
        }
      );
      console.log(response.data.shops);
      const shopsList = response.data.shops.map((shop: shopIn) => shop);
      setShops(shopsList);

      // 불러온 데이터에서 첫 번째 가게의 ID를 shopId로 설정
      if (shopsList.length > 0) {
        //shopsList.legnth  수정
        setShopId(shopsList[0].id);
      }
    } catch (error) {
      console.error("Error fetching shop data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // 셀렉트박스 확인용
  useEffect(() => {
    console.log("Selected shopId:", shopId);
  }, [shopId]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShopId(parseInt(e.target.value, 10)); //문자열 value값을 10진수 변환
  };

  const handleClick = (path: string) => {
    // navigate(path, { state: { shopId } });
    const selectedShopId = shopId !== null ? shopId : shops[0]?.id; // shopId가 없을 때 첫 번째 가게의 ID를 기본 값으로 사용
    navigate(path, { state: { shopId: selectedShopId } });
  };

  return (
    <main className="box-content mt-10 max-w-[1200px] my-0 mx-auto">
      <div className="con w-full flex flex-col items-center">
        {/* 전체 컨테이너 */}
        <Header nickname="고민봉" />
        <div className="titleBorder border-b border-gray-300  w-4/5 relative">
          <div className="selctBox w-56 relative left-10 mb-2 ">
            <select
              name="shop"
              className="text-xl w-48 appearance-none 
              bg-contain bg-no-repeat bg-right 
              font-bold  cursor-pointer"
              onChange={handleSelect}
            >
              {shops.map((shop, index) => {
                return (
                  <option value={shop.id} key={index}>
                    {shop.shopName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="folderBox border shadow rounded w-4/5 my-7 flex justify-center">
          <div className="folder w-11/12 grid grid-cols-2 box-content">
            <div
              onClick={() => handleClick("/testorder")}
              className="bg-contain bg-no-repeat w-[19rem] h-72 
                  relative my-0 mx-auto "
            >
              <p className="relative top-12 left-6 text-white text-lg">
                주문내역
              </p>
            </div>

            <div
              onClick={() => handleClick("/menu")}
              className="bg-contain bg-no-repeat w-[19rem] h-72 
              relative my-0 mx-auto "
            >
              <p className="relative top-12 left-6 text-white text-lg">
                메뉴관리
              </p>
            </div>

            <div
              onClick={() => handleClick("/income")}
              className="bg-contain bg-no-repeat w-[19rem] h-72 
              relative my-0 mx-auto "
            >
              <p className="relative top-12 left-6 text-white text-lg">
                매출관리
              </p>
            </div>
            <div
              onClick={() => handleClick("/owner-review")}
              className="bg-contain bg-no-repeat w-[19rem] h-72 
              relative my-0 mx-auto "
            >
              <p className="relative top-12 left-6 text-white text-lg">
                리뷰관리
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
