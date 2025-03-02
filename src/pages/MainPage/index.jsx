import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DisclosureTab from "./components/DisclosureTab";
import TradingTab from "./components/TradingTab";
import LikeButton from "../../components/common/LikeButton";

export default function MainPage() {
  const { ticker, filling_id } = useParams();
  const [stockInfo, setStockInfo] = useState({
    //SSE 통신으로 현재가, 변동률 갱신
    ticker: ticker,
    name: "Tesla Inc",
    currentPrice: 185215.7,
    changeRate: "+2.22",
    pinned: true,
  });
  return (
    <div className="flex flex-col w-full h-full bg-gray-light p-8 ">
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
            <LikeButton ticker={ticker} initState={stockInfo.pinned} />
          </div>
          <div className="flex items-end gap-2">
            <div className=" text-2xl">
              {stockInfo.currentPrice.toLocaleString("en-US")}원
            </div>
            <div className="text-sm">
              <span
                className={
                  stockInfo.changeRate.startsWith("+")
                    ? "text-red-500"
                    : stockInfo.changeRate.startsWith("-")
                    ? "text-blue-500"
                    : "text-black"
                }
              >
                {stockInfo.changeRate}%
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
