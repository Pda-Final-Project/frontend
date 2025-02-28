import React from "react";
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
} from "recharts";
import { TiWeatherDownpour } from "react-icons/ti"; // 파란색 아이콘
import { IoIosSunny } from "react-icons/io"; // 빨간색 아이콘

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
];

export default function WeatherGraph10Q() {
  return (
    <div className="relative w-full h-[350px]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

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

      {/* ✅ 특정 데이터 포인트에 아이콘 추가 */}
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
                left: `${index * 28 + 26}%`, // X축 위치 (조정 필요)
                top: `20%`, // Y축 위치 (조정 필요)
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
