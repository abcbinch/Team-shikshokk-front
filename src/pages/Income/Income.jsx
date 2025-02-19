import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../Header/Header";
import axios from "axios";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  LabelList,
} from "recharts";
import { ko } from "date-fns/locale";

export default function Income() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [selectedDateText, setSelectedDateText] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("매출");
  const [data, setData] = useState({
    매출: [],
    방문수: [],
    재방문율: [],
  });
  const [menuPrice, setMenuPrice] = useState([]);
  const handleDateChange = (dates) => {
    setDateRange(dates);
    if (dates[0] && dates[1]) {
      setSelectedDateText(
        `${dates[0].toLocaleDateString()} - ${dates[1].toLocaleDateString()}`
      );
    }
  };

  const generateChartDataForWeek = (start, end) => {
    if (!start || !end) return [];
    const diffDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 3600 * 24)
    );
    const step = diffDays > 30 ? Math.ceil(diffDays / 30) : 1;
    return Array.from({ length: Math.ceil(diffDays / step) + 1 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i * step);
      return {
        name: `${date.getMonth() + 1}월${date.getDate()}일`,
        value: data[selectedOption][i % data[selectedOption].length],
      };
    });
  };

  const menu = [
    { name: "치킨", value: 102, color: "#ff9999" },
    { name: "피자", value: 202, color: "#66b3ff" },
    { name: "햄버거", value: 302, color: "#99ff99" },
  ];

  const price = async () => {
    const result = await axios.post("http://localhost:8082/api-server/income", {
      startDate: dateRange[0],
      endDate: dateRange[1],
    });
    console.log(result.data);
    const menuTotal = result.data.reduce((acc, menu) => {
      const price = parseInt(menu.totalPrice, 10) || 0;
      acc[menu.menuName] = (acc[menu.menuName] || 0) + price;
      return acc;
    }, {});

    setMenuPrice(menuTotal);
    console.log(menuTotal);
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
    if (dateRange.length > 0) {
      price();
    }
  }, [dateRange]);

  return (
    <div className="w-[1200px] mx-auto bg-amber-400 p-6 rounded-lg shadow-lg">
      <Header />
      <h1 className="text-3xl font-bold text-center text-white">매출관리</h1>
      <hr className="my-4 border-white" />

      <div className="text-center mb-4">
        <span className="font-semibold text-lg">선택기간 :</span>
        <span className="ml-2">
          {selectedDateText || "날짜를 선택해주세요"}
        </span>
        <button
          onClick={() => setIsCalendarVisible(!isCalendarVisible)}
          className="ml-4 px-4 py-2 bg-white text-amber-500 font-bold rounded-lg shadow"
        >
          달력 보기
        </button>
        {isCalendarVisible && (
          <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-white p-2 rounded-lg shadow-lg z-10">
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
        <div className="p-4 bg-amber-500 rounded-lg shadow">
          <h4 className="font-bold">매출액</h4>
          <hr className="my-2 border-white" />
          <p>
            {Object.entries(menuPrice).map(([menuName, price]) => (
              <div key={menuName}>
                {menuName}: {price}
              </div>
            ))}

            <p className="text-right font-bold">총 매출액 :</p>
          </p>
        </div>
        <div className="p-4 bg-amber-500 rounded-lg shadow">
          <h4 className="font-bold">고객 수</h4>
          <hr className="my-2 border-white" />
          <p>방문 고객 수 : 8명</p>
          <p>포장 고객 수 : 2명</p>
          <p className="text-right font-bold">총 고객 수 : 10명</p>
        </div>
        <div className="p-4 bg-amber-500 rounded-lg shadow">
          <h4 className="font-bold">재방문율</h4>
          <hr className="my-2 border-white" />
          <p>총 고객 수 : 100명</p>
          <p>재방문 고객 : 10명</p>
          <p>신규 고객 : 90명</p>
          <p className="text-right font-bold">재방문율 : 10%</p>
        </div>
      </div>

      <div className="flex justify-center gap-10 mt-10">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <select
            onChange={(e) => {
              setSelectedOption(e.target.value);
            }}
            className="mb-4 p-2 border rounded-lg"
          >
            <option value="매출">매출</option>
            <option value="방문수">고객 수</option>
            <option value="재방문율">재방문율</option>
          </select>
          <ResponsiveContainer width={900} height={500}>
            <AreaChart
              data={generateChartDataForWeek(dateRange[0], dateRange[1])}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="linear"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="text-center bg-white p-4 rounded-lg shadow-lg">
          <h4 className="font-bold">메뉴별 매출 비율</h4>
          <ResponsiveContainer width={300} height={400}>
            <PieChart>
              <Pie
                data={menu}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value, percent }) => {
                  return `${name} (${(percent * 100).toFixed(2)}%)`;
                }}
                labelLine={false}
              >
                {menu.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <table className="w-full mt-4 border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">메뉴</th>
                <th className="p-2 border">매출</th>
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
