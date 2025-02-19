import React, { useState } from "react";
import Chart from "./Chart";
import { chartData } from "./sampleStockData";

const chart_type = [
  { id: "5m", title: "5분" },
  { id: "d", title: "일" },
  { id: "w", title: "주" },
  { id: "m", title: "월" },
];

export default function ChartTab({ ticker }) {
  const [currentChartType, setCurrentChartType] = useState("5m");
  // const [chartData, setChartData] = useState([]);

  const getChartData = (type) => {
    /** To do: 해당 타입에 따른 chartData 요청 */
    setCurrentChartType(type);
  };
  return (
    <div>
      {/** 주식 종류 탭 */}
      <div className="flex">
        {chart_type.map((el) => (
          <div
            key={el.id}
            onClick={() => {
              getChartData(el.id);
            }}
            className={`${currentChartType == el.id ? "text-red-400" : ""}`}
          >
            {el.title}
          </div>
        ))}
      </div>
      {/** 주식 차트 */}
      <div>
        <Chart chartData={chartData} />
      </div>
    </div>
  );
}
