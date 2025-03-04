import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisclosureTab from "./components/DisclosureTab";
import TradingTab from "./components/TradingTab";
import LikeButton from "../../components/common/LikeButton";
import { fetchStocks } from "../../api/stockApi";
import { formatNumber } from "../../utils/numberFormat";
import { useStockSse } from "../../hooks/useSseStockInfo";

export default function MainPage() {
  const { ticker, filling_id } = useParams();
  const [stockInfo, setStockInfo] = useState([
    {
      ticker: ticker,
      name: "",
      current_price: 0,
      change_rate: 0,
    },
  ]); // 초기값을 배열([])로 설정

  const tryFetchStock = async () => {
    try {
      const response = await fetchStocks("", ticker);
      if (response.data.status === "OK") {
        const filteredStock = response.data.data
          .flat()
          .find((stock) => stock.ticker === ticker);

        if (filteredStock) {
          setStockInfo([filteredStock]);
        } else {
          setStockInfo([]);
        }
      }
    } catch (error) {
      console.error("주식 정보 조회 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    if (ticker) {
      tryFetchStock();
    }
  }, [ticker]);

  // 실시간 시세 및 등락율 SSE 연결
  const { isConnected, error } = useStockSse(
    `${import.meta.env.VITE_API_DATA_URL}/stocks/stream`,
    stockInfo,
    setStockInfo
  );

  if (stockInfo.length === 0) {
    return <div className="text-center text-gray-500">로딩 중...</div>;
  }

  const currentStock = stockInfo[0]; // 배열에서 첫 번째 요소 사용

  return (
    <div className="flex flex-col w-full h-full bg-gray-light p-8">
      {/** 종목 기본 정보(로고, 종목명, 종목 코드, 현재가, 변동률) */}
      <div className="flex items-center gap-4 pb-4 font-semibold">
        <div>
          <img
            src={`${import.meta.env.VITE_STOCK_LOGO_URL}${ticker}.png`}
            className="w-full h-14 rounded-full"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="text-lg">{currentStock.name}</div>
            <div className="text-lg text-gray-md">{ticker}</div>
            <LikeButton ticker={ticker} />
          </div>
          <div className="flex items-end gap-2">
            <div className="text-2xl">
              {formatNumber(parseFloat(currentStock.current_price))}원
            </div>
            <div className="text-sm">
              <span
                className={
                  currentStock.change_rate?.toString().startsWith("+")
                    ? "text-red-500"
                    : currentStock.change_rate?.toString().startsWith("-")
                    ? "text-blue-500"
                    : "text-black"
                }
              >
                {currentStock.change_rate}%
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 h-full gap-8">
        {/** 공시탭 */}
        <div>
          <DisclosureTab ticker={ticker} />
        </div>
        {/** 주식탭 */}
        <div>
          <TradingTab
            filling_id={filling_id}
            ticker={ticker}
            currentPrice={currentStock.current_price}
          />
        </div>
      </div>
    </div>
  );
}
