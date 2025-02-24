import "../../../styles/ownerOrderHistory.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../../components/Header/Header";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import * as S from "../../../store/socket";
import { AppState } from "../../../store";
interface OwnerOrderHistoryProps {}
const socket = io("http://localhost:8082");
const loginId = "owner01";
const OwnerOrderHistory: React.FC<OwnerOrderHistoryProps> = () => {
  const dispatch = useDispatch();
  const socketState = useSelector<AppState, S.SocketState>(
    ({ socket }) => socket
  );
  // console.log("전체 socketState = ", socketState);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 480);
  const [orderStatus, setOrderStatus] = useState<{ [key: string]: boolean }>(
    () => {
      const savedStatus = localStorage.getItem("orderStatus");
      return savedStatus ? JSON.parse(savedStatus) : {};
    }
  );
  const [cookingCompleted, setCookingCompleted] = useState<{
    [key: string]: boolean;
  }>(() => {
    const savedCompletedStatus = localStorage.getItem("cookingCompleted");
    return savedCompletedStatus ? JSON.parse(savedCompletedStatus) : {};
  });
  const [orderApproved, setOrderApproved] = useState<{
    [key: string]: boolean;
  }>(() => {
    const savedApprovedStatus = localStorage.getItem("orderApproved");
    return savedApprovedStatus ? JSON.parse(savedApprovedStatus) : {};
  });

  const [orderInfo, setOrderInfo] = useState<S.Order[]>([]);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 480);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const data = { loginId: loginId, socketId: socket.id };

    socket.emit(
      "connectOwner",
      data,
      orderStatus,
      cookingCompleted,
      orderApproved
    );

    socket.on("connect", () => {
      console.log("socket connect~~~");
    });
    socket.on("order", (data: S.Order[]) => {
      console.log("주문 받은 값 = ", data);

      if (Array.isArray(data)) {
        setOrderInfo((prevOrderInfo) => [...prevOrderInfo, ...data]);
      } else {
        setOrderInfo((prevOrderInfo) => [data, ...prevOrderInfo]);
      }
    });

    //새로고침시 소켓이 변경된다. 주문정보를 동기화 emit 보내면 서버는 받아서
    socket.on("ownerOrderSync", (data: S.Order[]) => {
      console.log("주문 동기화 = ", data);
      if (Array.isArray(data)) {
        setOrderInfo(data); // 배열로 설정
      } else {
        setOrderInfo((prevOrderInfo) => [data, ...prevOrderInfo]); // 배열이 아닐 경우 추가
      }
    });

    //새로고침시 소켓이 변경된다. 주문 버튼 상태를 동기화 emit 보내면 서버는 받아서

    socket.on("disconnect", () => {
      console.log("socket disconnect~~~");
    });
    return () => {
      socket.off("connect");
      socket.off("order");
      socket.off("disconnect");
    };
  }, [socket]);

  const handleOrderApproval = (order: S.Order) => {
    console.log("주문 확인 버튼 눌럿다");
    console.log("주문확인버튼=", order);
    socket.emit("orderApproval", order);

    setOrderApproved((prevState) => {
      const updatedStatus = { ...prevState, [order.orderNumber]: true };
      localStorage.setItem("orderApproved", JSON.stringify(updatedStatus));
      socket.emit("setOrderApproved", updatedStatus, order.shopLoginId); // 업데이트된 상태 값을 소켓 이벤트로 보냅니다.
      return updatedStatus;
    });
  };

  const handleCookingStart = (order: S.Order) => {
    console.log("조리 시작 버튼 눌럿다");
    socket.emit("cookingStart", order);

    setOrderStatus((prevState) => {
      const updatedStatus = { ...prevState, [order.orderNumber]: true };
      localStorage.setItem("orderStatus", JSON.stringify(updatedStatus));
      socket.emit("setOrderStatus", updatedStatus, order.shopLoginId); // 업데이트된 상태 값을 소켓 이벤트로 보냅니다.
      return updatedStatus;
    });
  };

  const handleCookingEnd = (order: S.Order) => {
    console.log("조리 완료 버튼 눌럿다");
    socket.emit("cookingEnd", order);

    setCookingCompleted((prevState) => {
      const updatedCompletedStatus = {
        ...prevState,
        [order.orderNumber]: true,
      };
      localStorage.setItem(
        "cookingCompleted",
        JSON.stringify(updatedCompletedStatus)
      );
      socket.emit(
        "setCookingCompleted",
        updatedCompletedStatus,
        order.shopLoginId
      ); // 업데이트된 상태 값을 소켓 이벤트로 보냅니다.
      return updatedCompletedStatus;
    });
  };

  return (
    <>
      <Header nickname="고민봉" />
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
                      <div className="mt-2">
                        <div>
                          {!orderApproved[order.orderNumber] && (
                            <button
                              className={`btn btn-secondary ${
                                isSmallScreen ? "btn-sm" : ""
                              }`}
                              onClick={() => handleOrderApproval(order)}
                            >
                              주문 확인
                            </button>
                          )}
                          {orderApproved[order.orderNumber] &&
                            !cookingCompleted[order.orderNumber] && (
                              <>
                                <button
                                  className={`btn btn-warning ${
                                    isSmallScreen ? "btn-sm" : ""
                                  }`}
                                  onClick={() => handleCookingStart(order)}
                                  disabled={orderStatus[order.orderNumber]}
                                >
                                  조리 시작
                                </button>
                                <button
                                  className={`btn btn-success ${
                                    isSmallScreen ? "btn-sm" : ""
                                  }`}
                                  onClick={() => handleCookingEnd(order)}
                                  disabled={!orderStatus[order.orderNumber]}
                                >
                                  조리 완료
                                </button>
                              </>
                            )}
                          {cookingCompleted[order.orderNumber] && (
                            <button
                              className={`btn btn-info ${
                                isSmallScreen ? "btn-sm" : ""
                              }`}
                            >
                              조리완료되었습니다.
                            </button>
                          )}
                        </div>
                      </div>
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

export default OwnerOrderHistory;
