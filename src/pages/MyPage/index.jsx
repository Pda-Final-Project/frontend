import React, { useEffect, useState } from "react";
import MyInfo from "./components/MyInfo";
import StockBalance from "./components/StockBalance";
import Holdings from "./components/Holdings";
import TradeDetails from "./components/TradeDetails";

export default function Index() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
  return (
    <div
      className={`flex flex-col w-full space-y-4 p-8 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* 계좌 및 기본 정보 */}
      <div>
        <MyInfo />
      </div>

      {/* 해외 주식 잔고 */}
      <div>
        <StockBalance />
      </div>

      {/* 보유 & 손익 내역 수평 배치 */}
      <div className="flex flex-col lg:flex-row gap-4 h-140">
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
