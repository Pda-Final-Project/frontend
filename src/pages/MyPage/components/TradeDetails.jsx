import React from "react";


const DUMMY_TRADES = [
  {
    date: "2025.02.18",
    ticker: "엔비디아",
    symbol: "NVDA",
    profit: "200.00",
    percentage: 50.10,
    sellAvg: "140.00",
    buyAvg: "130.00",
    sellPrice: "280.00",
    sellAmount: "2",
    buyPrice: "260.00",
    buyAmount: "2",
    sellExchangeRate: "1441.08",
    buyExchangeRate: "1349.40",
  },
  {
    date: "2025.02.20",
    ticker: "테슬라",
    symbol: "TSLA",
    profit: "350.00",
    percentage: 28.45,
    sellAvg: "230.00",
    buyAvg: "210.00",
    sellPrice: "460.00",
    sellAmount: "3",
    buyPrice: "420.00",
    buyAmount: "3",
    sellExchangeRate: "1425.50",
    buyExchangeRate: "1368.30",
  },
  {
    date: "2025.02.22",
    ticker: "TQQQ",
    symbol: "TQQQ",
    profit: "150.00",
    percentage: 20.05,
    sellAvg: "50.00",
    buyAvg: "45.00",
    sellPrice: "100.00",
    sellAmount: "5",
    buyPrice: "90.00",
    buyAmount: "5",
    sellExchangeRate: "1432.75",
    buyExchangeRate: "1380.60",
  },
  {
    date: "2025.02.25",
    ticker: "애플",
    symbol: "AAPL",
    profit: "275.00",
    percentage: 32.90,
    sellAvg: "170.00",
    buyAvg: "160.00",
    sellPrice: "340.00",
    sellAmount: "4",
    buyPrice: "320.00",
    buyAmount: "4",
    sellExchangeRate: "1448.20",
    buyExchangeRate: "1395.80",
  }
];

export default function TradeDetails() {
  return (
    <div className="mt-1 rounded-xl">
    {/* 제목 */}
    <div className="text-lg font-bold flex gap-4">
      <p className="cursor-pointer">손익 내역</p>
      <p className="cursor-pointer">주문 내역</p>
    </div>
  
  
      <div className="bg-gray-light p-4 mt-1 rounded-xl">
      
        {/* 요약 정보 */}
        <div className="grid grid-cols-4 gap-2 p-2 text-[14px]">
          <p className="font-semibold">실현 손익 (USD)</p>
          
            {DUMMY_TRADES.reduce((acc, trade) => acc + parseFloat(trade.profit), 0).toFixed(2)}
          
          <p className="font-semibold">매도 금액 (USD)</p>
          <p>
            {DUMMY_TRADES.reduce((acc, trade) => acc + parseFloat(trade.sellPrice) * parseInt(trade.sellAmount), 0).toFixed(2)}
          </p>
          <p className="font-semibold">매매 손익 (USD)</p>
          <p>
            {DUMMY_TRADES.reduce((acc, trade) => acc + ((parseFloat(trade.sellPrice) - parseFloat(trade.buyPrice)) * parseInt(trade.sellAmount)), 0).toFixed(2)}
          </p>
          <p className="font-semibold">환차 손익 (KRW)</p>
          <p>
            {DUMMY_TRADES.reduce((acc, trade) => acc + ((parseFloat(trade.sellExchangeRate) - parseFloat(trade.buyExchangeRate)) * parseFloat(trade.sellPrice) * parseInt(trade.sellAmount)), 0).toFixed(2)}
          </p>
        </div>

        {/* 매매 내역 테이블 */}
        <div className="bg-white p-2 mt-3 rounded-xl">
          <table className="w-full border-collapse text-center text-lx">
            <thead>
              <tr className="border-b border-blue-300 font-semibold bg-white">
                <th className="p-2">매도일자</th>
                <th className="p-2">종목명 <br/>ticker</th>
                <th className="p-2">실현손익(USD) <br/> 손익률(%)</th>
                <th className="p-2">매도 평균가(USD) <br/> 매수 평균가(USD)</th>
                <th className="p-2">매도 금액(USD) <br/> 매수 금액(USD)</th>
                <th className="p-2">매도 수량 <br/> 매수 수량</th>
                <th className="p-2">매도 환율(KRW/USD) <br/> 매수 환율(KRW/USD)</th>
              </tr>
            </thead>
            
            <tbody>
              {DUMMY_TRADES.map((trade, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-2">{trade.date}</td>
                  <td className="p-2">
                    {trade.ticker} <br />
                    <span className="text-gray-500">{trade.symbol}</span>
                  </td>
                  <td className="p-2">
                    <span>{trade.profit} USD</span> <br />
                    {trade.percentage}%
                  </td>
                  <td className="p-2">
                    {trade.sellAvg} USD <br />
                    {trade.buyAvg} USD
                  </td>
                  <td className="p-2">
                    {(parseFloat(trade.sellPrice) * parseInt(trade.sellAmount)).toFixed(2)} USD <br />
                    {(parseFloat(trade.buyPrice) * parseInt(trade.buyAmount)).toFixed(2)} USD
                  </td>
                  <td className="p-2">
                    {trade.sellAmount}주 <br />
                    {trade.buyAmount}주
                  </td>
                  <td className="p-2">
                    {trade.sellExchangeRate} <br />
                    {trade.buyExchangeRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
