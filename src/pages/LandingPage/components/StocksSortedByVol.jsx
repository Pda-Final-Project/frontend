import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStocks } from "../../../api/stockApi";

export default function StocksSortedByVol() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const tryFetchStocks = async () => {
      try {
        const response = await fetchStocks("vol");
        if (response.data.status == "OK") {
          setStocks(response.data.data);
        }
      } catch (error) {
        console.error("주식 리스트 조회 중 오류 발생:", error);
      }
    };
    tryFetchStocks();
  }, []);
  return (
    <div className="w-full">
      <div
        className="flex p-3 items-center cursor-pointer"
        onClick={() => navigate("/stocks")}
      >
        <h1 className="text-[18px] font-bold cursor-pointer hover:text-blue-md duration-300 inline-block w-fit mb-1">
          해외 종목 <span className="font-bold text-blue-md">거래량 </span>
          Best 순위
        </h1>
        <span className="text-blue-md text-center ml-2 font-semibold">
          {" "}
          더 많은 종목 보러가기
        </span>
      </div>

      {/* 컨테이너 */}
      <div className="w-full rounded-2xl">
        <table className="w-full text-center overflow-hidden border-separate border-spacing-0 text-sm font-semibold ">
          <thead>
            <tr className="bg-white text-gray-md">
              <th className="p-3 text-left">종목</th>
              <th className="p-3">현재가</th>
              <th className="p-3">등락률</th>
              <th className="p-3">거래량</th>
            </tr>
          </thead>
          <tbody className="overflow-hidden rounded-lg">
            {stocks?.slice(0, 8).map((stock, index) => (
              <tr
                key={index}
                className={`cursor-pointer hover:bg-blue-light rounded-lg ${
                  index % 2 === 0 ? "bg-gray-light" : "bg-white"
                }`}
                onClick={() => navigate(`../main/${stock.ticker}/all`)}
              >
                <td className="py-4 px-8 flex items-center space-x-2">
                  <span className="w-4">{index + 1}</span>
                  <img
                    src={`${import.meta.env.VITE_STOCK_LOGO_URL}${
                      stock.ticker
                    }.png`}
                    className="w-5 h-5 rounded-full ml-3"
                    alt="img"
                  />
                  <span className="ml-1">{stock.name}</span>
                </td>

                <td className="p-3">{stock.current_price} 원</td>
                <td
                  className={`p-3 ${
                    parseFloat(stock.change_rate) >= 0
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {stock.change_rate}
                </td>

                <td className="p-3">{stock.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
