import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header/Header";
import { AppState } from "../../../store";
import io from "socket.io-client";
import * as S from "../../../store/socket";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as C from "../../../store/clock";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OrderTestProps {}

const socket = io("http://localhost:8082");
const loginId = "customer02";
const shopLoginId = "owner02";
const shopName = "피자집";
const OrderTest: React.FC<OrderTestProps> = () => {
  const clock = new Date(
    useSelector<AppState, C.State>((state) => state.clock)
  );

  const socketState = useSelector<AppState, S.SocketState>(
    ({ socket }) => socket
  );

  const [orderInfo, setOrderInfo] = useState<S.Order[]>([]);

  useEffect(() => {
    const data = { loginId: loginId, socketId: socket.id };
    socket.emit("connectCustomer", data);
    socket.on("connect", () => {
      console.log("socket connect~~~");
      console.log("socket = ", socket);
    });

    socket.on("order", (data: S.Order) => {
      console.log("주문 넣음 = ", data);
      console.log("받은 값 = ", data);
      if (Array.isArray(data)) {
        setOrderInfo((prevOrderInfo) => [...prevOrderInfo, ...data]);
      } else {
        setOrderInfo((prevOrderInfo) => [data, ...prevOrderInfo]);
      }
    });

    socket.on("orderApproval", (data: S.Order) => {
      console.log("주문 승인 알림 받음 = ", data);
      socket.emit("orderCustomerSync", data);
      if (Array.isArray(data)) {
        setOrderInfo(data);
      }
    });

    socket.on("customerOrderSync", (data: S.Order[]) => {
      console.log("주문 동기화 = ", data);
      if (Array.isArray(data)) {
        setOrderInfo(data); // 배열로 설정
      } else {
        setOrderInfo((prevOrderInfo) => [data, ...prevOrderInfo]); // 배열이 아닐 경우 추가
      }
    });

    socket.on("cookingStart", (data: S.Order) => {
      console.log("요리 시작 알림 받음 = ", data);
    });

    socket.on("cookingEnd", (data: S.Order) => {
      console.log("조리 완료 알림 받음 = ", data);
    });

    socket.on("disconnect", () => {
      console.log("socket disconnect~~~");
    });
    return () => {
      socket.off("connect");
      socket.off("order");
      socket.off("disconnect");
    };
  }, [socket]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(C.setClock(new Date().toISOString()));
  }, [dispatch]);

  function order2() {
    const order2 = {
      loginId: loginId,
      orderTime: clock,
      orderNumber: uuidv4(),
      orderType: "매장",
      storeCapacity: "4",
      contactNumber: "010-1234-1234",
      shopName: shopName,
      shopLoginId: shopLoginId,
      total: "85000",
      items: [
        "매우매우맛있는후라x1",
        "매우매우맛있는양념x1",
        "매우매우맛있는순살x1",
      ],
    };
    socket.emit("order", order2);
  }

  return (
    <>
      <Header nickname="고민봉" />
      <div>
        <button
          onClick={() => {
            order2();
          }}
          className="btn btn-primary btn-lg"
        >
          주문하기
        </button>
      </div>
      <div className="wrap-container">
        <div>
          <section className="order-history-container">
            <div className="menu-tab-container">
              <div className="menu-tab-1">
                <p>현재 주문</p>
              </div>
              <div className="menu-tab-2">
                <p>전체 주문</p>
              </div>
            </div>
            <hr className="border-2 opacity-75 black" />
            <div className="receipt-card-container">
              {Array.isArray(orderInfo) && orderInfo.length > 0 ? (
                orderInfo
                  .slice()
                  .reverse()
                  .map((order, index) => (
                    <div key={index} className="receipt-card">
                      <ul className="receipt-card-list">
                        <li>
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="custom-icon"
                          />
                        </li>
                        <li>주문시간</li>
                        <li>
                          {`${new Date(order.orderTime).getFullYear()}년 ${
                            new Date(order.orderTime).getMonth() + 1
                          }월 ${new Date(order.orderTime).getDate()}일`}
                        </li>
                        <li>
                          {new Date(order.orderTime).toLocaleTimeString(
                            "ko-KR",
                            {
                              hour12: false,
                            }
                          )}
                        </li>
                        <li>주문고객Id</li>
                        <li>{order.loginId}</li>
                        <li>주문번호</li>
                        <li>{order.orderNumber.slice(-8)}</li>
                        <li>가게이름 {order.shopName}</li>
                        <li>
                          {order.orderType} {order.storeCapacity}명
                        </li>
                        <li>연락처</li>
                        <li>{order.contactNumber}</li>
                        <li>메뉴이름</li>
                        {Array.isArray(order.items) &&
                        order.items.length > 0 ? (
                          order.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))
                        ) : (
                          <li>-</li>
                        )}
                        <br />
                        <li>합계: {order.total}원</li>
                      </ul>
                    </div>
                  ))
              ) : (
                <p>주문 정보가 없습니다.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default OrderTest;
