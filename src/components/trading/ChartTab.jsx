import React, { useEffect, useRef, useState } from "react";
import CandleChart from "./CandleChart";
import { fetchChart } from "../../api/stockApi";

export default function ChartTab({ ticker }) {
  const [chartType, setChartType] = useState("D");
  const [chartData, setChartData] = useState([]);
  // 컨테이너 크기를 측정하기 위한 ref와 state
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 350 });

  useEffect(() => {
    getChartData();
  }, [chartType, ticker]);

  // 상위 컨테이너의 크기를 측정
  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setDimensions({ width: clientWidth, height: clientHeight });
    }
  }, []);

  const getChartData = async () => {
    const params = {
      ticker,
      chartType,
    };
    try {
      const response = await fetchChart(params);
      if (response.data.status === "OK") {
        setChartData(
          response.data.data.map((item) => ({
            date: new Date(item.date), // 문자열을 Date 객체로 변환
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
            volume: item.volume,
          }))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-white flex flex-col rounded-lg py-4 px-4 text-sm"
    >
      {/* 주식 차트 */}
      {chartData ? (
        <CandleChart
          chartData={chartData}
          width={dimensions.width - 40 || 0} // 상위 div의 너비 전달
          height={350} // 고정 비율로 높이 전달
        />
      ) : (
        <div className="animate-skeleton h-[500px] bg-gray-200"></div>
      )}
    </div>
  );
}
