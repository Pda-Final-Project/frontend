import React, { useState, useEffect } from "react";
import useSsePrice from "../../hooks/useSsePrice";
import { useParams } from "react-router-dom";
import { fetchInitMarketPrice } from "../../api/tradeApi";
import { formatDate } from "../../utils/numberFormat";

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

  const tryFetchInitMarketPrice = async () => {
    try {
      const response = await fetchInitMarketPrice(ticker);
      if (response.status == "200") {
        const transformedData = transformMarketData(response.data);
        setMarketPrices(transformedData);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const transformMarketData = (data) => {
    return data.map((item) => {
      const parsedItem = JSON.parse(item); // JSON 문자열을 객체로 변환
      return {
        trade_price: parsedItem.current_price, // 체결가 (current_price → trade_price)
        trade_quantity: parsedItem.volume, // 체결량 (volume → trade_quantity)
        trade_volume: parsedItem.trade_volume, // 거래량 (trade_volume 그대로)
        trade_time: parsedItem.time, // 시간 (time 그대로)
        trade_type: parsedItem.trade_type, // 매매 유형 (BUY / SELL)
      };
    });
  };

  useEffect(() => {
    tryFetchInitMarketPrice();
  }, []);

  return (
    <div className="bg-white p-4 flex flex-col rounded-lg h-full text-sm overflow-y-hidden">
      <div className="text-lg font-semibold">실시간 시세</div>
      <div className="grid grid-cols-4 gap-4 font-semibold text-gray-md border-b-1 border-gray-md py-2">
        <div className="w-full text-left">체결가</div>
        <div className="w-full text-right">체결량</div>
        <div className="w-full text-right">거래량</div>
        <div className="w-full text-right">시간</div>
      </div>
      <div className="overflow-y-auto  max-h-72">
        {marketPrices.map((el, id) => (
          <div
            key={id}
            className={`grid grid-cols-4 gap-4 px-2 py-2 rounded-lg hover:bg-blue-light ${
              id % 2 == 0 ? "bg-white" : "bg-gray-light"
            }`}
          >
            <div className="w-full text-left">
              {parseInt(el.trade_price).toLocaleString()} 원
            </div>
            <div
              className={`w-full text-right ${
                el.trade_type == "BUY" ? "text-red-md" : "text-blue-dark"
              }`}
            >
              {el.trade_quantity.toLocaleString()}
            </div>
            <div className="w-full text-right">{el.trade_volume}%</div>
            <div className="w-full text-right">{formatDate(el.trade_time)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
