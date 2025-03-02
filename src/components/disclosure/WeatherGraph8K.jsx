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
  { name: "Page A", value: 800 },
  { name: "Page B", value: -800 },
  { name: "Page C", value: 500 },
  { name: "Page D", value: 800 },
];

export default function WeatherGraph8K(handleXAxisClick) {
  const [selectedBar, setSelectedBar] = useState(null);

  const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    return (
      <text
        x={x}
        y={y}
        dy={10}
        textAnchor="middle"
        fill={selectedBar === payload.value ? "#54b0fe" : "#000"}
        className="cursor-pointer font-bold"
        onClick={() => handleXAxisClick(payload.value)}
      >
        {payload.value}
      </text>
    );
  };

  return (
    <div className="relative w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={<CustomXAxisTick />} />
          <YAxis
            domain={[
              Math.min(...data.map((d) => d.value)) * 1.2, // 음수값 고려하여 최소값 조정
              Math.max(...data.map((d) => d.value)) * 1.2, // 양수값 고려하여 최대값 조정
            ]}
          />
          <Tooltip />
          <Legend />

          {data.map((d, index) => {
            let color = "rgba(200, 200, 200, 0.3)"; // 기본 배경색
            if (d.value < 0) color = "rgba(84, 176, 254, 0.53)"; // 🔵 파랑 배경
            else if (d.value > 0) color = "rgba(255, 100, 100, 0.3)"; // 🔴 빨강 배경

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

          {/* ✅ 막대 색상 정상 적용 */}
          <Bar
            dataKey="value"
            shape={(props) => {
              const { x, y, width, height, payload } = props;
              const fillColor = payload.value > 0 ? "#FF5F5E" : "#54b0fe"; // ✅ 빨강(양수), 파랑(음수)
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

      {/* ✅ 특정 데이터 포인트에 아이콘 추가 (위치 자동 조정) */}
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
