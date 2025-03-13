import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../common/LikeButton";
import { useStockSse } from "../../../hooks/useSseStockInfo";
import { formatNumber } from "../../../utils/numberFormat";
import { useLikedStocksStore } from "../../../hooks/useLikedStocksStore";
import { fetchLikeStocks } from "../../../api/stockApi";

export default function InterestStockTab() {
  const navigate = useNavigate();
  const { likedStocks } = useLikedStocksStore();
  const [stocks, setStocks] = useState(likedStocks);

  useEffect(() => {
    tryFetchLikes();
  }, []);

  const tryFetchLikes = async () => {
    try {
      const response = await fetchLikeStocks();
      if (response.data.status == "OK") {
        const updatedStocks = Array.from(response.data.data).map((stock) => ({
          ticker: stock.ticker,
          name: stock.name, // 실제 주식 이름을 API에서 가져와야 함
          current_price: stock.price, // 실시간 데이터를 받아와야 함
          change_rate: stock.change,
        }));

        setStocks(updatedStocks);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    tryFetchLikes();
    console.log(likedStocks);
  }, [likedStocks]);

  // 실시간 시세 및 등락율 SSE 연결
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
        {stocks.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 text-sm">
            관심 주식이 없습니다.
          </div>
        ) : (
          stocks.map((stock) => (
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
                      stock.change_rate
                        ? stock.change_rate.startsWith("+")
                          ? "text-red-md"
                          : stock.change_rate.startsWith("-")
                          ? "text-blue-dark"
                          : "text-black"
                        : ""
                    }`}
                  >
                    {stock.change_rate}
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
