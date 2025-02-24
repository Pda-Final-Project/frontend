import React, { useState } from "react";
import Chart from "./Chart";
import { chartData } from "./sampleStockData";

const chart_type = [
  { id: "d", title: "일" },
  { id: "w", title: "주" },
  { id: "m", title: "월" },
];

export default function ChartTab({ ticker }) {
  const [currentChartType, setCurrentChartType] = useState("d");
  // const [chartData, setChartData] = useState([]);

  const getChartData = (type) => {
    /** To do: 해당 타입에 따른 chartData 요청 */
  };
  return (
    <div className="bg-white flex flex-col rounded-lg py-4 text-sm">
      {/** 주식 종류 탭 */}
      <div className="flex w-full justify-end px-4">
        <div className="flex gap-2">
          {chart_type.map((el) => (
            <button
              key={el.id}
              onClick={() => {
                setCurrentChartType(el.id);
                getChartData(el.id);
              }}
              className={`${
                currentChartType == el.id ? "!bg-blue-md text-white " : ""
              } white-button-style`}
            >
              {el.title}
            </button>
          ))}
        </div>
      </div>
      {/** 주식 차트 */}
      <div className="z-0 ">
        <Chart chartData={chartData} />
      </div>
    </div>
  );
}
