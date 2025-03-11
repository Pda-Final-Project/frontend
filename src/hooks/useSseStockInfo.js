import { useState } from "react";
import useSse from "./useSse"; // 위에서 만든 useSse를 가져옴

export function useStockSse(setStocks) {
  // SSE 이벤트 핸들러 정의
  const eventHandlers = {
    stockUpdate: (data) => {
      setStocks((prevStocks) => {
        if (!Array.isArray(prevStocks)) {
          return []; // prevStocks가 배열이 아니면 빈 배열 반환
        }
        return prevStocks.map((stock) =>
          stock.ticker === data.ticker
            ? {
                ...stock,
                current_price: data.current_price,
                change_rate: data.change_rate,
              }
            : stock
        );
      });
    },
  };

  const { isConnected, error } = useSse(
    `${import.meta.env.VITE_API_DATA_URL}/stocks/stream`,
    eventHandlers
  );
  return { isConnected, error };
}
