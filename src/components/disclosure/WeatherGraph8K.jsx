import React, { useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";
import { TiWeatherDownpour } from "react-icons/ti"; // 파란색 아이콘
import { IoIosSunny } from "react-icons/io"; // 빨간색 아이콘

const data = [
  { name: "2023-Q1", value: 800 },
  { name: "2023-Q2", value: -800 },
  { name: "2023-Q3", value: 500 },
  { name: "2023-Q4", value: 800 },
];

const CustomXAxisTick = (props) => {
  const { x, y, payload, onClick } = props;
  return (
    <text
      x={x}
      y={y}
      dy={10}
      textAnchor="middle"
      fill="#333d4b"
      className="text-sm hover:underline"
      style={{ cursor: "pointer", fontWeight: "bold" }}
      onClick={() => onClick(payload.value)}
    >
      {payload.value}
    </text>
  );
};

export default function WeatherGraph8K({ setSelectedFilling }) {
  // 예시로 setSelectedFilling을 prop으로 받아 상위에서 관리합니다.
  // setSelectedFilling은 Legend 혹은 XAxis tick 클릭 시 호출됩니다.
  const [selectedBar, setSelectedBar] = useState(null);

  return (
    <div className="relative w-full h-full">
      <div className="font-semibold text-blue-md text-[14px] mb-4">
        수시 보고서가 나왔을 때의 매출 등락 추세를 확인하세요
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, left: -5, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={
              <CustomXAxisTick
                onClick={(value) => {
                  // 예시: setSelectedFilling 호출
                  setSelectedFilling(value);
                }}
              />
            }
          />
          <YAxis
            domain={[
              Math.min(...data.map((d) => d.value)) * 1.2,
              Math.max(...data.map((d) => d.value)) * 1.2,
            ]}
          />
          <Tooltip />
          {/* <Legend /> */}
          {data.map((d, index) => {
            let color = "";
            if (d.value < 0) color = "rgba(84, 176, 254, 0.3)";
            else if (d.value > 0) color = "rgba(255, 247, 0, 0.3)";
            return (
              <ReferenceArea
                key={index}
                x1={d.name}
                x2={d.name}
                y1={Math.min(...data.map((d) => d.value)) * 1.2}
                y2={Math.max(...data.map((d) => d.value)) * 1.2}
                strokeOpacity={0}
                fill={color}
                fillOpacity={0.5}
              />
            );
          })}
          <Bar
            dataKey="value"
            shape={(props) => {
              const { x, y, width, height, payload } = props;
              const fillColor = payload.value > 0 ? "#ff7000" : "#54b0fe";
              return (
                <Rectangle
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  fill={fillColor}
                />
              );
            }}
          />
        </BarChart>
      </ResponsiveContainer>
      {/* 추가 아이콘 표시 */}
      {data.map((d, index) => {
        let icon = null;
        if (d.value > 0) {
          icon = <IoIosSunny className="text-red-400 text-5xl" />;
        } else if (d.value < 0) {
          icon = <TiWeatherDownpour className="text-blue-md text-5xl" />;
        }
        return (
          icon && (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${index * 23 + 20}%`, // ✅ 자동 정렬
                top: `${d.value > 0 ? "65%" : "20%"}`, // ✅ 양수는 위쪽, 음수는 아래쪽 정렬
                transform: "translate(-50%, -50%)",
              }}
            >
              {icon}
            </div>
          )
        );
      })}
    </div>
  );
}
