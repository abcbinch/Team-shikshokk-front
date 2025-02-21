import { useSelector } from "react-redux";
import Header from "../../../components/Header/Header";
import { AppState } from "../../../store";
import io from "socket.io-client";
import * as S from "../../../store/socket";
import { useEffect } from "react";
interface OrderTestProps {}
const OrderTest: React.FC<OrderTestProps> = () => {
  const socket = io("http://localhost:8082");
  console.log("socket = ", socket);

  const socketState = useSelector<AppState, S.SocketState>(
    ({ socket }) => socket
  );
  useEffect(() => {
    const data = { loginId: "customer01", socketId: socket.id };
    socket.emit("connectCustomer", data);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connect~~~");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  console.log(socketState);
  const order2 = [
    {
      loginId: "customer01",
      orderTime: "2025-02-15 19:30:55",
      orderNumber: "123123",
      storeCapacity: "4",
      contactNumber: "010-1234-1234",
      shopName: "치킨가게",
      shopLoginId: "owner01",
      total: "85000",
      items: [
        "매우매우맛있는후라x1",
        "매우매우맛있는양념x1",
        "매우매우맛있는순살x1",
      ],
    },
    {
      loginId: "customer01",
      orderTime: "2025-02-15 19:30:55",
      orderNumber: "123123",
      storeCapacity: "4",
      contactNumber: "010-1234-1234",
      shopName: "치킨가게",
      total: "85000",
      shopLoginId: "owner01",
      items: [
        "매우매우맛있는후라x5",
        "매우매우맛있는양념x5",
        "매우매우맛있는순살x5",
      ],
    },
  ];
  function order() {
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

export default OrderTest;
