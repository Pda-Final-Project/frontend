import React, { useEffect, useState } from "react";
import { timeAgo } from "../../utils/timeAgo";
import { changeAlarmStatus, fetchAlarm } from "../../api/alarmApi";

const AlarmModal = ({ onClose }) => {
  const [alarms, setAlarms] = useState([]);
  const [isAlarmOn, setIsAlarmOn] = useState(true);

  const tryChangeAlarmStatus = async () => {
    try {
      const response = await changeAlarmStatus(!isAlarmOn);
      if (response.data.status === "OK") {
        setIsAlarmOn(!isAlarmOn);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const tryFetchAlarm = async () => {
    try {
      const response = await fetchAlarm();
      const parsedAlarms = response.data.map((alarm) => ({
        ...JSON.parse(alarm.data),
      }));
      setAlarms(parsedAlarms);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    tryFetchAlarm();
  }, []);

  return (
    <div className="fixed top-12 right-0 m-4 w-96 bg-white shadow-lg rounded-lg p-3">
      {/* 알람 모달 헤더 */}
      <div className="flex justify-between items-center pb-2 mb-2">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold p-3">알림</h2>
          {/* 알림 상태 toggle 버튼 */}
          <div
            onClick={tryChangeAlarmStatus}
            className={`relative w-12 h-6 flex items-center px-1 rounded-full cursor-pointer transition-all duration-300 ${
              isAlarmOn ? "bg-blue-md" : "bg-gray-md"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
                isAlarmOn ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
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
        {alarms.length > 0 ? (
          alarms.map((alarm, index) => (
            <div
              key={index}
              className="bg-blue-50 p-4 rounded-lg flex flex-col"
            >
              <p className="font-bold mb-2">{alarm.title}</p>

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
                    {alarm.tradePrice.toFixed()}원
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
