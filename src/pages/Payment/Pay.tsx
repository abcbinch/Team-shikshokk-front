import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Modal } from "../../components/ui/modal";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { Order, OrderState } from "../../store/order";
import { RootState } from "../../store/rootReducer";
import Header from "../../components/Header/Header";

const Pay: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hour, setHour] = useState<string>("10");
  const [minute, setMinute] = useState<string>("00");
  const [guests, setGuests] = useState<number>(1);
  const [orderType, setOrderType] = useState<string>("매장");

  const hours: string[] = Array.from({ length: 13 }, (_, i) =>
    (i + 10).toString().padStart(2, "0")
  );
  const minutes: string[] = ["00", "10", "20", "30", "40", "50"];

  const increaseGuests = () => setGuests((prev) => prev + 1);
  const decreaseGuests = () => setGuests((prev) => (prev > 1 ? prev - 1 : 1));
  const orderData = useSelector((state: RootState) => state.order.orders);
  const dispatch = useDispatch();

  const handleOrder = () => {
    const lastOrder =
      orderData.length > 0 ? orderData[orderData.length - 1] : {};

    const newOrder = {
      ...lastOrder,
      guests: guests,
      visitHour: hour,
      visitMinute: minute,
      visitDate: date,
      orderType: orderType,
    };

    dispatch({ type: "order/addOrder", payload: newOrder });
    console.log(orderData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white">
      <Header />
      <Card className="mt-5 p-6 w-96 bg-white shadow-lg rounded-lg border border-amber-400">
        <CardContent className="flex flex-col gap-6">
          <div className="flex justify-center gap-6 text-lg font-semibold text-amber-600">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="매장"
                checked={orderType === "매장"}
                onChange={() => setOrderType("매장")}
                className="hidden"
              />
              <div
                className={`px-4 py-2 rounded-md border border-amber-400 ${
                  orderType === "매장"
                    ? "bg-amber-400 text-white"
                    : "bg-white text-amber-600"
                }`}
              >
                매장
              </div>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="포장"
                checked={orderType === "포장"}
                onChange={() => setOrderType("포장")}
                className="hidden"
              />
              <div
                className={`px-4 py-2 rounded-md border border-amber-400 ${
                  orderType === "포장"
                    ? "bg-amber-400 text-white"
                    : "bg-white text-amber-600"
                }`}
              >
                포장
              </div>
            </label>
          </div>

          <Button
            className="bg-amber-400 hover:bg-amber-500 text-white"
            onClick={() => setIsOpen(true)}
          >
            날짜 선택
          </Button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <DatePicker
              selected={date}
              onChange={(newDate: Date | null) => {
                if (newDate) setDate(newDate);
              }}
              locale="ko"
              minDate={new Date()}
              maxDate={new Date(new Date().setDate(new Date().getDate() + 30))}
              inline
            />
            <Button
              className="mt-4 bg-amber-400 hover:bg-amber-500 text-white"
              onClick={() => setIsOpen(false)}
            >
              확인
            </Button>
          </Modal>
          <div className="text-center text-lg font-bold text-amber-600">
            선택한 날짜: {date.toLocaleDateString("ko-KR")}
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="text-lg font-bold text-amber-600">방문 시간</div>
            <div className="flex gap-2">
              <select
                className="border p-2 rounded-md text-lg bg-white border-amber-400 text-amber-600"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
              >
                {hours.map((h) => (
                  <option key={h} value={h}>
                    {h}시
                  </option>
                ))}
              </select>
              <select
                className="border p-2 rounded-md text-lg bg-white border-amber-400 text-amber-600"
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
              >
                {minutes.map((m) => (
                  <option key={m} value={m}>
                    {m}분
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center">
            <Button
              className="bg-amber-400 hover:bg-amber-500 text-white"
              onClick={decreaseGuests}
            >
              -
            </Button>
            <span className="text-lg font-bold text-amber-600">{guests}명</span>
            <Button
              className="bg-amber-400 text-lg hover:bg-amber-500 text-white"
              onClick={increaseGuests}
            >
              +
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 w-96 bg-white shadow-lg rounded-lg p-4 border border-amber-400 text-amber-600">
        <div className="text-lg font-bold">장바구니</div>
        <hr className="my-2" />
        <div className="flex justify-between text-lg">
          <span>호랑이 치킨 x1</span>
          <span>20,000원</span>
        </div>
        <div className="flex justify-between text-lg">
          <span>사자 치킨 x1</span>
          <span>30,000원</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between text-lg font-bold">
          <span>합계:</span>
          <span>50,000원</span>
        </div>
      </div>
      <div className="mt-2 ">
        <Button onClick={handleOrder} className="">
          결제하기 : 50,000원
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Pay;
