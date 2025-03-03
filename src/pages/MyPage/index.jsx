import React from "react";
import MyInfo from "./components/MyInfo";
import StockBalance from "./components/StockBalance";
import Holdings from "./components/Holdings";
import TradeDetails from "./components/TradeDetails";

export default function Index() {
  return (
    <div className="w-full p-8">
      {/* 계좌 및 기본 정보 */}
      <MyInfo />

      <div className="mb-3" />

      {/* 해외 주식 잔고 */}
      <StockBalance />

      <div className="mb-4" />

      {/* 보유 & 손익 내역 수평 배치 */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* 보유 종목 */}
        <div className="w-full lg:w-1/2">
          <Holdings />
        </div>

        {/* 손익 내역 */}
        <div className="w-full lg:w-1/2">
          <TradeDetails />
        </div>
      </div>
    </div>
  );
}
