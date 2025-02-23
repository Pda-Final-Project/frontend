import React from "react";
import { IgrFinancialChart } from "igniteui-react-charts";
import { IgrFinancialChartModule } from "igniteui-react-charts";

IgrFinancialChartModule.register();

const Chart = ({ chartData }) => {
  return (
    <div className="z-0">
      <div className="container">
        <IgrFinancialChart
          width="100%"
          height="300px"
          isToolbarVisible={false}
          chartType="Candle" // 차트 타입을 캔들로 설정
          zoomSliderType="None"
          dataSource={chartData} // 주식 데이터 소스
          xAxis={{
            name: "xAxis",
            label: "시간",
            labelLocation: "InsideBottom",
            majorStroke: "gray",
            interval: 1,
          }}
          yAxis={{
            name: "yAxis",
            labelLocation: "OutsideLeft",
            label: "Price",
            title: "주가",
            stroke: "gray",
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
