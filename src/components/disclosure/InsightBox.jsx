import React from "react";
import WeatherGraph10Q from "./WeatherGraph10Q";
import ChartMini from "./ChartMini";

export default function InsightBox() {
  return (
    <div>
      <div className="font-semibold text-[16px]">오늘의 주식 날씨는?</div>
      <div>
        <div>
          <WeatherGraph10Q />
        </div>
        <div>
          <ChartMini />
        </div>
      </div>
    </div>
  );
}
