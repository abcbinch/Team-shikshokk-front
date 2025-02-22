import "../../../styles/ownerOrderHistory.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../../components/Header/Header";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import * as S from "../../../store/socket";
import { AppState } from "../../../store";

interface OwnerOrderHistory2Props {}
const socket = io("http://localhost:8082");

const OwnerOrderHistory2: React.FC<OwnerOrderHistory2Props> = () => {
  const dispatch = useDispatch();
  const socketState = useSelector<AppState, S.SocketState>(
    ({ socket }) => socket
  );

  useEffect(() => {
    const data = { loginId: "owner02", socketId: socket.id };
    socket.emit("connectOwner", data);
    socket.on("connect", () => {
      console.log("socket connect~~~");
    });
    socket.on("order", (data: S.SocketState) => {
      console.log("받은 값 = ", data);
      dispatch(S.addOrder(data));
    });
    socket.on("disconnect", () => {
      console.log("socket disconnect~~~");
    });
    return () => {
      socket.off("connect");
      socket.off("order");
      socket.off("disconnect");
    };
  }, [dispatch]);

  // 모든 주문을 배열로 합친 후, 시간순으로 정렬
  const allOrders = Object.values(socketState.orders)
    .flat()
    .sort((a, b) => {
      return new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime();
    });

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
              {allOrders.map((order) => (
                <div className="receipt-card-all" key={order.orderNumber}>
                  <ul className="receipt-card-list">
                    <li>
                      <FontAwesomeIcon icon={faTimes} className="custom-icon" />
                    </li>
                    <li>주문시간</li>
                    <li>
                      {`${new Date(order.orderTime).getFullYear()}년 ${
                        new Date(order.orderTime).getMonth() + 1
                      }월 ${new Date(order.orderTime).getDate()}일`}
                    </li>
                    <li>
                      {new Date(order.orderTime).toLocaleTimeString("ko-KR", {
                        hour12: false,
                      })}
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
                    {order.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                    <br />
                    <li>합계: {order.total}원</li>
                  </ul>
                  <div className="mt-2">
                    {window.innerWidth >= 480 ? (
                      <div>
                        <button className="btn btn-warning">조리 시작</button>
                        <button className="btn btn-success">조리 완료</button>
                      </div>
                    ) : (
                      <div>
                        <button className="btn btn-warning btn-sm">
                          조리 시작
                        </button>
                        <button className="btn btn-success btn-sm">
                          조리 완료
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default OwnerOrderHistory2;
