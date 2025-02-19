import React, { useState, useEffect } from "react";
import ChartTab from "../../../components/trading/ChartTab";
import SellBox from "../../../components/trading/SellBox";
import BuyBox from "../../../components/trading/BuyBox";
import MarketPriceList from "../../../components/trading/MarketPriceList";

export default function TradingTab({ ticker, currentPrice }) {
  const [withHolding, setWithHolding] = useState(10000);
  const [holdingQuantity, setHoldingQuantity] = useState(33.3333);

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
    <div className="w-full bg-gray-200 flex flex-col gap-4">
      {/** 주식 차트 */}
      <div className="flex-col bg-gray-300">
        <ChartTab ticker={ticker} />
      </div>
      {/** 소수점 매수 & 매도 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-300">
          <SellBox
            currentPrice={currentPrice}
            maxQuantity={holdingQuantity}
            orderStock={orderStock}
          />
        </div>
        <div className="bg-gray-300">
          <BuyBox
            currentPrice={currentPrice}
            withHolding={withHolding}
            orderStock={orderStock}
          />
        </div>
      </div>
      {/** 실시간 시세 & 체결 내역 */}

      <div className="bg-gray-300">
        <MarketPriceList />
      </div>
    </div>
  );
}
