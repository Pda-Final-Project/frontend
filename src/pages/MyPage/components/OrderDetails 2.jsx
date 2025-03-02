import React, { useState } from "react";

const DUMMY_ORDERS = [
  {
    date: "2025.02.28",
    ticker: "NVIDIA",
    orderType: "현금매수",
    orderPrice: "130.00",
    orderAmount: "40",
    executedPrice: "-",
    executedAmount: "-",
    unexecutedAmount: "40",
    status: "미체결",
    orderNumber: "232424",
  },
  {
    date: "2025.02.28",
    ticker: "NVIDIA",
    orderType: "현금매도",
    orderPrice: "134.00",
    orderAmount: "10",
    executedPrice: "134.00",
    executedAmount: "10",
    unexecutedAmount: "-",
    status: "체결 완료",
    orderNumber: "232423",
  }
];

export default function OrderDetails() {
  const [activeTab, setActiveTab] = useState("전체"); // 기본값: 전체

  // 필터링된 주문 데이터
  const filteredOrders = DUMMY_ORDERS.filter(order => {
    if (activeTab === "전체") return true;
    return order.status === activeTab;
  });

  return (
    <div className="bg-gray-light p-4 mt-2.5 rounded-xl">
     {/* 탭 메뉴 */}
     <div className="flex gap-1 text-[14px] ">
        {["전체", "체결 완료", "미체결"].map(tab => (
          <p
            key={tab}
            className={`cursor-pointer ${
              activeTab === tab ? "font-semibold min-w-12 text-center bg-blue-md px-2 py-1 text-white rounded" : "text-gray-500 min-w-12 text-center px-2 py-1"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "체결 완료" ? "체결" : tab} {/* UI에는 "체결"로 표시 */}
          </p>
        ))}
      </div>
      

      {/* 주문 내역 테이블 */}
      <div className="bg-white p-2 rounded-xl mt-3">
        <table className="w-full border-collapse text-center text-sm">
          <thead>
            <tr className="border-b border-blue-md font-semibold bg-white">
              <th className="p-2">종목명<br />매매구분</th>
              <th className="p-2">주문단가<br />주문수량</th>
              <th className="p-2">체결단가<br />체결수량</th>
              <th className="p-2">상태<br />미체결수량</th>
              <th className="p-2">주문번호<br />주문일자</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-2">
                  <span className="font-semibold">{order.ticker}</span> <br />
                  {order.orderType}
                </td>
                <td className="p-2">
                  {order.orderPrice} <br />
                  {order.orderAmount}
                </td>
                <td className="p-2">
                  {order.executedPrice} <br />
                  {order.executedAmount}
                </td>
                <td className="p-2">
                  {order.status}<br />
                  {order.unexecutedAmount} 
                </td>
                <td className="p-2">
                  {order.orderNumber} <br />
                  {order.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
