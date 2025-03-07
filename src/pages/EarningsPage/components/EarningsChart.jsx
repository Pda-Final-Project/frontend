import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart,
} from "recharts";
import earningdata from "./earningdata";
import { format } from "d3-format";

const EarningsChart = () => {
  // 데이터 변환 (EPS 및 매출 변동률 추가)
  const chartData = earningdata.map((data) => {
    const eps = data.eps ? parseFloat(data.eps) : null;
    const eps_estimated = data.eps_estimated
      ? parseFloat(data.eps_estimated)
      : null;
    const revenue = data.revenue ? parseFloat(data.revenue) : null;
    const revenue_estimated = data.revenue_estimated
      ? parseFloat(data.revenue_estimated)
      : null;

    // 변동률 계산 (eps, revenue가 null이면 표시 안 함)
    const eps_variation =
      eps && eps_estimated
        ? (((eps - eps_estimated) / eps_estimated) * 100).toFixed(2)
        : null;
    const revenue_variation =
      revenue && revenue_estimated
        ? (((revenue - revenue_estimated) / revenue_estimated) * 100).toFixed(2)
        : null;

    return {
      date: data.date,
      eps_estimated,
      eps,
      "EPS 예측 오차값": eps_variation ? parseFloat(eps_variation) : null,
      revenue_estimated,
      revenue,
      "매출 예측 오차값": revenue_variation
        ? parseFloat(revenue_variation)
        : null,
    };
  });

  return (
    <div className="w-full grid grid-cols-2 gap-8">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            domain={[-20, 20]}
          />
          <Tooltip />
          <Legend />

          {/* EPS 바 차트 */}
          <Bar
            yAxisId="left"
            dataKey="eps_estimated"
            fill="#ccc"
            name="예상 EPS"
          />
          <Bar yAxisId="left" dataKey="eps" fill="#32cd32" name="실제 EPS" />

          {/* EPS 변동률 선 그래프 */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="EPS 예측 오차값"
            stroke="#ff7300"
            strokeWidth={2}
            dot={true}
            name="EPS 예측 오차값"
          />
        </ComposedChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 12 }}
            tickFormatter={format(".2s")}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 12 }}
            tickFormatter={format(".2s")}
            domain={[-20, 20]}
          />
          <Tooltip />
          <Legend />

          {/* 매출 바 차트 */}
          <Bar
            yAxisId="left"
            dataKey="revenue_estimated"
            fill="#ccc"
            name="예상 매출"
          />
          <Bar
            yAxisId="left"
            dataKey="revenue"
            fill="#7b68ee"
            name="실제 매출"
          />

          {/* 매출 변동률 그래프 */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="매출 예측 오차값"
            stroke="#ff7300"
            strokeWidth={2}
            dot={true}
            name="매출 예측 오차값"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsChart;
