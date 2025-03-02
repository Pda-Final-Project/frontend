import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../common/LikeButton";
import { useStockSse } from "../../../hooks/useSseStockInfo";

export default function HoldingStockTab() {
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

  const { isConnected, error } = useStockSse(
    `${import.meta.env.VITE_API_DATA_URL}/stocks/stream`,
    stocks,
    setStocks
  );

  useEffect(() => {}, []);

  return (
    <div className="h-full w-100 bg-gray-light shadow-md z-50 py-4 px-2 space-y-2">
      {/* 내부 사이드바 헤더 */}
      <div className="p-4 flex flex-col justify-between border-b-1 border-gray-md">
        <h2 className="text-lg font-semibold w-full">My 보유주식</h2>
        <div className="text-sm mt-1 text-blue-md">
          나의 보유 주식을 모아보세요
        </div>
      </div>

      {/* 내부 콘텐츠 */}
      <div className="p-2 flex flex-col space-y-2">
        {stocks.map((stock) => (
          <div
            key={stock.ticker}
            className="flex justify-between p-2 hover:bg-blue-light duration-300 rounded-lg cursor-pointer items-center"
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
              <div>
                <div className="font-semibold text-sm">{stock.name}</div>
                <div className="">{stock.quantity}주</div>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col items-end font-semibold">
                <div>{stock.current_price}원</div>
                <div className="text-sm">{stock.change_rate}</div>
              </div>
              <LikeButton ticker={stock.ticker} initState={stock.pinned} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
