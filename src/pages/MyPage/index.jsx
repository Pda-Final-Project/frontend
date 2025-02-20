import React from "react";
import MyInfo from "./components/MyInfo";
import StockBalance from "./components/StockBalance";
import Holdings from "./components/Holdings";
import TradeDetails from "./components/TradeDetails";

export default function index() {
  return (
    <div>
      
      {/** 계좌 및 기본 정보 */}
      <div/>
        <MyInfo />

      <div className="mb-4" />
      {/** 해외 주식 잔고 */}
      <div>
        <StockBalance />
      </div>
      {/** 보유 */}
      <div>
        <Holdings />
      </div>
      {/** 손익 내역 */}
      <div>
        <TradeDetails />
      </div>
    </div>
  );
}
