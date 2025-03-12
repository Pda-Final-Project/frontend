import React, { useState } from "react";
import useSsePrice from "../../hooks/useSsePrice";
import { useParams } from "react-router-dom";

//실시간 시세
export default function MarketPriceList() {
  const [marketPrices, setMarketPrices] = useState([
    {
      trade_price: 1000,
      trade_quantity: 2,
      trade_volume: 2,
      trade_time: "12:57:38",
      trade_type: "BUY",
    },
  ]);
  const { ticker } = useParams();

  const { isConnected, error } = useSsePrice(setMarketPrices, ticker);
  return (
    <div className="bg-white p-4 flex flex-col rounded-lg h-full text-sm overflow-y-hidden">
      <div className="text-lg font-semibold">실시간 시세</div>
      <div className="grid grid-cols-4 gap-4 font-semibold text-gray-md border-b-1 border-gray-md py-2">
        <div className="w-full text-left">체결가</div>
        <div className="w-full text-right">체결량</div>
        <div className="w-full text-right">거래량</div>
        <div className="w-full text-right">시간</div>
      </div>
      <div className="overflow-y-auto no-scrollbar max-h-72">
        {marketPrices.map((el, id) => (
          <div
            key={id}
            className="grid grid-cols-4 gap-4 px-2 py-1 rounded-lg hover:bg-blue-light"
          >
            <div className="w-full text-left">{el.trade_price}</div>
            <div
              className={`w-full text-right  text-red-300${
                el.trade_type == "BUY" ? "text-red-md" : "text-blue-dark"
              }`}
            >
              {el.trade_quantity}
            </div>
            <div className="w-full text-right">{el.trade_volume}</div>
            <div className="w-full text-right">{el.trade_time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
