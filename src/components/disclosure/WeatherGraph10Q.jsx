import React, { useEffect, useState } from "react";
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
import { TiWeatherDownpour } from "react-icons/ti";
import { IoIosSunny } from "react-icons/io";
import axios from "axios";

const LABEL_MAP = {
  Revenue: "매출",
  OperatingIncome: "영업이익",
  NetIncome: "순이익",
};

export default function WeatherGraph10Q({
  handleXAxisClick,
  filling10qJsonUrl,
}) {
  const [chartData, setChartData] = useState([]);

  const getQuarter = (endDate) => {
    const date = new Date(endDate);
    const quarter = Math.floor((date.getMonth() + 3) / 3);
    return `${date.getFullYear()}-Q${quarter}`;
  };

  const fetchFilling10q = async () => {
    try {
      const response = await axios(filling10qJsonUrl);
      if (response.status === 200) {
        const rawData = response.data;
        const formattedData = Object.keys(rawData)
          .filter((key) => key in LABEL_MAP)
          .map((key) => {
            return {
              name: LABEL_MAP[key],
              ...rawData[key].reduce((acc, item) => {
                acc[getQuarter(item.period.endDate)] = Number(item.value) / 1e9; // 단위를 10억(억 단위)으로 변환
                return acc;
              }, {}),
            };
          });
        setChartData(formattedData);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchFilling10q();
  }, [filling10qJsonUrl]);

  return (
    <div className="relative w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            domain={[
              0,
              Math.max(
                ...chartData.flatMap((d) =>
                  Object.values(d).filter((v) => typeof v === "number")
                )
              ) * 1.4,
            ]}
            tickFormatter={(value) => `${value.toFixed(1)}억`}
          />
          <Tooltip />
          <Legend />
          {chartData.length > 0 &&
            Object.keys(chartData[0])
              .filter((k) => k !== "name")
              .sort()
              .map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={index === 0 ? "#54b0fe" : "#FF5F5E"} // 이전 분기는 파랑, 이번 분기는 빨강
                  activeBar={
                    <Rectangle fill={index === 0 ? "#008AFF" : "#FF4645"} />
                  }
                />
              ))}
          {chartData.map((d, index) => {
            const keys = Object.keys(d)
              .filter((key) => key !== "name")
              .sort();
            if (keys.length < 2) return null;
            const prevQuarter = keys[0];
            const currQuarter = keys[1];
            const prevValue = Number(d[prevQuarter]);
            const currValue = Number(d[currQuarter]);
            const isIncrease = currValue > prevValue;
            return (
              <ReferenceArea
                key={index}
                x1={d.name}
                x2={d.name}
                y1={0}
                y2={
                  Math.max(
                    ...chartData.flatMap((d) =>
                      Object.values(d).filter((v) => typeof v === "number")
                    )
                  ) * 1.4
                }
                strokeOpacity={0}
                fill={
                  isIncrease
                    ? "rgba(255, 247, 0, 0.3)"
                    : "rgba(84, 176, 254, 0.3)"
                }
                fillOpacity={0.5}
              />
            );
          })}
        </BarChart>
      </ResponsiveContainer>
      {chartData.map((d, index) => {
        const keys = Object.keys(d)
          .filter((key) => key !== "name")
          .sort();
        if (keys.length < 2) return null;
        const prevQuarter = keys[0];
        const currQuarter = keys[1];
        const prevValue = Number(d[prevQuarter]);
        const currValue = Number(d[currQuarter]);
        const isIncrease = currValue > prevValue;

        return (
          <div
            key={index}
            className="absolute"
            style={{
              left: `${index * 30 + 21}%`,
              top: "10%",
            }}
          >
            {isIncrease ? (
              <IoIosSunny className="text-red-400 text-5xl" />
            ) : (
              <TiWeatherDownpour className="text-blue-md text-5xl" />
            )}
          </div>
        );
      })}
    </div>
  );
}
