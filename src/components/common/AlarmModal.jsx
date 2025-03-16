import React, { useEffect, useState } from "react";
import { fetchAlarm } from "../../api/alarmApi";
import { timeAgo } from "../../utils/timeAgo";

const AlarmModal = ({ onClose }) => {
  const [alarms, setAlarms] = useState([]);

  const tryFetchAlarm = async () => {
    try {
      const response = await fetchAlarm();
      const parsedAlarms = response.data.map((alarm) => ({
        title: alarm.data.event.title,
        stockTicker: alarm.data.event.stockTicker,
        orderQuantity: alarm.data.event.orderQuantity,
        tradeQuantity: alarm.data.event.tradeQuantity,
        tradePrice: alarm.data.event.tradePrice,
        timestamp: alarm.data.timestamp, // 밀리초 단위의 시간 정보 유지
      }));
      //최신 순 정렬
      parsedAlarms.sort((a, b) => b.timestamp - a.timestamp);
      setAlarms(parsedAlarms);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    tryFetchAlarm();
  }, []);
  return (
    <div className="absolute top-12 right-0 m-4 w-96 bg-white shadow-lg rounded-lg p-3 z-100">
      {/* 알람 모달 헤더 */}
      <div className="flex justify-between items-center pb-2 mb-2">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold p-3">알림</h2>
        </div>
        <button
          onClick={onClose}
          className="text-sm font-bold text-blue-600 hover:text-gray-500 duration-300 p-3"
        >
          ✕
        </button>
      </div>

      {/* 알람 모달 바디 */}
      <div className="space-y-4 h-full max-h-[300px] overflow-auto no-scrollbar text-[14px]">
        {alarms !== null ? (
          alarms?.map((alarm, index) => (
            <div
              key={index}
              className="bg-blue-50 p-4 rounded-lg flex flex-col"
            >
              <div className="flex justify-between">
                <p className="font-bold mb-2">{alarm.title}</p>
                <div className="text-gray-dark">{timeAgo(alarm.timestamp)}</div>
              </div>

              <div className="grid grid-cols-2">
                <p>
                  종목명:{" "}
                  <span className="font-semibold">{alarm.stockTicker}</span>
                </p>
                <p>
                  주문 수량:{" "}
                  <span className="font-semibold">{alarm.orderQuantity}주</span>
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p>
                  체결 수량:{" "}
                  <span className="font-semibold">{alarm.tradeQuantity}주</span>
                </p>
                <p>
                  체결 가격:{" "}
                  <span className="font-semibold">
                    {alarm.tradePrice?.toFixed()}원
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 p-3">새로운 알림이 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default AlarmModal;
