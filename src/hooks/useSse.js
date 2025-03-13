import { useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill"; // named export 사용

export default function useSse(url, eventHandlers = {}, token = "") {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const eventSourceRef = useRef(null); // ✅ 기존처럼 useRef 사용

  const connectSSE = () => {
    if (!url) return;

    // 기존 SSE 연결 종료 (중복 방지)
    if (eventSourceRef.current) {
      console.log("🔌 기존 SSE 연결 해제됨:", url);
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    console.log("🔗 SSE 연결 시도:", url);

    const eventSourceOptions = token
      ? {
          headers: { Authorization: `Bearer ${token}` },
          heartbeatTimeout: 60000,
        }
      : {};

    const eventSource = new EventSourcePolyfill(url, eventSourceOptions);
    eventSourceRef.current = eventSource; // ✅ 새 객체 저장

    eventSource.onopen = () => {
      console.log("✅ SSE 연결 성공:", url);
      setIsConnected(true);
      setError(null);
    };

    eventSource.onerror = (err) => {
      console.error("⚠️ SSE 오류 발생. 5초 후 재연결 시도...", err);
      setError(err);
      setIsConnected(false);

      // 기존 연결 해제 후 5초 후 재연결 시도
      setTimeout(() => {
        console.log("🔄 SSE 재연결 중...");
        connectSSE();
      }, 5000);
    };

    Object.entries(eventHandlers).forEach(([eventName, callback]) => {
      eventSource.addEventListener(eventName, (event) => {
        let parsedData;
        try {
          parsedData = JSON.parse(event.data);
        } catch (err) {
          parsedData = event.data;
        }
        callback(parsedData);
      });
    });
  };

  useEffect(() => {
    if (!url) return; // URL이 없으면 실행 X
    connectSSE();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        console.log("🔌 SSE 연결 해제됨:", url);
      }
    };
  }, [url, token ? true : false]); // ⚠️ token이 undefined/null이면 의존성에서 제외

  return { isConnected, error };
}
