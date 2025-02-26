import React, { useState } from "react";

export default function StockBalance() {
  const [currency, setCurrency] = useState("원화"); // 환율 단위 상태 (기본 원화)

  return (
    <div className="bg-gray-light p-4 rounded-lg">
      {/* 제목 */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">해외주식 잔고</h1>

        {/* 환율 단위 선택 버튼 */}
        <div className="flex space-x-2 bg-gray-400 p-1 rounded-lg text-sm font-bold">
          <button 
            className={`px-2 py-1 ${currency === "원화" ? "bg-white rounded" : ""}`}
            onClick={() => setCurrency("원화")}
          >
            원화
          </button>
          <button 
            className={`px-2 py-1 ${currency === "외화" ? "bg-white rounded" : ""}`}
            onClick={() => setCurrency("외화")}
          >
            외화
          </button>
        </div>
      </div>

      {/* 잔고 정보 */}
      <div className="bg-gray-400 p-4 mt-3 rounded-lg flex justify-between">
        {/* 평가 금액 */}
        <div>
          <p className="font-bold">평가금액</p>
          <p className="text-lg font-bold">28,500 원</p>
          <p className="text-sm">▲ 손익등락(수익률)</p>
        </div>

        {/* 추가 정보 */}
        <div className="text-right space-y-1">
          <p className="font-bold">매수금액</p>
          <p className="font-bold">매매손익</p>
          <p className="font-bold">환차손익</p>
        </div>
      </div>
    </div>
  );
}
