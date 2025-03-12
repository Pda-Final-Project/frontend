import React, { useState, useEffect } from "react";
import OrderDetails from "./OrderDetails";
import {
  fetchTradeProfitList,
  fetchTradeProfitSum,
} from "../../../api/accountApi";
import { format } from "d3-format";
import { formatDateLong } from "../../../utils/numberFormat";

const dummy_tradeProfits = [
  {
    sellDateTime: "20250305", //매도날짜
    stockTicker: "TSLA", //종목티커
    realizedProfit: 500000.0, //실현손익(KRW)
    returnRate: 10.5, //손익률(%)
    sellAveragePrice: 850.0, // 매도 평균가(KRW)
    buyAveragePrice: 800.0, // 매수 평균가(KRW)
    sellAmount: 8500.0, // 매도 금액(KRW)
    buyAmount: 8000.0, // 매수 금액(KRW)
    sellQuantity: 10, //매도수량
    buyQuantity: 10, //매수수량
    sellExchangeRate: 1.2, //매도환율
    buyExchangeRate: 1.15, //매수환율
  },
];

const dummy_tradeProfitInfo = {
  realizedProfit: 500000.0, // 실현 손익(KRW) : 매매손익+환차손익
  sellbuyProfit: 350000.0, //매매손익(KRW) : 매도금액-매수금액
  sellAmount: 20000000.0, // 매도 금액(KRW)
  buyAmount: 19650000.0, // 매수 금액(KRW)
  fxProfit: 150000.0, // 환차손익(KRW)
};

export default function TradeDetails() {
  const [activeTab, setActiveTab] = useState("profit");
  const [tradeProfitInfo, setTradeProfitInfo] = useState(dummy_tradeProfitInfo);
  const [tradeProfits, setTradeProfits] = useState(dummy_tradeProfits);

  const tryFetchTradeProfitInfo = async () => {
    try {
      const response = await fetchTradeProfitSum();
      if (response.data.status == "OK") {
        setTradeProfitInfo(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const tryFetchTradeProfits = async () => {
    try {
      const response = await fetchTradeProfitList();
      if (response.data.status == "OK") {
        setTradeProfits(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    tryFetchTradeProfitInfo();
    tryFetchTradeProfits();
  }, []);

  const getColorClass = (value) =>
    value >= 0 ? "text-red-500 font-semibold" : "text-blue-500 font-semibold";

  const formatCurrency = format(",.0f");
  return (
    <div className="mt-1 rounded-lg h-[500px]">
      {/* 탭 메뉴 */}
      <div className="flex border-b border-gray-300 text-lg">
        <button
          className={`p-1 w-1/4 text-center text-[14px] ${
            activeTab === "profit"
              ? "border-b-2 border-blue-md text-blue-md font-bold"
              : "text-gray-md font-bold"
          }`}
          onClick={() => setActiveTab("profit")}
        >
          손익 내역
        </button>
        <button
          className={`p-1 w-1/4 text-center text-[14px] ${
            activeTab === "order"
              ? "border-b-2 border-blue-md text-blue-md font-bold"
              : "text-gray-md font-bold"
          }`}
          onClick={() => setActiveTab("order")}
        >
          주문 내역
        </button>
      </div>

      {activeTab === "profit" ? (
        <div className="relative h-full">
          {/** 손익 내역 */}
          <div className="bg-gray-light p-4 mt-2.5 rounded-lg h-full overflow-y-auto no-scrollbar">
            {/* 요약 정보 */}
            <div className="grid grid-cols-2 gap-24 text-[14px] mb-2">
              <div className="flex justify-between">
                <p className="font-semibold">실현 손익</p>
                <p
                  className={`text-right ${getColorClass(
                    tradeProfitInfo.realizedProfit
                  )}`}
                >
                  {formatCurrency(tradeProfitInfo.realizedProfit.toFixed())}
                  <span>원</span>
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold">매도 금액</p>
                <p
                  className={`text-right ${getColorClass(
                    tradeProfitInfo.sellAmount
                  )}`}
                >
                  {formatCurrency(tradeProfitInfo.sellAmount.toFixed())}
                  <span>원</span>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-24 text-[14px]">
              <div className="flex justify-between">
                <p className="font-semibold ">매매 손익</p>
                <p
                  className={`text-right  ${getColorClass(
                    tradeProfitInfo.sellbuyProfit
                  )}`}
                >
                  {formatCurrency(tradeProfitInfo.sellbuyProfit.toFixed())}
                  <span>원</span>
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold ">환차 손익</p>
                <p
                  className={`text-right  ${getColorClass(
                    tradeProfitInfo.fxProfit
                  )}`}
                >
                  {formatCurrency(tradeProfitInfo.fxProfit.toFixed())}
                  <span>원</span>
                </p>
              </div>
            </div>

            {/* 매매 내역 테이블 */}
            <div className="bg-white p-2 mt-3 rounded-lg h-full ">
              <table className="w-full border-collapse text-center text-[14px]">
                <thead>
                  <tr className="border-b border-blue-300 font-semibold bg-white">
                    <th className="p-2">매도일자</th>
                    <th className="p-2">종목명</th>
                    <th className="p-2">
                      실현손익 <br /> 손익률 (%)
                    </th>
                    <th className="p-2">
                      매도 평균가 <br /> 매수 평균가
                    </th>
                    <th className="p-2">
                      매도 금액 <br /> 매수 금액
                    </th>
                    <th className="p-2">
                      매도 수량 <br /> 매수 수량
                    </th>
                    <th className="p-2">
                      매도 환율 (KRW/USD) <br /> 매수 환율 (KRW/USD)
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tradeProfits.map((trade, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-blue-light duration-300"
                    >
                      <td className="p-2">
                        {formatDateLong(trade.sellDateTime)}
                      </td>
                      <td className="p-2">
                        <span className="text-gray-500">
                          {trade.stockTicker}
                        </span>
                      </td>
                      <td className="p-2">
                        <span>{formatCurrency(trade.realizedProfit)} 원</span>{" "}
                        <br />
                        {trade.returnRate.toFixed(2)}%
                      </td>
                      <td className="p-2">
                        {formatCurrency(trade.sellAveragePrice)} 원 <br />
                        {formatCurrency(trade.buyAveragePrice)} 원
                      </td>
                      <td className="p-2">
                        {formatCurrency(parseFloat(trade.sellAmount).toFixed())}{" "}
                        원 <br />
                        {formatCurrency(parseFloat(trade.buyAmount).toFixed())}
                        원
                      </td>
                      <td className="p-2">
                        {trade.sellQuantity}주 <br />
                        {trade.buyQuantity}주
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
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-200 to-transparent rounded-b-lg"></div>
        </div>
      ) : (
        <OrderDetails />
      )}
    </div>
  );
}
