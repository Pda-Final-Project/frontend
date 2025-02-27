import React from "react";

// 더미 데이터 (매매 내역)
const DUMMY_TRADES = [
  {
    date: "2025.02.18",
    ticker: "엔비디아",
    symbol: "NVDA",
    profit: 6400,
    percentage: 57.32,
    sellAvg: "202,545",
    buyAvg: "181,004",
    sellAmount: "8,993/4주",
    buyAmount: "5,003/4주",
    sellExchangeRate: "1441.08",
    buyExchangeRate: "1349.40",
  },
  {
    date: "2025.02.19",
    ticker: "애플",
    symbol: "AAPL",
    profit: 3200,
    percentage: 25.67,
    sellAvg: "180,300",
    buyAvg: "160,200",
    sellAmount: "6,500/5주",
    buyAmount: "4,200/5주",
    sellExchangeRate: "1400.50",
    buyExchangeRate: "1350.75",
  },
  {
    date: "2025.02.20",
    ticker: "테슬라",
    symbol: "TSLA",
    profit: 8700,
    percentage: 72.15,
    sellAvg: "290,800",
    buyAvg: "210,500",
    sellAmount: "10,200/3주",
    buyAmount: "6,900/3주",
    sellExchangeRate: "1450.20",
    buyExchangeRate: "1380.90",
  },
];

export default function TradeDetails() {
  return (
    <div className="mt-1 rounded-xl">
      {/* 제목 */}
      <h1 className="text-lg font-bold">손익 내역</h1>
      <div className="bg-gray-light p-4 mt-1 rounded-xl">
        {/* 요약 정보 */}
        <div className="grid grid-cols-4 grid-rows-2 bg-gray-light p-1 text-center font-bold">
          <p>손익금액</p>
          <p className="text-red-600">손익 data</p>
          <p>매수금액</p>
          <p>매수 data</p>
          <p>환차손익</p>
          <p>환차손 data</p>
          <p>매도금액</p>
          <p>매도 data</p>
        </div>

        {/* 매매 내역 테이블 */}
        <div className="bg-white p-2 mt-3 rounded-xl">
          <table className="w-full border-collapse text-center text-sm">
            <thead>
              <tr className="border-b border-blue-300 font-semibold bg-white">
                <th className="p-2">매도일자</th>
                <th className="p-2">종목명 <br/>ticker</th>
                <th className="p-2">실현손익 <br/> 손익률</th>
                <th className="p-2">매도 평균가 <br/> 매수 평균가</th>
                <th className="p-2">매도 금액/수량 <br/> 매수 금액/수량</th>
                <th className="p-2">매도 환율 <br/> 매수 환율</th>
              </tr>
            </thead>
            
            <tbody>
              {DUMMY_TRADES.map((trade, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td className="p-2" rowSpan="2">{trade.date}</td>
                    <td className="p-2">{trade.ticker}</td>
                    <td className="p-2">{trade.profit}</td>
                    <td className="p-2">{trade.sellAvg}</td>
                    <td className="p-2">{trade.sellAmount}</td>
                    <td className="p-2">{trade.sellExchangeRate}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="p-2">{trade.symbol}</td>
                    <td className="p-2">{trade.percentage}%</td>
                    <td className="p-2">{trade.buyAvg}</td>
                    <td className="p-2">{trade.buyAmount}</td>
                    <td className="p-2">{trade.buyExchangeRate}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
