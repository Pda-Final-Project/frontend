import React, { useEffect, useState } from "react";
import { fetchHoldings } from "../../../api/accountApi";
import { format } from "d3-format";
// 가짜 데이터 (보유 종목)
const DUMMY_HOLDINGS = [
  {
    stockTicker: "TSLA", // 종목 코드
    buyAmount: 1000000000.0, // 매수 금액(KRW)
    buyAveragePrice: 50000.0, // 매수 평균가(KRW)
    currentPrice: 60000.0, // 현재가(KRW)
    holdingQuantity: 4, // 보유 수량
    evaluationAmount: 240000.0, // 평가 금액(KRW) (보유 수량 * 현재가)
    profitChange: 40000.0, // 손익등락(KRW)
    returnRate: 20.0, // 수익률(%)
  },
  {
    stockTicker: "TSLA", // 종목 코드
    buyAmount: 1000000000.0, // 매수 금액(KRW)
    buyAveragePrice: 50000.0, // 매수 평균가(KRW)
    currentPrice: 60000.0, // 현재가(KRW)
    holdingQuantity: 4, // 보유 수량
    evaluationAmount: 240000.0, // 평가 금액(KRW) (보유 수량 * 현재가)
    profitChange: 40000.0, // 손익등락(KRW)
    returnRate: 20.0, // 수익률(%)
  },
  {
    stockTicker: "TSLA", // 종목 코드
    buyAmount: 1000000000.0, // 매수 금액(KRW)
    buyAveragePrice: 50000.0, // 매수 평균가(KRW)
    currentPrice: 60000.0, // 현재가(KRW)
    holdingQuantity: 4, // 보유 수량
    evaluationAmount: 240000.0, // 평가 금액(KRW) (보유 수량 * 현재가)
    profitChange: 40000.0, // 손익등락(KRW)
    returnRate: 20.0, // 수익률(%)
  },
];

export default function Holdings() {
  const [sortBy, setSortBy] = useState("profit"); // 기본 정렬: 수익률 순
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const [holdings, setHoldings] = useState(DUMMY_HOLDINGS);

  // 정렬 기준 목록
  const sortOptions = [
    { key: "profit", label: "수익률 순" },
    { key: "evaluation", label: "평가금액 순" },
    { key: "buyAmount", label: "매수금액 순" },
  ];

  const tryFetchHoldings = async () => {
    try {
      const response = await fetchHoldings(sortBy);
      if (response.data.status == "OK") {
        setHoldings(response.data.data);
      }
    } catch (error) {
      console.error("오류");
    }
  };

  useEffect(() => {
    tryFetchHoldings();
  }, [sortBy]);

  // d3-format의 format 함수로 1000단위 콤마 붙이기
  const formatCurrency = format(",.0f");

  return (
    <div className="h-full flex flex-col">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold ml-1 mt-3 mb-2.5">보유종목</h1>

        {/* 정렬 기준 드롭다운 */}
        <div className="relative text-sm">
          <button
            className="bg-gray-light px-4 py-2 rounded-lg font-bold text-blue-md flex items-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {sortOptions.find((option) => option.key === sortBy)?.label} ▼
          </button>

          {/* 드롭다운 메뉴 */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-1 z-3 w-32 bg-white text-blue-md font-bold rounded-lg shadow-lg">
              {sortOptions.map((option) => (
                <button
                  key={option.key}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-light"
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
      <div className="relative h-full">
        <div className="bg-gray-light p-4 mt-1 rounded-lg flex flex-col space-y-4 h-[500px] overflow-y-auto no-scrollbar">
          {holdings.map((stock, id) => (
            <div key={id} className="bg-white p-4 rounded-lg">
              {/* 종목명 & 수익금액 */}
              <div className="flex justify-between items-center border-b border-gray-md pb-2">
                <div className="flex items-center gap-2">
                  <img
                    src={`${import.meta.env.VITE_STOCK_LOGO_URL}${
                      stock.stockTicker
                    }.png`}
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="text-[18px] font-semibold">
                    {stock.stockTicker}
                  </p>
                </div>
                <div className="text-right flex flex-col gap-1">
                  <p className="font-bold text-[16px]">
                    {formatCurrency(stock.buyAmount)} 원
                  </p>
                  <div
                    className={`text-sm flex gap-1 ${
                      stock.returnRate >= 0 ? "text-blue-500" : "text-red-500"
                    }`}
                  >
                    <span>{stock.returnRate >= 0 ? "▲" : "▼"}</span>
                    <span>{formatCurrency(stock.profitChange)}원</span>
                    <span>({stock.returnRate.toFixed(2)}%)</span>
                  </div>
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="grid grid-cols-3 text-sm mt-2 pl-4 gap-16">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <p className="font-bold">보유 수량</p>
                    <p>{stock.holdingQuantity}주</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold">평가금액</p>
                    <p>{formatCurrency(stock.evaluationAmount)}원</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <p className="font-bold">매수금액</p>
                    <p>{formatCurrency(stock.buyAmount)}원</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-bold">평균단가</p>
                    <p>{formatCurrency(stock.buyAveragePrice)}원</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">현재가</p>
                  <p>{formatCurrency(stock.currentPrice)}원</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* 그라데이션 오버레이 */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-200 to-transparent rounded-b-lg"></div>
      </div>
    </div>
  );
}
