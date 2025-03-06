import React, { useEffect, useState } from "react";
import WeatherGraph10Q from "./WeatherGraph10Q";
import ChartMini from "./ChartMini";
import WeatherGraph8K from "./WeatherGraph8K";
import { fetchChart } from "../../api/stockApi";

const chartDataDummy = [
  {
    Date: new Date(2020, 2, 3),
    Open: 3235,
    High: 3268,
    Low: 3235,
    Close: 3248,
    Volume: 3757910000,
  },
  {
    Date: new Date(2020, 2, 4),
    Open: 3280,
    High: 3306,
    Low: 3280,
    Close: 3297,
    Volume: 3995320000,
  },
  {
    Date: new Date(2020, 2, 5),
    Open: 3324,
    High: 3337,
    Low: 3313,
    Close: 3334,
    Volume: 4117730000,
  },
  {
    Date: new Date(2020, 2, 6),
    Open: 3344,
    High: 3347,
    Low: 3334,
    Close: 3345,
    Volume: 3868370000,
  },
  {
    Date: new Date(2020, 2, 7),
    Open: 3335,
    High: 3341,
    Low: 3322,
    Close: 3327,
    Volume: 3730650000,
  },
];

export default function InsightBox({ fillingType, filling10qJsonUrl, ticker }) {
  // useState는 배열 비구조화로 받아야 합니다.
  const [selectedFilling, setSelectedFilling] = useState(null);
  const [chartData, setChartData] = useState(chartDataDummy);

  const handleXAxisClick = (value) => {
    setSelectedFilling(value);
  };
  const tryFetchChartData = async () => {
    const params = { ticker, chartType: "D" };
    try {
      const response = await fetchChart(params);
      if (response.data.status === "OK") {
        const formatted = response.data.data.map((item) => ({
          date: new Date(item.date), // 문자열을 Date 객체로 변환
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
    console.log(selectedFilling);
  }, [selectedFilling]);

  return (
    <div>
      <div className="font-semibold text-[16px] mb-4">오늘의 주식 날씨는?</div>
      <div className="flex">
        <div className="w-3/5">
          <div className="font-semibold text-blue-md text-sm mb-4">
            해당 분기의 작년과 올해 실적을 비교해보세요
          </div>
          {fillingType === "10-Q" ? (
            <WeatherGraph10Q
              handleXAxisClick={handleXAxisClick}
              filling10qJsonUrl={filling10qJsonUrl}
            />
          ) : (
            <WeatherGraph8K handleXAxisClick={handleXAxisClick} />
          )}
        </div>
        <div className="w-2/5">
          <div className="font-semibold text-blue-md text-sm pl-8">
            선택한 공시 시점의 일주일간의 주가를 확인하세요
          </div>
          <ChartMini chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
