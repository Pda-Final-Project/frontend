import React from "react";

// 더미 데이터 (매매 내역)
const DUMMY_TRADES = [
  {
    tradeDate: "2025-02-10",
    profit: 2500.0, // 손익 금액
    profitRate: 5.2, // 수익률
    tradeAmount: 15000.0, // 매도/매수 금액
    tradeQuantity: 100, // 매도/매수 수량
  },
  {
    tradeDate: "2025-02-05",
    profit: -800.0,
    profitRate: -2.1,
    tradeAmount: 12000.0,
    tradeQuantity: 50,
  },
  {
    tradeDate: "2025-01-30",
    profit: 1400.0,
    profitRate: 3.5,
    tradeAmount: 18000.0,
    tradeQuantity: 75,
  },
];

export default function TradeDetails() {
  return (
    <div className="bg-gray-300 p-4 rounded-lg">
      {/* 제목 */}
      <h1 className="text-xl font-bold mb-2"> 손익 내역 </h1>

      {/* 요약 정보 (손익금액, 매수금액, 매도금액) */}
      <div className="grid grid-cols-3 bg-gray-400 p-3 rounded-lg text-center font-bold">
        <p>손익금액</p>
        <p>매수금액</p>
        <p>매도금액</p>
      </div>

      {/* 매매 내역 테이블 */}
      <div className="bg-gray-400 p-4 mt-3 rounded-lg">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-gray-500 text-white font-bold">
              <th className="p-2">매매일자</th>
              <th className="p-2">실현손익(수익률)</th>
              <th className="p-2">매도/매수 금액</th>
              <th className="p-2">매도/매수 수량</th>
            </tr>
          </thead>
          <tbody>
            {DUMMY_TRADES.map((trade, index) => (
              <tr key={index} className="bg-gray-50 border-t border-gray-400">
                <td className="p-2">{trade.tradeDate}</td>
                <td className={`p-2 font-bold ${trade.profit >= 0 ? "text-green-600" : "text-red-500"}`}>
                  {trade.profit >= 0 ? "▲" : "▼"} {trade.profit.toFixed(2)} ({trade.profitRate.toFixed(2)}%)
                </td>
                <td className="p-2">{trade.tradeAmount.toFixed(2)}</td>
                <td className="p-2">{trade.tradeQuantity}주</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
