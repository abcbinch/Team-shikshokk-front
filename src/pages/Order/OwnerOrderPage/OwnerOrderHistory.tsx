import "../../../styles/ownerOrderHistory.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../../components/Header/Header";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import * as S from "../../../store/socket";

import { AppState } from "../../../store";

interface OwnerOrderHistoryProps {}

const OwnerOrderHistory: React.FC<OwnerOrderHistoryProps> = () => {
  const socket = io("http://localhost:8082");

  console.log("socket = ", typeof socket);
  console.log("socket = ", socket);
  const dispatch = useDispatch();

  const socketState = useSelector<AppState, S.SocketState>(
    ({ socket }) => socket
  );
  console.log("socket = ", socketState);

  const connect = useCallback(() => {
    const order = [
      {
        loginId: "minbong03",
        orderTime: "2025-02-15 19:30:55",
        orderNumber: "123123",
        storeCapacity: "4",
        contactNumber: "010-1234-1234",
        shopName: "매장이름",
        total: "85000",
        items: [
          "매우매우맛있는치킨x1",
          "매우매우맛있는피자x1",
          "매우매우맛있는햄버거x1",
        ],
      },
    ];

    dispatch(
      S.setConnect({ socketId: socket.id, loginId: "03", orders: order })
    );
  }, [dispatch]);

  function addorder() {
    const order = [
      {
        loginId: "minbong03",
        orderTime: "2025-02-15 19:30:55",
        orderNumber: "123123",
        storeCapacity: "4",
        contactNumber: "010-1234-1234",
        shopName: "매장이름",
        total: "85000",
        items: [
          "매우매우맛있는치킨x1",
          "매우매우맛있는피자x1",
          "매우매우맛있는햄버거x1",
        ],
      },
    ];
  }
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          connect();
        }}
      >
        주문버튼
      </button>

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
              <div className="receipt-card-all">
                <ul className="receipt-card-list">
                  <li>
                    <FontAwesomeIcon icon={faTimes} className="custom-icon" />
                  </li>
                  <li>주문시간</li>
                  <li>[2025-02-15]</li>
                  <li>19:30:55</li>
                  <li>주문번호</li>
                  <li>123123</li>
                  <li>매장 인원 4명</li>
                  <li>연락처</li>
                  <li>010-1234-1234</li>
                  <li>메뉴이름</li>
                  <li>매우매우맛있는치킨x1</li>
                  <li>매우매우맛있는피자x1</li>
                  <li>매우매우맛있는햄버거x1</li>
                  <br />
                  <li>합계: 85000원</li>
                  <li>방문시간</li>
                  <li>19:40:55</li>
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
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default OwnerOrderHistory;
