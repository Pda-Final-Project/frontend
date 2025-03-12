import useSse from "./useSse";

export default function useSsePrice(setPrices, ticker) {
  // SSE 이벤트 핸들러 정의
  const eventHandlers = {
    tradeUpdate: (data) => {
      console.log("📊 수신된 priceUpdate 데이터:", data);
      setPrices((prevPrices) => {
        const newPrices = [
          {
            trade_price: data.currentPrice,
            trade_quantity: data.volume,
            trade_time: data.time,
            trade_type: data.orderType,
          },
          ...(prevPrices || []),
        ];
        if (newPrices.length > 20) {
          newPrices.pop();
        }
        return newPrices;
      });
    },
  };

  const { isConnected, error } = useSse(
    `http://172.16.1.230:19095/v1/api/trades/stream?symbol=${ticker}`,
    eventHandlers
  );

  return { isConnected, error };
}
