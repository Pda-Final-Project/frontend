import React from "react";
import {
  IgrFinancialChart,
  IgrFinancialChartModule,
  IgrNumericYAxis,
  IgrCategoryXAxis,
} from "igniteui-react-charts";

IgrFinancialChartModule.register();

const Chart = ({ chartData }) => {
  return (
    <div className="z-0">
      <div className="container">
        <IgrFinancialChart
          width="100%"
          height="300px"
          isToolbarVisible={false}
          chartType="Candle" // 캔들 차트
          zoomSliderType="None"
          dataSource={chartData} // 데이터
          yAxisMode="Numeric" // Y축이 확대될 때 상대적 변화 반영 (봉 크기 확대 가능)
          isVerticalZoomEnabled={true} // 세로 확대 허용
          overlayBrushes="rgba(255, 255, 255, 0.5)" // 오버레이 스타일 설정
          brushes={["#FF4A4A"]} // 상승 캔들 색상
          outlines={["#FF4A4A"]} // 상승 캔들 테두리 색상
          negativeBrushes={["#54b0fe"]} // 하락 캔들 색상
          negativeOutlines={["#54b0fe"]} // 하락 캔들 테두리 색상
        >
          <IgrNumericYAxis
            name="yAxis"
            labelLocation="OutsideLeft"
            stroke="gray"
            labelFormat="N0" // 천 단위 쉼표 표기, 소수점 없이
            abbreviateLargeNumbers={false}
          />
          <IgrCategoryXAxis
            name="xAxis"
            label="시간"
            labelLocation="InsideBottom"
            majorStroke="gray"
            interval={1}
          />
        </IgrFinancialChart>
      </div>
    </div>
  );
};

export default Chart;
