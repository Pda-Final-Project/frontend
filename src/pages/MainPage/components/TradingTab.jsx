import React from "react";
import ChartTab from "../../../components/trading/ChartTab";
import SellBox from "../../../components/trading/SellBox";
import BuyBox from "../../../components/trading/BuyBox";

export default function TradingTab() {
  return (
    <div>
      {/** 주식 차트 */}
      <div>
        <ChartTab />
      </div>
      {/** 소수점 매수 & 매도 */}
      <div>
        <div>
          <SellBox />
        </div>
        <div>
          <BuyBox />
        </div>
      </div>
      {/** 실시간 시세 & 체결 내역 */}
      <div></div>
    </div>
  );
}
