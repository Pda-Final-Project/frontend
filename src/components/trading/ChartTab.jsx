import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import { chartData } from "./sampleStockData";
import { fetchChart } from "../../api/stockApi";

const chartTypeData = [
  { id: "D", title: "일" },
  { id: "W", title: "주" },
  { id: "M", title: "월" },
];

export default function ChartTab({ ticker }) {
  const [chartType, setChartType] = useState("D");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getChartData();
  }, [chartType, ticker]);

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
            Date: new Date(item.date), // 문자열을 Date 객체로 변환
            Open: item.open,
            High: item.high,
            Low: item.low,
            Close: item.close,
            Volume: item.volume,
          }))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white flex flex-col rounded-lg py-4 text-sm h-full">
      {/** 주식 종류 탭 */}
      <div className="flex w-full justify-end px-4">
        <div className="flex gap-2">
          {chartTypeData.map((el) => (
            <button
              key={el.id}
              onClick={() => {
                setChartType(el.id);
              }}
              className={`${
                chartType == el.id ? "!bg-blue-md text-white " : ""
              } white-button-style`}
            >
              {el.title}
            </button>
          ))}
        </div>
      </div>
      {/** 주식 차트 */}
      <div className="z-0 w-full">
        <Chart chartData={chartData} />
      </div>
    </div>
  );
}
