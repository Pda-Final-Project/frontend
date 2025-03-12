import React from "react";
import {
  IgrFinancialChart,
  IgrFinancialChartModule,
  IgrNumericYAxis,
  IgrCategoryXAxis,
} from "igniteui-react-charts";

IgrFinancialChartModule.register();

// 커스텀 툴팁 컴포넌트
const CustomTooltip = (props) => {
  // props.data에 현재 데이터 포인트가 전달됩니다.
  if (!props || !props.data) return null;
  const { date, open, high, low, close } = props.data;
  const formattedDate = new Date(date).toISOString().split("T")[0]; // YYYY-MM-DD

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "5px",
        border: "1px solid gray",
        borderRadius: "4px",
      }}
    >
      <div>Date: {formattedDate}</div>
      <div>Open: {open}</div>
      <div>High: {high}</div>
      <div>Low: {low}</div>
      <div>Close: {close}</div>
    </div>
  );
};

const Chart = ({ chartData }) => {
  return (
    <div className="z-0">
      <div className="container">
        <IgrFinancialChart
          width="100%"
          height="350px"
          isToolbarVisible={false}
          chartType="Candle"
          zoomSliderType="None"
          dataSource={chartData}
          xMemberPath="date"
          openMemberPath="open"
          highMemberPath="high"
          lowMemberPath="low"
          closeMemberPath="close"
          volumeMemberPath="volume"
          yAxisMode="Numeric"
          isVerticalZoomEnabled={true}
          overlayBrushes="rgba(255, 255, 255, 0.5)"
          brushes={["#F04452"]}
          outlines={["#F04452"]}
          negativeBrushes={["#3182F6"]}
          negativeOutlines={["#3182F6"]}
          isVolumeVisible={true}
          tooltipTemplate={CustomTooltip} // 커스텀 툴팁 적용
        >
          <IgrNumericYAxis
            name="yAxis"
            labelLocation="OutsideLeft"
            stroke="gray"
            labelFormat="N0"
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
