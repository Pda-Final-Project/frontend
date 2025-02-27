import { useState } from "react";
import useSse from "./useSse"; // 위에서 만든 useSse를 가져옴

/**
 * 주식 관련 SSE 데이터를 처리하는 훅
 * @param {string} url - SSE 이벤트를 구독할 서버 URL
 * @returns {Object}
 */
export function useStockSse(url, stocks, setStocks) {
  // SSE 이벤트 핸들러 정의
  const eventHandlers = {
    stockUpdate: (data) => {
      setStocks((prevStocks) => {
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

  const { isConnected, error } = useSse(url, eventHandlers);
  return { isConnected, error };
}
