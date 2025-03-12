import useSse from "./useSse";

export default function useSsePrice(setPrices, ticker) {
  // SSE 이벤트 핸들러 정의
  const eventHandlers = {
    priceUpdate: (data) => {
      setPrices((prevPrices) => {
        // 새로 들어온 체결 데이터를 리스트에 추가
        const newPrices = [
          {
            trade_price: data.trade_price, // 거래 가격
            trade_quantity: data.trade_quantity, // 거래 수량
            trade_volume: data.trade_volume, // 거래량
            trade_time: data.trade_time, // 거래 시간
            trade_type: data.trade_type, // 매매 유형 (BUY/SELL)
          },
          ...(prevPrices || []), // 기존 가격 리스트와 합침
        ];

        // 체결 내역이 20개를 초과하면 가장 오래된 항목을 삭제
        if (newPrices.length > 20) {
          newPrices.pop(); // 맨 마지막(가장 오래된)을 제거
        }

        // 해당 종목의 체결 내역만 업데이트
        return newPrices;
      });
    },
  };

  const { isConnected, error } = useSse(
    `${import.meta.env.VITE_API_DATA_URL}/prices/stream?ticker=${ticker}`,
    eventHandlers
  );

  return { isConnected, error };
}
