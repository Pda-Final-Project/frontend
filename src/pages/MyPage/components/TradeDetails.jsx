import React, { useState, useEffect } from "react";
import OrderDetails from "./OrderDetails";
import {
  fetchTradeProfitList,
  fetchTradeProfitSum,
} from "../../../api/accountApi";
import { format } from "d3-format";
import { formatDateLong } from "../../../utils/numberFormat";

export default function TradeDetails() {
  const [activeTab, setActiveTab] = useState("profit");
  const [tradeProfitInfo, setTradeProfitInfo] = useState();
  const [tradeProfits, setTradeProfits] = useState();

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
    value >= 0 ? "text-red-md font-semibold" : "text-blue-dark font-semibold";

  const formatCurrency = format(",.0f");
  return (
    <div className="mt-1 rounded-lg flex flex-col h-full">
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
        <div className="h-full flex flex-col">
          {/* 손익 내역 */}
          <div className="bg-gray-light p-4 mt-2.5 rounded-lg flex-grow overflow-hidden relative">
            {/* 요약 정보 */}
            <div className="h-16 flex-col">
              <div className="grid grid-cols-2 gap-24 text-[14px] mb-2">
                <div className="flex justify-between">
                  <p className="font-semibold">실현 손익</p>
                  <p
                    className={`text-right ${getColorClass(
                      tradeProfitInfo?.realizedProfit
                    )}`}
                  >
                    {formatCurrency(tradeProfitInfo?.realizedProfit.toFixed())}
                    <span>원</span>
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold">매도 금액</p>
                  <p
                    className={`text-right ${getColorClass(
                      tradeProfitInfo?.sellAmount
                    )}`}
                  >
                    {formatCurrency(tradeProfitInfo?.sellAmount.toFixed())}
                    <span>원</span>
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-24 text-[14px]">
                <div className="flex justify-between">
                  <p className="font-semibold ">매매 손익</p>
                  <p
                    className={`text-right  ${getColorClass(
                      tradeProfitInfo?.sellbuyProfit
                    )}`}
                  >
                    {formatCurrency(tradeProfitInfo?.sellbuyProfit.toFixed())}
                    <span>원</span>
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-semibold ">환차 손익</p>
                  <p
                    className={`text-right  ${getColorClass(
                      tradeProfitInfo?.fxProfit
                    )}`}
                  >
                    {formatCurrency(tradeProfitInfo?.fxProfit.toFixed())}
                    <span>원</span>
                  </p>
                </div>
              </div>
            </div>
            {/* 매매 내역 테이블 */}
            <div className="bg-white p-2 mt-3 rounded-lg h-100 overflow-y-auto no-scrollbar relative">
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
                      매도 금액 <br />
                      매수 금액
                    </th>
                    <th className="p-2">
                      매도 수량 <br />
                      매수 수량
                    </th>
                    <th className="p-2">
                      매도 환율
                      <br />
                      매수 환율
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tradeProfits?.map((trade, index) => (
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
                      <td className="p-2 py-3">
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
                        {trade.sellExchangeRate.toFixed(2)} <br />
                        {trade.buyExchangeRate.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-200 to-transparent rounded-b-lg"></div>
          </div>
        </div>
      ) : (
        <OrderDetails />
      )}
    </div>
  );
}
