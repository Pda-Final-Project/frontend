import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../common/LikeButton";
import { useStockSse } from "../../../hooks/useSseStockInfo";
import { fetchHoldings } from "../../../api/accountApi";
import { formatNumber } from "../../../utils/numberFormat";

export default function HoldingStockTab() {
  const [stocks, setStocks] = useState([]);
  const navigate = useNavigate();

  const tryFetchHoldings = async () => {
    try {
      const response = await fetchHoldings("buyAmount");
      if (response.data.status === "OK") {
        const mappedStocks = response.data.data.map((stock) => ({
          ticker: stock.stockTicker,
          holdingQuantity: stock.holdingQuantity,
          current_price: stock.currentPrice,
          returnRate: stock.returnRate,
        }));

        setStocks(mappedStocks);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const { isConnected, error } = useStockSse(setStocks);

  // 컴포넌트가 마운트될 때 애니메이션 시작
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    tryFetchHoldings();
  }, []);

  return (
    <div className="h-full w-100 bg-gray-light py-4 px-2 space-y-2">
      {/* 내부 사이드바 헤더 */}
      <div className="p-4 flex flex-col justify-between border-b-1 border-gray-md">
        <h2 className="text-lg font-semibold w-full">My 보유 종목</h2>
        <div className="text-[14px] font-semibold mt-1 text-blue-md">
          나의 보유 종목을 모아보세요
        </div>
      </div>

      {/* 내부 콘텐츠 */}
      <div
        className={`p-2 flex flex-col space-y-2 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {stocks.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 text-sm">
            보유 주식이 없습니다.
          </div>
        ) : (
          stocks?.map((stock) => (
            <div
              key={stock.ticker}
              className="flex justify-between p-2 hover:bg-blue-light duration-300 rounded-lg cursor-pointer items-center"
              onClick={() => {
                navigate(`/main/${stock.ticker}/all`);
              }}
            >
              <div className="flex items-center space-x-2 ">
                <img
                  src={`${import.meta.env.VITE_STOCK_LOGO_URL}${
                    stock.ticker
                  }.png`}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold text-sm mb-0.5">
                    {stock.ticker}
                  </div>
                  <div>{stock.holdingQuantity}주</div>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex flex-col items-end font-semibold">
                  <div className="text-[16px] mb-0.5">
                    {formatNumber(parseInt(stock.current_price))}원
                  </div>
                  <div
                    className={`${
                      stock.returnRate > 0
                        ? "text-red-md"
                        : stock.returnRate < 0
                        ? "text-blue-dark"
                        : "text-black"
                    }`}
                  >
                    수익률({stock.returnRate.toFixed()}%)
                  </div>
                </div>
                <LikeButton ticker={stock.ticker} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
