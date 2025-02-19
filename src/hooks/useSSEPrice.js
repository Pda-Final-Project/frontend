import { useState, useEffect } from "react";

export default function useSSEPrice(url) {
  const [prices, setPrices] = useState([]);
  const maxCnt = 30;

  useEffect(() => {
    const eventSource = new EventSource(url); //sse 연결을 생성해, 주어진 url의 데이터를 수신

    eventSource.onmessage = (event) => {
      //서버에서 메시지를 받으면 실행됨
      const data = JSON.parse(event.data);

      if (data?.LAST && data?.EVOL) {
        //현재가와 체결량이 존재하는 경우
        setPrices((prevPrices) => [
          //새로운 데이터를 배열 앞쪽에 추가해 최신 데이터 maxCnt개 유지
          {
            symbol: data.SYMB, // 종목 코드
            lastPrice: data.LAST, // 체결가
            changeRate: data.RATE, // 변동률
            volume: data.EVOL, // 체결량
            totalVolume: data.TVOL, // 누적 거래량
            time: data.XHMS, // 현지 시간
          },
          ...prevPrices.slice(0, maxCnt - 1),
        ]);
      }
    };

    eventSource.onerror = (error) => {
      //에러 발생 시 콘솔 출력 후 종료
      console.error("SSE Price Error:", error);
      eventSource.close();
    };

    return () => {
      //컴포넌트가 언마운트되거나 url이 변경되면 sse 연결 해제
      eventSource.close();
    };
  }, [url]);

  return prices;
}
