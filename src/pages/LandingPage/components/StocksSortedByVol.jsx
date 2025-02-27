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
    <div className="w-full sm:w-1/2 p-4">
      <h1
        className="text-[18px] font-bold cursor-pointer hover:text-blue-md p-4"
        onClick={() => navigate("/stocks")}
      >
        해외 실시간 <span className="font-bold text-blue-md">Best</span> 순위
      </h1>

      {/* 컨테이너 */}
      <div className="w-full max-w-3xl p-2 rounded-2xl">
        {/* 헤더 */}
        <div className="flex justify-between bg-gray-100 text-black font-bold p-4 rounded-2xl shadow-md mb-2 text-[14px] ">
          <p className="w-1/4 text-center">종목명</p>
          <p className="w-1/4 text-center">현재가</p>
          <p className="w-1/4 text-center">등락률</p>
          <p className="w-1/4 text-center">거래량</p>
        </div>

        {/* 데이터 */}
        {stocks?.slice(0, 5).map((stock, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 rounded-2xl shadow-md hover:shadow-lg transition-all mb-3 text-sm font-semibold"
            onClick={() => navigate(`./main/${stock.ticker}/all`)}
          >
            {/* 종목명 & 종목 코드 */}
            <div className="w-1/4 text-center">
              <p className="text-sm font-bold">
                {stock.name.length > 10
                  ? stock.name.slice(0, 20) + "..."
                  : stock.name}
              </p>
              <p className="text-gray-md">{stock.ticker}</p>
            </div>

            {/* 현재가 */}
            <p className="w-1/4 text-center">{stock.current_price}</p>

            {/* 등락률 (양:빨강, 음:파랑) */}
            <div
              className={
                stock.change_rate.startsWith("+")
                  ? "text-red-500"
                  : "text-blue-500"
              }
            >
              {stock.change_rate}
            </div>

            {/* 거래량 */}
            <p className="w-1/4 text-center">{stock.volume}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
