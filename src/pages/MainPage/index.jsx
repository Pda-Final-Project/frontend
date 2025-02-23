import React, { useState } from "react";
import DisclosureTab from "./components/DisclosureTab";
import TradingTab from "./components/TradingTab";

export default function index() {
  const [ticker, setTicker] = useState("000000");
  const [currentPrice, setCurrentPrice] = useState(30);
  return (
    <div className="flex flex-col w-full h-full bg-blue-300">
      {/** 종목 기본 정보(로고, 종목명, 종목 코드, 현재가, 변동률) */}
      <div className="bg-gray-400">
        <div>로고</div>
      </div>
      <div className="w-full grid grid-cols-2 h-full">
        {/** 공시탭 */}
        <div>
          <DisclosureTab ticker={ticker} />
        </div>
        {/** 주식탭 */}
        <div className="overflow-y-scroll">
          <TradingTab ticker={ticker} currentPrice={currentPrice} />
        </div>
      </div>
    </div>
  );
}
