import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../common/LikeButton";
import { useStockSse } from "../../../hooks/useSseStockInfo";
import { formatNumber } from "../../../utils/numberFormat";

export default function InterestStockTab() {
  const [stocks, setStocks] = useState([
    {
      ticker: "NVDA",
      name: "엔비디아",
      current_price: 1000,
      change_rate: 1.23,
      pinned: true,
    },
    {
      ticker: "TSLA",
      name: "테슬라",
      current_price: 1000,
      change_rate: 1.23,
      pinned: true,
    },
    {
      ticker: "GOOGL",
      name: "구글",
      current_price: 1000,
      change_rate: 1.23,
      pinned: true,
    },
  ]);
  const navigate = useNavigate();

  // 실시간 시세 및 등락율 sse 연결
  const { isConnected, error } = useStockSse(setStocks);

  // 컴포넌트가 마운트될 때 애니메이션 시작
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100); // 0.1초 후 나타나도록
  }, []);

  return (
    <div className="h-full w-100 bg-gray-light py-4 px-2 space-y-2 shadow-md">
      {/* 내부 사이드바 헤더 */}
      <div className="p-4 flex flex-col justify-between border-b-1 border-gray-md">
        <h2 className="text-lg font-semibold w-full">My 관심종목</h2>
        <div className="text-[14px] font-semibold mt-1 text-blue-md">
          나의 관심 종목을 모아보세요
        </div>
      </div>

      {/* 내부 콘텐츠 */}
      <div
        className={`p-2 flex flex-col space-y-2 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {stocks.map((stock) => (
          <div
            key={stock.ticker}
            className="flex justify-between p-2 hover:bg-blue-light duration-300 rounded-lg cursor-pointer"
            onClick={() => {
              navigate(`/main/${stock.ticker}/all`);
            }}
          >
            <div className="flex items-center space-x-2">
              <img
                src={`${import.meta.env.VITE_STOCK_LOGO_URL}${
                  stock.ticker
                }.png`}
                className="w-12 h-12 rounded-full"
              />
              <div className="font-semibold text-sm">{stock.name}</div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex flex-col items-end font-semibold">
                <div className="text-[16px] mb-0.5">
                  {formatNumber(parseFloat(stock.current_price))}원
                </div>
                <div
                  className={`${
                    stock.change_rate > 0
                      ? "text-red-md"
                      : stock.change_rate < 0
                      ? "text-blue-dark"
                      : "text-black"
                  }`}
                >
                  {stock.change_rate}%
                </div>
              </div>
              <LikeButton ticker={stock.ticker} initState={stock.pinned} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
