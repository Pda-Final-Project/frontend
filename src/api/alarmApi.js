//알림 조회, 알림 on/off
import api from "./axiosInstance";

//알림 조회
const fetchAlarm = () =>
  api.get("http://172.16.1.230:19092/v1/api/notification", {
    isAuthRequired: true,
  });

//알림 켜고 끄기
const changeAlarmStatus = (enabled) =>
  api.patch(
    `http://172.16.1.230:19092/v1/api/notification/switch?enabled=${enabled}`,
    null, // body가 없는 경우 null 전달
    { isAuthRequired: true }
  );

export { fetchAlarm, changeAlarmStatus };
