import React, { useEffect, useState } from "react";
import { format } from "d3-format";
import { formatDateLong } from "../../../utils/numberFormat";
import { fetchOrderTradeList } from "../../../api/accountApi";

const orders_dummy = [
  {
    stockTicker: "TSLA",
    executionType: "현금매도", //종목명
    offerPrice: 607,
    orderQuantity: 1,
    tradePrice: 607,
    tradeQuantity: 0,
    unfilledQuantity: 1,
    tradeStatus: "SUCCESS",
    tradeNumber: "005961af-1427-446b-9b16-e95a60b47478",
    tradeDate: "2025-03-07T09:46:47.396585",
  },
  {
    stockTicker: "TSLA",
    offerPrice: 607,
    orderQuantity: 1,
    tradePrice: 607,
    tradeQuantity: 0,
    unfilledQuantity: 1,
    tradeStatus: "FAILED",
    tradeNumber: "0a4fa6e0-319e-4ae5-8f21-0adcd3b52723",
    tradeDate: "2025-03-07T09:43:32.66654",
  },
];

export default function OrderDetails() {
  const [activeTab, setActiveTab] = useState("전체"); // 기본값: 전체
  const [orders, setOrders] = useState(orders_dummy);

  const tryFetchOrders = async () => {
    let filter = "";
    if (activeTab == "전체") {
      filter = "/all";
    } else if (activeTab == "미체결") {
      filter = "/failed";
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
    <div className="bg-gray-light p-4 mt-2.5 rounded-lg h-[500px]">
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
      <div className="bg-white p-2 rounded-lg mt-3 relative h-full overflow-y-auto no-scrollbar">
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
            {orders.map((order, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-2">
                  <span className="font-semibold">{order.stockTicker}</span>{" "}
                  <br />
                  {order.executionType}
                </td>
                <td className="p-2">
                  {formatCurrency(order.offerPrice)} <br />
                  {order.orderAmount}
                </td>
                <td className="p-2">
                  {formatCurrency(order.tradePrice)} <br />
                  {order.tradeQuantity}
                </td>
                <td className="p-2">
                  {order.tradeStatus == "SUCCESS" ? "체결" : "미체결"}
                  <br />
                  {order.unfilledQuantity}
                </td>
                <td className="p-2">{formatDateLong(order.tradeDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
