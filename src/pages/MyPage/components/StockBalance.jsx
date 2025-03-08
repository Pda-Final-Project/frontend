import React, { useEffect, useState } from "react";
import { fetchTotalHoldings } from "../../../api/accountApi";
import { fetchExchangeRate } from "../../../api/othersApi";

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
  const [currency, setCurrency] = useState("KRW");
  const [exchangeRate, setExchangeRate] = useState(1449.8); //환율
  const [balanceKrwData, setBalanceKrwData] = useState(dummyData);
  const [balanceUsdData, setBalanceUsdData] = useState();
  const [balanceData, setBalanceData] = useState(balanceKrwData);

  const tryFetchTotalHoldings = async () => {
    try {
      const response = await fetchTotalHoldings();
      if (response.data.status == "OK") {
        setBalanceKrwData(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const tryFetchExchangeRate = async () => {
    try {
      const response = await fetchExchangeRate();
      if (response.data.status == "OK") {
        setExchangeRate(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setBalanceUsdData({
      evaluationAmount: (
        balanceKrwData.evaluationAmount / exchangeRate
      ).toFixed(2),
      profitChange: (balanceKrwData.profitChange / exchangeRate).toFixed(2),
      returnRate: balanceKrwData.returnRate,
      buyAmount: (balanceKrwData.buyAmount / exchangeRate).toFixed(2),
      tradeProfit: (balanceKrwData.tradeProfit / exchangeRate).toFixed(2),
      fxProfit: balanceKrwData.fxProfit / exchangeRate.toFixed(2),
    });
  }, [balanceKrwData, exchangeRate]);

  useEffect(() => {
    setBalanceData(currency === "KRW" ? balanceKrwData : balanceUsdData);
  }, [currency]);

  useEffect(() => {
    tryFetchTotalHoldings();
    tryFetchExchangeRate;
  }, []);

  const getColorClass = (value) =>
    value >= 0 ? "text-red-500" : "text-blue-500";

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">해외주식 잔고</h1>
        <div className="flex space-x-2 p-1 rounded-lg text-sm">
          <button
            className={`px-2 py-1 ${
              currency === "KRW" ? "bg-blue-md text-white rounded" : ""
            }`}
            onClick={() => setCurrency("KRW")}
          >
            원화
          </button>
          <button
            className={`px-2 py-1 ${
              currency === "USD" ? "bg-blue-md text-white rounded" : ""
            }`}
            onClick={() => setCurrency("USD")}
          >
            외화
          </button>
        </div>
      </div>

      <div className="bg-gray-light p-4 rounded-lg flex justify-between">
        <div>
          <p className="text-lg font-bold">평가금액</p>
          <p
            className={`text-2xl font-bold ${getColorClass(
              balanceData.evaluationAmount
            )}`}
          >
            {balanceData.evaluationAmount.toLocaleString()} {currency}
          </p>
          <p className={`text-sm ${getColorClass(balanceData.profitChange)}`}>
            ▲ {balanceData.profitChange.toLocaleString()} (
            {balanceData.returnRate.toFixed(2)}%)
          </p>
        </div>

        <div className="text-sm text-right min-w-[220px] mr-3 justify-center flex flex-col items-end">
          <p className="font-semibold w-full flex justify-between">
            <span className="text-gray-500">매수금액</span>
            <span>
              {balanceData.buyAmount.toLocaleString()} {currency}
            </span>
          </p>
          <p
            className={`font-bold w-full flex justify-between ${getColorClass(
              balanceData.tradeProfit
            )}`}
          >
            <span className="text-gray-500">매매손익</span>
            <span>
              {balanceData.tradeProfit.toLocaleString()} {currency}
            </span>
          </p>
          <p
            className={`font-bold w-full flex justify-between ${getColorClass(
              balanceData.fxProfit
            )}`}
          >
            <span className="text-gray-500">환차손익</span>
            <span>
              {balanceData.fxProfit.toLocaleString()} {currency}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
