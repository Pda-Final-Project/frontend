import { useEffect, useState } from "react";

/**
 * SSE(Server-Sent Events) 훅
 * @param {string} url - SSE 이벤트를 구독할 서버 URL
 * @param {Object} eventHandlers - { eventName: callback } 형태의 이벤트 핸들러 객체
 * @returns {Object} { isConnected, error, closeConnection }
 */
export default function useSse(url, eventHandlers = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  let eventSource = null;

  useEffect(() => {
    if (!url) return;

    // SSE 연결
    eventSource = new EventSource(url);

    // 연결 성공 시
    eventSource.onopen = () => {
      console.log("✅ SSE 연결됨:", url);
      setIsConnected(true);
    };

    // 기본 메시지 핸들러
    eventSource.onmessage = (event) => {
      console.log("📡 기본 메시지 수신:", event.data);
    };

    // 특정 이벤트 리스너 추가
    Object.entries(eventHandlers).forEach(([eventName, callback]) => {
      eventSource.addEventListener(eventName, (event) => {
        try {
          const parsedData = JSON.parse(event.data);
          console.log(`📡 ${eventName} 데이터 수신:`, parsedData);
          callback(parsedData);
        } catch (err) {
          console.error("SSE JSON 파싱 오류:", err);
        }
      });
    });

    // 에러 핸들링
    eventSource.onerror = (err) => {
      console.error("SSE 오류:", err);
      setError(err);
      setIsConnected(false);
      eventSource.close();
    };

    // 정리 함수 (컴포넌트 언마운트 시 연결 해제)
    return () => {
      eventSource.close();
      console.log("SSE 연결 해제됨:", url);
      setIsConnected(false);
    };
  }, [url]);

  // 수동으로 SSE 연결 종료
  const closeConnection = () => {
    if (eventSource) {
      eventSource.close();
      setIsConnected(false);
    }
  };

  return { isConnected, error, closeConnection };
}
