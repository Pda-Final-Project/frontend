import React from "react";
import { timeAgo } from "../../utils/timeAgo";

const AlarmModal = ({ alarms = [], onClose }) => { // 기본값 추가
  return (
    <div className="fixed top-0 right-0 m-4 w-96 bg-white shadow-lg rounded-lg border p-4">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <h2 className="text-lg font-semibold">알림</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">✕</button>
      </div>
      <div className="space-y-4">
        {alarms.length > 0 ? (
          alarms.map((alarm, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg">
              {alarm.type === "trade" ? (
                <div>
                  <p className="font-bold">[해외주식 매수 주문 체결]</p>
                  <p className="text-gray-700 text-sm">{timeAgo(alarm.time)} 전</p>
                  <p>종목명 <span className="font-semibold">{alarm.stockName}</span></p>
                  <p>주문 수량 <span className="font-semibold">{alarm.orderQty}주</span></p>
                  <p>체결 수량 <span className="font-semibold">{alarm.filledQty}주</span></p>
                  <p>체결 가격 <span className="font-semibold">{alarm.price.toFixed(3)} USD</span></p>
                </div>
              ) : (
                <div>
                  <p className="font-bold">New 공시 알림</p>
                  <p className="text-gray-700 text-sm">{timeAgo(alarm.time)} 전</p>
                  <p>{alarm.message}</p>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">공시 보러가기</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">알림이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default AlarmModal;
