import React, { useState } from "react";

export default function StockBalance() {
  const [currency, setCurrency] = useState("원화"); // 환율 단위 상태

  // ✅ 더미 데이터 (기본값)
  const dummyData = {
    evaluationAmount: 28500,
    profitLossChange: 1500,
    profitRate: 5.56,
    purchaseAmount: 27000,
    tradeProfitLoss: 1200,
    exchangeProfitLoss: 300
  };

  // ✅ 값에 따라 색상 결정하는 함수
  const getColorClass = (value) => (value >= 0 ? "text-red-500" : "text-blue-500");

  return (
    <div>
      {/* 제목 */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">해외주식 잔고</h1>

        {/* 환율 단위 선택 버튼 */}
        <div className="flex space-x-2 p-1 rounded-lg text-sm font-semibold">
          <button 
            className={`px-2 py-1 ${currency === "원화" ? "bg-blue-md text-white rounded" : ""}`}
            onClick={() => setCurrency("원화")}
          >
            원화
          </button>
          <button 
            className={`px-2 py-1 ${currency === "외화" ? "bg-blue-md text-white rounded" : ""}`}
            onClick={() => setCurrency("외화")}
          >
            외화
          </button>
        </div>
      </div>

      {/* 잔고 정보 */}
      <div className="bg-gray-light p-4 rounded-lg flex justify-between">
        {/* 평가 금액 */}
        <div>
          <p className="text-lg font-bold">평가금액</p>
          <p className={`text-2xl font-bold ${getColorClass(dummyData.evaluationAmount)}`}>
            {dummyData.evaluationAmount.toLocaleString()} 원
          </p>
          <p className={`text-sm ${getColorClass(dummyData.profitLossChange)}`}>
            ▲ {dummyData.profitLossChange.toLocaleString()} ({dummyData.profitRate.toFixed(2)}%)
          </p>
        </div>

        {/* 추가 정보 */}
        <div className="text-sm text-right min-w-[220px] mr-3 justify-center flex flex-col items-end">
          <p className="font-semibold w-full flex justify-between">
            <span className="text-gray-500">매수금액</span> 
            <span>{dummyData.purchaseAmount.toLocaleString()} 원</span>
          </p>
          <p className={`font-bold w-full flex justify-between ${getColorClass(dummyData.tradeProfitLoss)}`}>
            <span className="text-gray-500">매매손익</span> 
            <span>{dummyData.tradeProfitLoss.toLocaleString()} 원</span>
          </p>
          <p className={`font-bold w-full flex justify-between ${getColorClass(dummyData.exchangeProfitLoss)}`}>
            <span className="text-gray-500">환차손익</span> 
            <span>{dummyData.exchangeProfitLoss.toLocaleString()} 원</span>
          </p>
        </div>
      </div>
    </div>
  );
}
