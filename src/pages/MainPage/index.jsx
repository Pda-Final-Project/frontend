import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisclosureTab from "./components/DisclosureTab";
import TradingTab from "./components/TradingTab";
import LikeButton from "../../components/common/LikeButton";
import { fetchStocks } from "../../api/stockApi";

export default function MainPage() {
  const { ticker, filling_id } = useParams();
  const [stockInfo, setStockInfo] = useState({
    ticker: "",
    current_price: "",
    name: "",
    change_rate: "",
    volume: "",
  });

  const tryFetchStock = async () => {
    try {
      const response = await fetchStocks("", ticker);
      if (response.data.status === "OK") {
        const stockData = response.data.data.find(
          (stock) => stock.ticker === ticker
        );
        if (stockData) {
          setStockInfo(stockData);
        }
      }
    } catch (error) {
      console.error("주식 리스트 조회 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    tryFetchStock();
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-gray-light p-8">
      {/** 종목 기본 정보(로고, 종목명, 종목 코드, 현재가, 변동률) */}
      <div className="flex items-center gap-4 pb-4 font-semibold">
        <div>
          <img
            src={`${import.meta.env.VITE_STOCK_LOGO_URL}${ticker}.png`}
            className="w-full h-14 rounded-full"
            onClick={() =>
              console.log(`${import.meta.env.VITE_STOCK_LOGO_URL}${ticker}.png`)
            }
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="text-lg">{stockInfo.name}</div>
            <div className="text-lg text-gray-md">{ticker}</div>
            <LikeButton ticker={ticker} />
          </div>
          <div className="flex items-end gap-2">
            <div className="text-2xl">
              {stockInfo.current_price.toLocaleString("en-US")}원
            </div>
            <div className="text-sm">
              <span
                className={
                  stockInfo.change_rate.startsWith("+")
                    ? "text-red-500"
                    : stockInfo.change_rate.startsWith("-")
                    ? "text-blue-500"
                    : "text-black"
                }
              >
                {stockInfo.change_rate}%
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 h-full gap-8">
        {/** 공시탭 */}
        <div className="">
          <DisclosureTab ticker={ticker} />
        </div>
        {/** 주식탭 */}
        <div className="">
          <TradingTab
            filling_id={filling_id}
            ticker={ticker}
            currentPrice={stockInfo.currentPrice}
          />
        </div>
      </div>
    </div>
  );
}
