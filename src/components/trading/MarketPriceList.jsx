import React, { useEffect, useState } from "react";
import useSSEPrice from "../../hooks/useSSEPrice";

//실시간 시세
export default function MarketPriceList() {
  const sseUrl = import.meta.env.VITE_PRICE_SSE_URL;
  // 소켓 연결 시 대체
  // const marketPrices = useSSEPrice(sseUrl);
  const marketPrices = [
    {
      trade_price: 1000,
      trade_quantity: 2,
      trade_volume: 2,
      trade_time: "12:57:38",
    },
    {
      trade_price: 1000,
      trade_quantity: 2,
      trade_volume: 2,
      trade_time: "12:57:38",
    },
    {
      trade_price: 1000,
      trade_quantity: 2,
      trade_volume: 2,
      trade_time: "12:57:38",
    },
  ];
  return (
    <div className="p-4">
      <div>실시간 시세</div>
      <div className="grid grid-cols-4 gap-4">
        <div>체결가</div>
        <div>체결량</div>
        <div>거래량</div>
        <div>시간</div>
      </div>
      <div>
        {marketPrices.map((el, id) => (
          <div key={id} className="grid grid-cols-4 gap-4">
            <div>{el.trade_price}</div>
            <div>{el.trade_quantity}</div>
            <div>{el.trade_volume}</div>
            <div>{el.trade_time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
