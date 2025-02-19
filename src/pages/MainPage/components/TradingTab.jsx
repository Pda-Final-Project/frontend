import React, { useState, useEffect } from "react";
import ChartTab from "../../../components/trading/ChartTab";
import SellBox from "../../../components/trading/SellBox";
import BuyBox from "../../../components/trading/BuyBox";

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
    <div>
      {/** 주식 차트 */}
      <div>
        <ChartTab ticker={ticker} />
      </div>
      {/** 소수점 매수 & 매도 */}
      <div>
        <div>
          <SellBox
            currentPrice={currentPrice}
            maxQuantity={holdingQuantity}
            orderStock={orderStock}
          />
        </div>
        <div>
          <BuyBox
            currentPrice={currentPrice}
            withHolding={withHolding}
            orderStock={orderStock}
          />
        </div>
      </div>
      {/** 실시간 시세 & 체결 내역 */}
      <div></div>
    </div>
  );
}
