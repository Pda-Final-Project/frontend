import React, { useState } from "react";

// 가짜 데이터 (보유 종목)
const DUMMY_HOLDINGS = [
  {
    id: 1,
    name: "엔비디아",
    ticker: "NVDA",
    profit: 5.0, // 수익금액 (USD)
    profitRate: 2.94, // 수익률 (%)
    quantity: 100, // 보유 수량
    evaluationAmount: 20000, // 평가 금액
    purchaseAmount: 18000, // 매수 금액
    avgPrice: 145.0, // 평균 단가
    currentPrice: 150.0, // 현재가
  },
  {
    id: 3,
    name: "테슬라",
    ticker: "TSLA",
    profit: -3.1,
    profitRate: -1.8,
    quantity: 30,
    evaluationAmount: 15000,
    purchaseAmount: 17000,
    avgPrice: 140.0,
    currentPrice: 135.0,
  },
];

export default function Holdings() {
  const [sortBy, setSortBy] = useState("profitRate"); // 기본 정렬: 수익률 순
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림/닫힘 상태

  // 정렬 기준 목록
  const sortOptions = [
    { key: "profitRate", label: "수익률 순" },
    { key: "evaluationAmount", label: "평가금액 순" },
    { key: "purchaseAmount", label: "매수금액 순" },
  ];

  
  // 정렬 함수
  const sortedHoldings = [...DUMMY_HOLDINGS].sort((a, b) => {
    if (sortBy === "evaluationAmount") {
      return b.evaluationAmount - a.evaluationAmount;
    } else if (sortBy === "purchaseAmount") {
      return b.purchaseAmount - a.purchaseAmount;
    } else {
      return b.profitRate - a.profitRate;
    }
  });

  return (
    <div>
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold ml-1 mt-3 mb-2.5">보유종목</h1>

        {/* 정렬 기준 드롭다운 */}
        <div className="relative">
          <button
            className="bg-gray-light px-4 py-2 rounded-lg font-bold text-blue-md flex items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {sortOptions.find((option) => option.key === sortBy)?.label} ▼
          </button>

          {/* 드롭다운 메뉴 */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-gray-light text-blue-md font-bold rounded-lg shadow-lg">
              {sortOptions.map((option) => (
                <button
                  key={option.key}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-600"
                  onClick={() => {
                    setSortBy(option.key);
                    setIsDropdownOpen(false); // 선택 후 드롭다운 닫기
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 보유 종목 리스트 */}
      <div className="bg-gray-light p-4 mt-1 rounded-xl">
      {sortedHoldings.map((stock) => (
        <div key={stock.id} className="bg-white p-4 mb-2 rounded-xl">
          {/* 종목명 & 수익금액 */}
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-bold">{stock.name}</p>
              <p className="text-sm text-gray-700">{stock.ticker}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">{stock.profit.toFixed(3)} USD</p>
              <p className={`text-sm ${stock.profitRate >= 0 ? "text-green-600" : "text-red-500"}`}>
                {stock.profitRate >= 0 ? "▲" : "▼"} {stock.profitRate.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* 상세 정보 */}
          <div className="grid grid-cols-2 gap-2 text-sm mt-2">
            <div>
              <p className="font-bold">보유 수량</p>
              <p>{stock.quantity}주</p>
            </div>
            <div className="text-right">
              <p className="font-bold">평가금액</p>
              <p>{stock.evaluationAmount.toFixed(3)}</p>
            </div>
            <div>
              <p className="font-bold">매수금액</p>
              <p>{stock.purchaseAmount.toFixed(3)}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">평균단가</p>
              <p>{stock.avgPrice.toFixed(3)}</p>
            </div>
            <div className="text-right col-span-2">
              <p className="font-bold">현재가</p>
              <p>{stock.currentPrice.toFixed(3)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
