import React, { useState } from "react";
import DisclosureTab from "./components/DisclosureTab";
import TradingTab from "./components/TradingTab";

export default function index() {
  const [ticker, setTicker] = useState("000000");
  const [currentPrice, setCurrentPrice] = useState(30);
  return (
    <div>
      메인페이지
      {/** 종목 기본 정보(로고, 종목명, 종목 코드, 현재가, 변동률) */}
      <div></div>
      {/** 공시탭 */}
      <div>
        <DisclosureTab ticker={ticker} />
      </div>
      {/** 주식탭 */}
      <div>
        <TradingTab ticker={ticker} currentPrice={currentPrice} />
      </div>
    </div>
  );
}
