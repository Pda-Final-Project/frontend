import React, { useState, useEffect } from "react";
import ChartTab from "../../../components/trading/ChartTab";
import SellBox from "../../../components/trading/SellBox";
import BuyBox from "../../../components/trading/BuyBox";
import MarketPriceList from "../../../components/trading/MarketPriceList";
import { fetchAvailBalance } from "../../../api/accountApi";
import { postOrder } from "../../../api/tradeApi";
import { fetchAvailQuantityByStock } from "../../../api/stockApi";

function TradingTab({ ticker, extend }) {
  const [availBalance, setAvailBalance] = useState(0);
  const [availQuantity, setAvailQuantity] = useState(50);

  useEffect(() => {
    tryFetchAvailBalance();
    tryFetchAvailQuantity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tryFetchAvailBalance = async () => {
    try {
      const response = await fetchAvailBalance();
      if (response.data.status === "OK") {
        setAvailBalance(response.data.data);
      }
    } catch (error) {
      console.error("사용 가능 예수금 조회 중 오류 발생", error);
    }
  };

  const tryFetchAvailQuantity = async () => {
    try {
      const response = await fetchAvailQuantityByStock(ticker);
      if (response.data.status === "OK") {
        setAvailQuantity(response.data.data);
      }
    } catch (error) {
      console.error("사용 가능 주수 조회 중 오류 발생: ", error.message);
    }
  };

  const orderStock = async (offerType, offerQuantity, offerPrice) => {
    try {
      const response = await postOrder({
        offerType: offerType,
        offerQuantity: offerQuantity,
        offerPrice: offerPrice,
        stockTicker: ticker,
      });
      if (response.data.status === "CREATED") {
        console.log(response.data.message);
        tryFetchAvailQuantity();
        tryFetchAvailBalance();
      }
    } catch (error) {
      console.error("주문 중 오류 발생: ", error.message);
    }
  };

  return (
    <div className="w-full h-full">
      {extend == "trade" ? (
        // 확대(전체 화면) 상태: 상단은 좌측 차트 & 우측 매수/매도, 하단은 전체 실시간 시세 및 체결 내역
        <div className="w-full h-full flex flex-col space-y-4">
          <div className="flex gap-4">
            <div className="w-2/3">
              <ChartTab ticker={ticker} />
            </div>
            <div className="flex flex-col justify-center gap-4 w-1/3">
              <BuyBox withHolding={availBalance} orderStock={orderStock} />
              <SellBox maxQuantity={availQuantity} orderStock={orderStock} />
            </div>
          </div>
          <div className="w-full">
            <MarketPriceList />
          </div>
        </div>
      ) : (
        // 기본 상태: 차례대로 세로 배치
        <div className="w-full h-full flex flex-col space-y-4">
          <div className="w-full h-100">
            <ChartTab ticker={ticker} />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <BuyBox withHolding={availBalance} orderStock={orderStock} />
            <SellBox maxQuantity={availQuantity} orderStock={orderStock} />
          </div>
          <div className="w-full">
            <MarketPriceList stockTicker={ticker} />
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(TradingTab);
