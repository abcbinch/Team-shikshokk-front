import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header/Header";
import { AppState } from "../../../store";
import io from "socket.io-client";
import * as S from "../../../store/socket";
import { use, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useInterval } from "../../../hooks";
import * as C from "../../../store/clock";
interface OrderTest2Props {}
const socket = io("http://localhost:8082");
const OrderTest2: React.FC<OrderTest2Props> = () => {
  const clock = new Date(
    useSelector<AppState, C.State>((state) => state.clock)
  );

  const socketState = useSelector<AppState, S.SocketState>(
    ({ socket }) => socket
  );

  useEffect(() => {
    const data = { loginId: "customer01", socketId: socket.id };
    socket.emit("connectCustomer", data);
    socket.on("connect", () => {
      console.log("socket connect~~~");
      console.log("socket = ", socket);
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

  function order() {
    const order2 = [
      {
        loginId: "customer02",
        orderTime: clock,
        orderNumber: uuidv4(),
        orderType: "포장",
        storeCapacity: "1",
        contactNumber: "010-1234-1234",
        shopName: "치킨가게",
        shopLoginId: "owner02",
        total: "85000",
        items: [
          "매우매우맛있는후라x1",
          "매우매우맛있는양념x1",
          "매우매우맛있는순살x1",
        ],
      },
    ];

    socket.emit("order", order2);
  }

  return (
    <>
      <Header nickname="YourNickname" />
      <div>
        <button
          onClick={() => {
            order();
          }}
          className="btn btn-primary btn-lg"
        >
          주문하기
        </button>
      </div>
    </>
  );
};

export default OrderTest2;
