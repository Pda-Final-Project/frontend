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
  BasicEarningsPerShare: "주당 기본 순이익(EPS)",
};

const CustomizedLegend = ({ payload, onClick = () => {} }) => {
  return (
    <div className="flex w-full justify-center gap-8">
      {payload.map((entry, index) => (
        <div
          key={`legend-item-${index}`}
          onClick={() => onClick(entry.value)}
          className="text-sm font-semibold text-col cursor-pointer hover:underline"
          style={{
            color: entry.color || "#000",
          }}
        >
          {entry.value}
        </div>
      ))}
    </div>
  );
};

export default function WeatherGraph10Q({
  setSelectedFilling,
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
      const response = await axios.get(filling10qJsonUrl);
      if (response.status === 200) {
        const rawData = response.data;
        const parsedData =
          typeof rawData === "string" ? JSON.parse(rawData) : rawData;

        console.log("Raw Data:", parsedData);

        // 모든 분기를 추출 (데이터에 포함된 모든 endDate를 기준으로)
        const allQuarters = new Set();
        Object.values(parsedData).forEach((data) =>
          data.forEach((item) =>
            allQuarters.add(getQuarter(item.period.endDate))
          )
        );

        // 모든 데이터 키에 대해 데이터를 0으로 초기화한 후, 값이 있는 경우 채우기
        const formattedData = Object.keys(LABEL_MAP).map((key) => {
          const dataMap =
            parsedData[key]?.reduce((acc, item) => {
              const quarterLabel = getQuarter(item.period.endDate);
              acc[quarterLabel] =
                key === "BasicEarningsPerShare"
                  ? Number(item.value)
                  : Number(item.value) / 1e9;
              return acc;
            }, {}) ?? {}; // 데이터가 없으면 빈 객체 반환

          // 모든 분기를 확인하면서 값이 없는 경우 0으로 채움
          allQuarters.forEach((quarter) => {
            if (!dataMap[quarter]) {
              dataMap[quarter] = 0;
            }
          });

          return {
            name: LABEL_MAP[key],
            ...dataMap,
          };
        });

        console.log("Processed Data:", formattedData);
        setChartData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchFilling10q();
  }, []);

  return (
    <div className="relative w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 0, right: 0, left: -5, bottom: 0 }}
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
            tickFormatter={(value) => `${value.toFixed()}억 $`}
          />
          <Tooltip />
          <Legend
            content={
              <CustomizedLegend
                onClick={(value) => setSelectedFilling(value)}
              />
            }
          />
          {chartData.length > 0 &&
            Object.keys(chartData[0])
              .filter((k) => k !== "name")
              .sort()
              .map((key, index) => (
                <Bar
                  key={key}
                  dataKey={key}
                  fill={index === 0 ? "#54b0fe" : "#ff7000"} // 이전 분기는 파랑, 이번 분기는 빨강
                  activeBar={
                    <Rectangle fill={index === 0 ? "#008AFF" : "#ff5500"} />
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
              left: `${index * 23.3 + 15.5}%`,
              top: "5%",
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
