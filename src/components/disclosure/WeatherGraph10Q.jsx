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
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
];

export default function WeatherGraph10Q() {
  const [selectedBar, setSelectedBar] = useState(null);

  const handleXAxisClick = (name) => {
    setSelectedBar(name === selectedBar ? null : name);
    console.log("Clicked:", name);
  };

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
          <CartesianGrid strokeDasharray />
          <XAxis dataKey="name" tick={<CustomXAxisTick />} />{" "}
          <YAxis
            domain={[
              0,
              Math.max(...data.map((d) => Math.max(d.uv, d.pv))) * 1.5,
            ]}
          />
          <Tooltip />
          <Legend />
          {data.map((d, index) => {
            let color = "rgba(200, 200, 200, 0.3)"; // 기본 배경색
            if (d.uv > d.pv) color = "rgba(84, 176, 254, 0.53)"; // 🔵 파랑 배경
            else if (d.uv < d.pv) color = "rgba(255, 100, 100, 0.3)"; // 🔴 빨강 배경

            return (
              <ReferenceArea
                key={index}
                x1={d.name}
                x2={d.name}
                y1={0}
                y2={Math.max(...data.map((d) => Math.max(d.uv, d.pv))) * 1.5}
                strokeOpacity={0}
                fill={color}
                fillOpacity={0.5}
              />
            );
          })}
          <Bar
            dataKey="uv"
            fill="#54b0fe"
            activeBar={<Rectangle fill="#008AFF" />}
          />
          <Bar
            dataKey="pv"
            fill="#FF5F5E"
            activeBar={<Rectangle fill="#FF4645" />}
          />
        </BarChart>
      </ResponsiveContainer>

      {data.map((d, index) => {
        let icon = null;
        if (d.uv > d.pv) {
          icon = <TiWeatherDownpour className="text-blue-md text-5xl" />;
        } else if (d.uv < d.pv) {
          icon = <IoIosSunny className="text-red-400 text-5xl" />;
        }

        return (
          icon && (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${index * 28.5 + 27}%`, // X축 위치
                top: `15%`, // Y축 위치
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
