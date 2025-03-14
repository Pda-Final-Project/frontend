import React from "react";
import {
  IgrFinancialChart,
  IgrFinancialChartModule,
} from "igniteui-react-charts";

IgrFinancialChartModule.register();

const ChartMini = ({ chartData }) => {
  return (
    <div className="z-0">
      <div className="container">
        <IgrFinancialChart
          width="100%"
          height="260px"
          isToolbarVisible={false}
          chartType="Candle" // 캔들 차트
          zoomSliderType="None"
          dataSource={chartData} // 데이터
          yAxisMode="PercentChange" // Y축이 확대될 때 상대적 변화 반영 (봉 크기 확대 가능)
          isVerticalZoomEnabled={true} // 세로 확대 허용
          overlayBrushes="rgba(255, 255, 255, 0.5)" // 오버레이 스타일 설정
          brushes={["#F04452"]} // 상승 캔들 색상
          outlines={["#F04452"]} // 상승 캔들 테두리 색상
          negativeBrushes={["#3182F6"]} // 하락 캔들 색상
          negativeOutlines={["#3182F6"]} // 하락 캔들 테두리 색상
          yAxis={{
            name: "yAxis",
            labelLocation: "OutsideLeft",
            stroke: "gray",
          }}
          xAxis={{
            name: "xAxis",
            label: "시간",
            labelLocation: "InsideBottom",
            majorStroke: "gray",
            interval: 1,
          }}
        />
      </div>
    </div>
  );
};

export default ChartMini;
