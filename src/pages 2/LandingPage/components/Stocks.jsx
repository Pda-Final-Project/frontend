import React from "react";
import { useNavigate } from "react-router-dom";
import DUMMY_STOCKS from "./data/dummyStocks";

export default function Stocks() {
  const navigate = useNavigate();
  return (
    <div className="p-4">
    
      <h1 className="text-2xl font-bold cursor-pointer hover:underline"onClick={() => navigate("/stocks")}
      >해외 실시간 <span className="font-bold text-blue-500">Best</span> 순위</h1>

      {/* 컨테이너 */}
      <div className="mt-4 p-4 rounded-lg">
        
        {/* 헤더 */}
        <div className="flex justify-between bg-gray-100 text-black font-bold p-4 rounded-lg mb-2">
          <p className="w-1/3 text-lg text-center">종목명 / 종목코드</p>
          <p className="w-1/3 text-lg text-center">현재가</p>
          <p className="w-1/3 text-lg text-center">등락률</p>
        </div>

        {/* 데이터 */}
        {DUMMY_STOCKS.slice(0, 5).map((stock, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-all mb-3"
          >
            {/* 종목명 & 종목 코드 */}
            <div className="w-1/3 text-center">
              <p className="text-lg font-bold">{stock.name}</p>
              <p className="text-gray-500">{stock.ticker}</p>
            </div>

            {/* 현재가 */}
            <p className="w-1/3 text-center text-lg font-semibold">{stock.price.toFixed(2)}</p>

            {/* 등락률 (양:빨강, 음:파랑) */}
            <p
              className={`w-1/3 text-center text-lg font-bold ${
                stock.changePercent < 0 ? "text-blue-500" : "text-red-500"
              }`}
            >
              {stock.changePercent < 0 ? "🔻" : "🔺"} {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              {/* 역세모 빨강말고 파랑은 없어서 임시로 지정함 나중에 바꿔야 함 */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
