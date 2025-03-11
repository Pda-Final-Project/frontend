import React, { useEffect, useRef, useState } from "react";
import CandleChart from "./CandleChart";
import { fetchChart } from "../../api/stockApi";

export default function ChartTab({ ticker }) {
  const [chartType, setChartType] = useState("D");
  const [chartData, setChartData] = useState([]);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 350 });

  // 차트 데이터 가져오기
  useEffect(() => {
    getChartData();
  }, [chartType, ticker]);

  const getChartData = async () => {
    const params = { ticker, chartType };
    try {
      const response = await fetchChart(params);
      if (response.data.status === "OK") {
        setChartData(
          response.data.data.map((item) => ({
            date: new Date(item.date),
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

  // ResizeObserver를 사용하여 컨테이너 크기를 지속적으로 업데이트
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(container);

    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white relative rounded-lg py-4 px-4 text-sm h-full"
    >
      {chartData.length && dimensions.width > 100 && dimensions.height > 100 ? (
        <CandleChart
          chartData={chartData}
          width={Math.max(0, dimensions.width - 20)}
          height={Math.max(0, dimensions.height - 20)}
        />
      ) : (
        <div className="animate-skeleton h-[500px] bg-gray-200"></div>
      )}
    </div>
  );
}
