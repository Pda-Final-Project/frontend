import React, { useEffect, useState } from "react";
import { fetchTotalHoldings } from "../../../api/accountApi";

// ✅ 더미 데이터 (기본값)
const dummyData = {
  evaluationAmount: 28500,
  profitChange: 1500,
  returnRate: 5.56,
  buyAmount: 27000,
  tradeProfit: 1200,
  fxProfit: 300,
};
export default function StockBalance() {
  const [currency, setCurrency] = useState("원화");
  const [balanceData, setBalanceData] = useState(dummyData);

  const tryFetchTotalHoldings = async () => {
    try {
      const response = await fetchTotalHoldings();
      if (response.data.status == "OK") {
        setBalanceData(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    tryFetchTotalHoldings();
  }, []);

  // ✅ 값에 따라 색상 결정하는 함수
  const getColorClass = (value) =>
    value >= 0 ? "text-red-500" : "text-blue-500";

  return (
    <div>
      {/* 제목 */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">해외주식 잔고</h1>

        {/* 환율 단위 선택 버튼 */}
        <div className="flex space-x-2 p-1 rounded-lg text-sm font-semibold">
          <button
            className={`px-2 py-1 ${
              currency === "원화" ? "bg-blue-md text-white rounded" : ""
            }`}
            onClick={() => setCurrency("원화")}
          >
            원화
          </button>
          <button
            className={`px-2 py-1 ${
              currency === "외화" ? "bg-blue-md text-white rounded" : ""
            }`}
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
          <p
            className={`text-2xl font-bold ${getColorClass(
              balanceData.evaluationAmount
            )}`}
          >
            {balanceData.evaluationAmount.toLocaleString()} 원
          </p>
          <p className={`text-sm ${getColorClass(balanceData.profitChange)}`}>
            ▲ {balanceData.profitChange.toLocaleString()} (
            {balanceData.returnRate.toFixed(2)}%)
          </p>
        </div>

        {/* 추가 정보 */}
        <div className="text-sm text-right min-w-[220px] mr-3 justify-center flex flex-col items-end">
          <p className="font-semibold w-full flex justify-between">
            <span className="text-gray-500">매수금액</span>
            <span>{balanceData.buyAmount.toLocaleString()} 원</span>
          </p>
          <p
            className={`font-bold w-full flex justify-between ${getColorClass(
              balanceData.tradeProfit
            )}`}
          >
            <span className="text-gray-500">매매손익</span>
            <span>{balanceData.tradeProfit.toLocaleString()} 원</span>
          </p>
          <p
            className={`font-bold w-full flex justify-between ${getColorClass(
              balanceData.fxProfit
            )}`}
          >
            <span className="text-gray-500">환차손익</span>
            <span>{balanceData.fxProfit.toLocaleString()} 원</span>
          </p>
        </div>
      </div>
    </div>
  );
}
