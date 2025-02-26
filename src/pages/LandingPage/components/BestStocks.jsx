import React from "react";
import { useNavigate } from "react-router-dom";
import DUMMY_STOCKS from "./data/dummyStocks";

export default function BestStocks() {
  const navigate = useNavigate();
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
        <div className="flex justify-between bg-gray-100 text-black font-bold p-4 rounded-2xl shadow-md mb-2">
          <p className="w-1/3 text-[16px] text-center">종목명</p>
          <p className="w-1/3 text-[16px] text-center">현재가</p>
          <p className="w-1/3 text-[16px] text-center">등락률</p>
        </div>

        {/* 데이터 */}
        {DUMMY_STOCKS.slice(0, 5).map((stock, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 rounded-2xl shadow-md hover:shadow-lg transition-all mb-3"
            onClick={() => navigate(`./main/${stock.ticker}/all`)}
          >
            {/* 종목명 & 종목 코드 */}
            <div className="w-1/3 text-center">
              <p className="text-sm font-bold">{stock.name}</p>
              <p className="text-gray-500">{stock.ticker}</p>
            </div>

            {/* 현재가 */}
            <p className="w-1/3 text-center text-sm font-semibold">
              {stock.price.toFixed(2)}
            </p>

            {/* 등락률 (양:빨강, 음:파랑) */}
            <p
              className={`w-1/3 text-center text-sm font-bold ${
                stock.changePercent < 0 ? "text-blue-500" : "text-red-500"
              }`}
            >
              {stock.changePercent < 0 ? "🔻" : "🔺"} {stock.change.toFixed(2)}{" "}
              ({stock.changePercent.toFixed(2)}%)
              {/* 역세모 빨강말고 파랑은 없어서 임시로 지정함 나중에 바꿔야 함 */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
