import React, { useEffect, useState } from "react";
import WeatherGraph10Q from "./WeatherGraph10Q";
import ChartMini from "./ChartMini";
import WeatherGraph8K from "./WeatherGraph8K";
import { fetchChart } from "../../api/stockApi";

export default function InsightBox({ filling10qJsonUrl, ticker }) {
  // useState는 배열 비구조화로 받아야 합니다.
  const [selectedFilling, setSelectedFilling] = useState();
  const [chartData, setChartData] = useState();

  const getQuarterDateRange = (quarterLabel) => {
    const [year, quarter] = quarterLabel.split("-Q");
    const quarterStartMonths = {
      1: "01-01",
      2: "04-01",
      3: "07-01",
      4: "10-01",
    };
    const quarterEndMonths = { 1: "03-31", 2: "06-30", 3: "09-30", 4: "12-31" };

    return {
      startDate: `${year}-${quarterStartMonths[quarter]}`,
      endDate: `${year}-${quarterEndMonths[quarter]}`,
    };
  };

  const tryFetchChartData = async () => {
    if (!selectedFilling) return;

    const { startDate, endDate } = getQuarterDateRange(selectedFilling);
    const params = { ticker, chartType: "D", startDate, endDate };

    try {
      const response = await fetchChart(params);
      if (response.data.status === "OK") {
        const formatted = response.data.data.map((item) => ({
          date: new Date(item.date),
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volume,
        }));
        setChartData(formatted);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (selectedFilling) {
      console.log("Fetching data for:", selectedFilling);
      tryFetchChartData();
    }
  }, [selectedFilling]); // selectedFilling이 변경될 때 실행

  return (
    <div className="w-full flex flex-col bg-white p-8 rounded-lg min-h-[400px]">
      <div className="font-semibold text-[18px] mb-8 w-full ">
        해당 분기 실적을 전년 동기와 비교하고, 분기를 클릭하여 해당 분기의 주가
        차트를 확인하세요
      </div>
      <div className="flex ">
        <div className={`${selectedFilling ? "w-3/5" : ""} w-full h-[300px]`}>
          <WeatherGraph10Q
            setSelectedFilling={setSelectedFilling}
            filling10qJsonUrl={filling10qJsonUrl}
          />
        </div>
        <div className={`${selectedFilling ? "w-2/5" : ""} w-0 h-[300px]`}>
          <ChartMini chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
