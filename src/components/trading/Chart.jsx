import React from "react";
import { IgrFinancialChart } from "igniteui-react-charts";
import { IgrFinancialChartModule } from "igniteui-react-charts";
import { stockData } from "./sampleStockData"; // stockData 파일에서 데이터를 가져옵니다.

IgrFinancialChartModule.register();

const Chart = () => {
  return (
    <div className="container sample">
      <div className="container">
        <IgrFinancialChart
          width="100%"
          height="500px"
          isToolbarVisible={false}
          chartType="Candle" // 차트 타입을 캔들로 설정
          chartTitle="차트 제목"
          titleAlignment="Left"
          titleLeftMargin="25"
          titleTopMargin="10"
          titleBottomMargin="10"
          subtitle="차트 부제목"
          subtitleAlignment="Left"
          subtitleLeftMargin="25"
          subtitleTopMargin="5"
          subtitleBottomMargin="10"
          yAxisLabelLocation="OutsideLeft"
          yAxisMode="Numeric"
          yAxisTitle="Financial Prices"
          yAxisTitleLeftMargin="10"
          yAxisTitleRightMargin="5"
          yAxisLabelLeftMargin="0"
          zoomSliderType="None"
          dataSource={stockData} // 주식 데이터 소스
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
