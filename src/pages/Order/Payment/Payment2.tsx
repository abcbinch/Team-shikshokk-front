import { useLocation } from "react-router-dom";
import Header from "../../../components/Header/Header";
import "../../../styles/payment2.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { Order, OrderState } from "../../../store/order";
interface Payment2Props {}

const Payment2: React.FC<Payment2Props> = () => {
  const [showInput, setShowInput] = useState(false);
  const [amount, setAmount] = useState("");

  const handleDepositClick = () => {
    setShowInput(!showInput);
  };

  const handleConfirmClick = () => {
    console.log(`Deposit amount: ${amount}`);

    // 여기서 실제 입금 로직을 추가할 수 있습니다.
  };

  const location = useLocation();
  const total = location.state?.total || 0; // 실제 합계
  const sum = (location.state?.total ?? 0).toLocaleString(); // 실제 합계 , 표시시
  const menuData: Order[] = useSelector(
    (state: RootState) => state.order.orders
  );

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(menuData[0]);
  }, []);
  return (
    <>
      <Header />
      <div className="wrap-container-payment2">
        <div className="wrap-content-payment2-1">
          <ul>
            <li>현제 잔액:</li>

            <li>
              쇽페이충전:{" "}
              <button
                onClick={handleDepositClick}
                className="px-3 py-1 mt-2 font-bold text-black bg-orange-400 rounded py- hover:bg-orange-700"
              >
                충전
              </button>
            </li>
            {showInput && (
              <div className="flex items-center mt-1 input-container-payment2">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="금액 입력"
                  className="mr-2 input-class"
                />
                <button
                  onClick={handleConfirmClick}
                  className="px-2 py-1 mt-2 font-bold text-black bg-blue-400 rounded hover:bg-blue-700"
                >
                  확인
                </button>
              </div>
            )}
          </ul>
        </div>
        <div className="wrap-content-payment2-2">
          <ul>
            <li>포장: </li>
            <li>방문시간:</li>
            <li>인원: </li>
            <li>요청사항: </li>
          </ul>

          <ul>
            <li>총 금액: {sum} 원</li>
            <li>결제 수단: 쇽페이 </li>
          </ul>
        </div>

        <div className="wrap-content-payment2-3">
          <div className="wrap-content-payment2-3-1">
            <button className="btn btn-warning btn-lg">결제하기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment2;
