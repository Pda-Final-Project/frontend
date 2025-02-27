import { useState } from "react";
import useSse from "./useSse"; // 위에서 만든 useSse를 가져옴

/**
 * 주식 관련 SSE 데이터를 처리하는 훅
 * @param {string} url - SSE 이벤트를 구독할 서버 URL
 * @returns {Object} { stockUpdates, stockTrades, isConnected, error, closeConnection }
 */
export function useStockSse(url) {
  const [stockUpdate, setStockUpdates] = useState([]);
  const [stockTrade, setStockTrades] = useState([]);

  // SSE 이벤트 핸들러 정의
  const eventHandlers = {
    stockUpdate: (data) => {
      setStockUpdates((prev) => [data, ...prev.slice(0, 29)]); // 최근 30개 유지
    },
    stockTrade: (data) => {
      setStockTrades((prev) => [data, ...prev.slice(0, 29)]);
    },
  };

  const { isConnected, error, closeConnection } = useSse(url, eventHandlers);

  return { stockUpdate, stockTrade, isConnected, error, closeConnection };
}
