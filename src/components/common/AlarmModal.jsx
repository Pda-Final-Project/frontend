import React, { useEffect, useState, Component } from "react";
import { timeAgo } from "../../utils/timeAgo";
import { changeAlarmStatus, fetchAlarm } from "../../api/alarmApi";
import Switch from "react-switch";

const AlarmModal = ({ onClose }) => {
  const [alarms, setAlarms] = useState([]);
  const [isAlarmOn, setIsAlarmOn] = useState(true);

  const tryChangeAlarmStatus = async () => {
    try {
      const response = await changeAlarmStatus(!isAlarmOn); // 상태를 반전시켜 보내기
      if (response.data.status === "OK") {
        setIsAlarmOn(!isAlarmOn); // 상태를 반전시켜 설정
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const tryFetchAlarm = async () => {
    try {
      const response = await fetchAlarm();
      if (response.data.status == "OK") {
        setAlarms(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    tryFetchAlarm();
  }, []);

  return (
    <div className="fixed top-12 right-0 m-4 w-92 bg-white shadow-lg rounded-lg p-3">
      {/** 알람 모달 헤더 */}
      <div className="flex justify-between items-center pb-2 mb-2">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold p-3">알림</h2>
          {/* 알림 상태 toggle 버튼 추가 */}
          <label>
            <Switch
              onChange={() => tryChangeAlarmStatus()}
              checked={isAlarmOn}
              onColor="#e5f3ff"
              onHandleColor="#54b0fe"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={40}
            />
          </label>
        </div>

        <button
          onClick={onClose}
          className="text-sm font-bold text-blue-md hover:text-gray-500 duration-300 p-3"
        >
          ✕
        </button>
      </div>
      {/** 알람 모달 바디 */}
      <div className="space-y-4">
        {alarms.length > 0 ? (
          alarms.map((alarm, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg">
              {alarm.type === "trade" ? (
                <div>
                  <p className="font-bold">[해외주식 매수 주문 체결]</p>
                  <p className="text-gray-700 text-sm">
                    {timeAgo(alarm.time)} 전
                  </p>
                  <p>
                    종목명{" "}
                    <span className="font-semibold">{alarm.stockName}</span>
                  </p>
                  <p>
                    주문 수량{" "}
                    <span className="font-semibold">{alarm.orderQty}주</span>
                  </p>
                  <p>
                    체결 수량{" "}
                    <span className="font-semibold">{alarm.filledQty}주</span>
                  </p>
                  <p>
                    체결 가격{" "}
                    <span className="font-semibold">
                      {alarm.price.toFixed(3)} USD
                    </span>
                  </p>
                </div>
              ) : (
                <div>
                  <p className="font-bold">New 공시 알림</p>
                  <p className="text-gray-700 text-sm">
                    {timeAgo(alarm.time)} 전
                  </p>
                  <p>{alarm.message}</p>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                    공시 보러가기
                  </button>
                </div>
              )}
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
