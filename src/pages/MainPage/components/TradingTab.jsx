import React, { useState, useEffect } from "react";
import ChartTab from "../../../components/trading/ChartTab";
import SellBox from "../../../components/trading/SellBox";
import BuyBox from "../../../components/trading/BuyBox";
import MarketPriceList from "../../../components/trading/MarketPriceList";

export default function TradingTab({ ticker, currentPrice }) {
  const [withHolding, setWithHolding] = useState(10000);
  const [holdingQuantity, setHoldingQuantity] = useState(50);

  useEffect(() => {
    bringWithHolding();
    bringHoldingQuantity();
  }, []);

  const bringWithHolding = () => {
    // 예수금 가져오기
  };

  const bringHoldingQuantity = () => {
    // 보유 주식 수 가져오기
  };
  const orderStock = (orderType, quantity, price) => {
    //매수/매도하기
    console.log(
      "ticker:" +
        ticker +
        "\norderType:" +
        orderType +
        "\nquantity:" +
        quantity +
        "\nprice:" +
        price
    );
  };
  return (
    <div className="w-full bg-gray-100 h-full grid grid-rows-3 gap-4">
      {/** 주식 차트 */}
      <div className="flex-col w-full h-full">
        <ChartTab ticker={ticker} />
      </div>
      {/** 매수 & 매도 */}
      <div className="grid grid-cols-2 gap-4 w-full h-full">
        <div>
          <BuyBox withHolding={withHolding} orderStock={orderStock} />
        </div>
        <div>
          <SellBox maxQuantity={holdingQuantity} orderStock={orderStock} />
        </div>
      </div>
      {/** 실시간 시세 & 체결 내역 */}

      <div className="bg-gray-300 w-full h-full">
        <MarketPriceList />
      </div>
    </div>
  );
}
