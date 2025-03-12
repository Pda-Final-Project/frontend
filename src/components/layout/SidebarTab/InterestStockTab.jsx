import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../../common/LikeButton";
import { useStockSse } from "../../../hooks/useSseStockInfo";
import { formatNumber } from "../../../utils/numberFormat";
import { useLikedStocksStore } from "../../../hooks/useLikedStocksStore";

export default function InterestStockTab() {
  const navigate = useNavigate();
  const { likedStocks, fetchLikedStocks } = useLikedStocksStore(); // 좋아요 리스트 불러오기
  const [stocks, setStocks] = useState([]);

  // 컴포넌트가 처음 마운트될 때 좋아요한 종목 리스트 가져오기
  useEffect(() => {
    fetchLikedStocks();
  }, []);

  // likedStocks가 변경될 때 stocks 상태 업데이트
  useEffect(() => {
    if (likedStocks.size > 0) {
      // 좋아요한 종목 리스트를 stocks 상태에 반영
      const updatedStocks = Array.from(likedStocks).map((ticker) => ({
        ticker,
        name: ticker, // 실제 주식 이름을 API에서 가져와야 함
        current_price: 0, // 실시간 데이터를 받아와야 함
        change_rate: 0,
      }));

      setStocks(updatedStocks);
    }
  }, [likedStocks]);

  // 실시간 시세 및 등락율 SSE 연결
  const { isConnected, error } = useStockSse(setStocks);

  return (
    <div className="h-full w-100 bg-gray-light py-4 px-2 space-y-2 shadow-md">
      {/* 내부 사이드바 헤더 */}
      <div className="p-4 flex flex-col justify-between border-b-1 border-gray-md">
        <h2 className="text-lg font-semibold w-full">My 관심종목</h2>
        <div className="text-sm mt-1 text-blue-md">
          나의 관심 종목을 모아보세요
        </div>
      </div>

      {/* 내부 콘텐츠 */}
      <div className="p-2 flex flex-col space-y-2">
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
                <div>{formatNumber(parseFloat(stock.current_price))}원</div>
                <div className="text-sm">{stock.change_rate}</div>
              </div>
              <LikeButton ticker={stock.ticker} initState={stock.pinned} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
