import React, { useEffect, useState } from "react";
import { format } from "d3-format";
import { formatDateLong } from "../../../utils/numberFormat";
import { fetchOrderTradeList } from "../../../api/accountApi";

export default function OrderDetails() {
  const [activeTab, setActiveTab] = useState("전체"); // 기본값: 전체
  const [orders, setOrders] = useState();

  const tryFetchOrders = async () => {
    let filter = "";
    if (activeTab == "전체") {
      filter = "/all";
    } else if (activeTab == "미체결") {
      filter = "/unfilled";
    }
    try {
      const response = await fetchOrderTradeList(filter);
      if (response.data.status == "OK") {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    tryFetchOrders();
  }, [activeTab]);

  const formatCurrency = format(",.0f");

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gray-light p-4 mt-2.5 rounded-lg flex-grow overflow-hidden relative">
        {/* 탭 메뉴 */}
        <div className="flex gap-1 text-[14px] ">
          {["전체", "체결 완료", "미체결"].map((tab) => (
            <p
              key={tab}
              className={`cursor-pointer ${
                activeTab === tab
                  ? " min-w-12 text-center bg-blue-md px-2 py-1 text-white rounded-lg"
                  : "text-gray-500 min-w-12 text-center px-2 py-1"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "체결 완료" ? "체결" : tab} {/* UI에는 "체결"로 표시 */}
            </p>
          ))}
        </div>

        {/* 주문 내역 테이블 */}
        <div className="bg-white p-2 mt-3 rounded-lg h-108 overflow-y-auto no-scrollbar relative">
          <table className="w-full border-collapse text-center text-sm h-full">
            <thead>
              <tr className="border-b border-blue-md font-semibold bg-white">
                <th className="p-2">
                  종목명
                  <br />
                  매매구분
                </th>
                <th className="p-2">
                  주문단가
                  <br />
                  주문수량
                </th>
                <th className="p-2">
                  체결단가
                  <br />
                  체결수량
                </th>
                <th className="p-2">
                  상태
                  <br />
                  미체결수량
                </th>
                <th className="p-2">주문일자</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-blue-light duration-300"
                >
                  <td className="p-2">
                    <span className="font-semibold">{order.stockTicker}</span>
                    <br />
                    {order.executionType}
                  </td>
                  <td className="p-2">
                    {formatCurrency(order.offerPrice)}원 <br />
                    {order.orderQuantity}주
                  </td>
                  <td className="p-3">
                    {formatCurrency(order.tradePrice)}원 <br />
                    {order.tradeQuantity}주
                  </td>
                  <td className="p-2">
                    {order.tradeStatus == "SUCCESS" ? "체결" : "미체결"}
                    <br />
                    {order.unfilledQuantity}주
                  </td>
                  <td className="p-2">{formatDateLong(order.tradeDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-200 to-transparent rounded-b-lg"></div>
      </div>
    </div>
  );
}
