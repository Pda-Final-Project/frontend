import React, { useState, useEffect } from "react";
import ChartTab from "../../../components/trading/ChartTab";
import SellBox from "../../../components/trading/SellBox";
import BuyBox from "../../../components/trading/BuyBox";
import MarketPriceList from "../../../components/trading/MarketPriceList";
import { fetchAvailBalance, fetchBalance } from "../../../api/accountApi";
import { postOrder } from "../../../api/tradeApi";

export default function TradingTab({ ticker, currentPrice }) {
  const [totalBalance, setTotalBalance] = useState(0);
  const [availBalance, setAvailBalance] = useState(0);
  const [holdingQuantity, setHoldingQuantity] = useState(50);

  useEffect(() => {
    tryFetchBalance();
    tryFetchAvailBalance();
    bringHoldingQuantity();
  }, []);

  const tryFetchBalance = async () => {
    try {
      const response = await fetchBalance();
      if (response.data.status == "OK") {
        setTotalBalance(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error("예수금 조회 중 오류 발생: ", error.message);
    }
  };

  const tryFetchAvailBalance = async () => {
    try {
      const response = await fetchAvailBalance();
      if (response.data.status == "OK") {
        setAvailBalance(response.data.data);
      }
    } catch (error) {
      console.error("사용 가능 예수금 조회 중 오류 발생");
    }
  };

  const bringHoldingQuantity = () => {
    // 보유 주식 수 가져오기
  };
  const orderStock = async (offerType, offerQuantity, offerPrice) => {
    //매수/매도하기
    try {
      const response = await postOrder({
        offerType: offerType,
        offerQuantity: offerQuantity,
        offerPrice: offerPrice,
        stockTicker: ticker,
      });
      if (response.data.status == "CREATED") {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("주문 중 오류 발생: ", error.message);
    }

    console.log({
      offerType: offerType,
      offerQuantity: offerQuantity,
      offerPrice: offerPrice,
      stockTicker: ticker,
    });
  };
  return (
    <div className="w-full h-full flex flex-col space-y-4">
      {/** 주식 차트 */}
      <div className="flex-col w-full h-full">
        <ChartTab ticker={ticker} />
      </div>
      {/** 매수 & 매도 */}
      <div className="grid grid-cols-2 gap-4 w-full">
        <div>
          <BuyBox withHolding={availBalance} orderStock={orderStock} />
        </div>
        <div>
          <SellBox maxQuantity={holdingQuantity} orderStock={orderStock} />
        </div>
      </div>
      {/** 실시간 시세 & 체결 내역 */}

      <div className="w-full h-full">
        <MarketPriceList />
      </div>
    </div>
  );
}
