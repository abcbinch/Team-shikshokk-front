import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Header from "../../components/Header/Header";
import axios from "axios";

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ko } from "date-fns/locale";

export default function Income() {
  const [dateRange, setDateRange] = useState([]);
  const [selectedDateText, setSelectedDateText] = useState("");
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("income");
  const [data, setData] = useState({
    income: [],
    visitors: [],
  });
  const [menuData, setMenuData] = useState([]);
  const [orderVisitor, setOrderVisitor] = useState({});
  const [menuSum, setMenuSum] = useState(0);
  const [reVisit, setReVisit] = useState({});

  const [menu, setMenu] = useState([
    { name: "치킨", value: 102, color: "#ff9999" },
    { name: "피자", value: 202, color: "#66b3ff" },
    { name: "햄버거", value: 302, color: "#99ff99" },
  ]);
  const handleDateChange = (dates) => {
    setDateRange(dates);
    if (dates[0] && dates[1]) {
      setSelectedDateText(
        `${dates[0].toLocaleDateString()} - ${dates[1].toLocaleDateString()}`
      );
    }
  };

  const price = async () => {
    const result = await axios.post(
      "http://localhost:8082/api-server/income/orderMenu",
      {
        startDate: dateRange[0],
        endDate: dateRange[1],
      }
    );

    const menuSum = result.data.priceSum;
    setMenuSum(menuSum);
    const menuData = Object.values(result.data.menu);
    setMenuData(menuData);
    const datePerSum = Object.values(result.data.datePerSum);

    setData((prevData) => ({
      ...prevData,
      income: datePerSum,
    }));

    const menuNumber = Object.values(result.data.groupedMenu);
    setMenu(menuNumber);
  };

  const visitor = async () => {
    const result = await axios.post(
      "http://localhost:8082/api-server/income/orderVisitor",
      {
        startDate: dateRange[0],
        endDate: dateRange[1],
      }
    );

    const visitData = Object.values(result.data.takeOutData);
    setOrderVisitor(visitData);
    console.log(orderVisitor);

    const visitPerDate = Object.values(result.data.totalVisitors);
    setData((prevData) => ({
      ...prevData,
      visitors: visitPerDate,
    }));
  };
  const reVisitor = async () => {
    const result = await axios.post(
      "http://localhost:8082/api-server/income/reVisitor",
      {
        startDate: dateRange[0],
        endDate: dateRange[1],
      }
    );
    const reVisitData = Object.values(result.data.reVisitData).reduce(
      (acc, user) => {
        if (user.isReVisit) {
          acc.reVisit += user.number;
        } else {
          acc.firstVisit += user.number;
        }
        acc.visitPercent =
          acc.reVisit === 0
            ? 0
            : Math.floor((acc.reVisit / (acc.reVisit + acc.firstVisit)) * 100);
        return acc;
      },
      { reVisit: 0, firstVisit: 0, visitPercent: 0 }
    );

    setReVisit(reVisitData);
  };
  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    setDateRange([thirtyDaysAgo, today]);
    setSelectedDateText(
      `${thirtyDaysAgo.toLocaleDateString()} - ${today.toLocaleDateString()}`
    );
  }, []);

  useEffect(() => {
    if (dateRange[1]) {
      price();
      visitor();
      reVisitor();
    }
  }, [dateRange[1]]);

  return (
    <div className="w-[1200px] mx-auto bg-amber-400 p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-white">매출관리</h1>
      <hr className="my-4 border-white" />

      <div className="mb-4 text-center">
        <span className="text-lg font-semibold">선택기간 :</span>
        <span className="ml-2">
          {selectedDateText || "날짜를 선택해주세요"}
        </span>
        <button
          onClick={() => setIsCalendarVisible(!isCalendarVisible)}
          className="px-4 py-2 ml-4 font-bold bg-white rounded-lg shadow text-amber-500"
        >
          달력 보기
        </button>
        {isCalendarVisible && (
          <div className="absolute z-10 p-2 mt-2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg left-1/2">
            <DatePicker
              selectsRange
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={handleDateChange}
              inline
              className="rounded-lg border-amber-500"
              locale={ko}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 text-white">
        <div className="p-4 rounded-lg shadow bg-amber-500">
          <h4 className="font-bold">매출액</h4>
          <hr className="my-2 border-white" />
          <p>
            <div>
              {menuData.map((el) => {
                return (
                  <div>
                    {el.menuName}: {el.totalPrice}원
                  </div>
                );
              })}
            </div>
          </p>
          <p className="text-right font-bold">총 매출액 : {menuSum}원</p>
        </div>
        <div className="p-4 rounded-lg shadow bg-amber-500">
          <h4 className="font-bold">고객 수</h4>
          <hr className="my-2 border-white" />

          <p>방문 고객 수 : {orderVisitor[0] ? orderVisitor[0] : 0}명</p>
          <p>포장 고객 수 : {orderVisitor[1] ? orderVisitor[1] : 0}명</p>
          <p className="text-right font-bold">
            총 고객 수 :{" "}
            {orderVisitor[0] + orderVisitor[1]
              ? orderVisitor[0] + orderVisitor[1]
              : "0"}{" "}
            명
          </p>
        </div>
        <div className="p-4 rounded-lg shadow bg-amber-500">
          <h4 className="font-bold">재방문율</h4>
          <hr className="my-2 border-white" />

          <p>재방문 고객 : {reVisit.reVisit}명</p>
          <p>신규 고객 : {reVisit.firstVisit}명</p>
          <p className="text-right font-bold">
            재방문율 : {reVisit.visitPercent}%{" "}
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-10 mt-10 w-full h-full">
        <div className="bg-white p-4 rounded-lg shadow-lg w-[70%] h-full">
          <select
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
            className="p-2 mb-4 border rounded-lg"
          >
            <option value="income">매출</option>
            <option value="visitors">고객 수</option>
          </select>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data[selectedOption]}>
              <XAxis dataKey="날짜" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="매출" fill="rgb(233, 52, 52)" />
              <Bar dataKey="포장" fill="rgb(233, 52, 52)" />
              <Bar
                dataKey="매장"
                fill="hsl(0, 59.42028985507246%, 27.058823529411768%)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center bg-white p-4 rounded-lg shadow-lg w-[30%] ">
          <h4 className="font-bold">메뉴별 매출 비율</h4>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart width="100%" height={400}>
              <Pie
                data={menu}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percent, x, y }) => (
                  <text
                    x={x}
                    y={y}
                    fill="black"
                    textAnchor="middle"
                    fontSize={12}
                  >
                    {`${name} (${(percent * 100).toFixed(2)}%)`}
                  </text>
                )}
                labelLine={false}
              >
                {menu.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <table className="w-full mt-4 border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">메뉴</th>
                <th className="p-2 border">판매수량</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={index} className="border">
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
