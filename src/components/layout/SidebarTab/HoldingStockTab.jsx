import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../common/LikeButton";
import { useStockSse } from "../../../hooks/useSseStockInfo";
import { fetchHoldings } from "../../../api/accountApi";

export default function HoldingStockTab() {
  const [stocks, setStocks] = useState([
    {
      stockTicker: "NVDA",
      currentPrice: 1000,
      returnRate: 1.23,
      holdingQuantity: 110,
    },
  ]);
  const navigate = useNavigate();

  const tryFetchHoldings = async () => {
    try {
      const response = await fetchHoldings("buyAmount");
      if (response.data.status == "OK") {
        setStocks(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const { isConnected, error } = useStockSse(
    `${import.meta.env.VITE_API_DATA_URL}/stocks/stream`,
    stocks,
    setStocks
  );

  useEffect(() => {
    tryFetchHoldings();
  }, []);

  return (
    <div className="h-full w-100 bg-gray-light z-50 py-4 px-2 space-y-2">
      {/* 내부 사이드바 헤더 */}
      <div className="p-4 flex flex-col justify-between border-b-1 border-gray-md">
        <h2 className="text-lg font-semibold w-full">My 보유 종목</h2>
        <div className="text-sm mt-1 text-blue-md">
          나의 보유 종목을 모아보세요
        </div>
      </div>

      {/* 내부 콘텐츠 */}
      <div className="p-2 flex flex-col space-y-2">
        {stocks.map((stock) => (
          <div
            key={stock.stockTicker}
            className="flex justify-between p-2 hover:bg-blue-light duration-300 rounded-lg cursor-pointer items-center"
            onClick={() => {
              navigate(`/main/${stock.stockTicker}/all`);
            }}
          >
            <div className="flex items-center space-x-2">
              <img
                src={`${import.meta.env.VITE_STOCK_LOGO_URL}${
                  stock.stockTicker
                }.png`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-semibold text-sm">{stock.stockTicker}</div>
                <div className="">{stock.holdingQuantity}주</div>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col items-end font-semibold">
                <div>{stock.currentPrice}원</div>
                <div
                  className={`text-sm ${
                    stock.returnRate > 0
                      ? "text-red-500"
                      : stock.returnRate < 0
                      ? "text-blue-500"
                      : "text-black"
                  }`}
                >
                  {stock.returnRate.toFixed()}%
                </div>
              </div>
              <LikeButton ticker={stock.stockTicker} initState={stock.pinned} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
