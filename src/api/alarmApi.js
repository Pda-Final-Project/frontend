//알림 조회, 알림 on/off
import api from "./axiosInstance";

//알림 조회
const fetchAlarm = () =>
  api.get("http://172.16.1.230:19092/v1/api/notification", {
    isAuthRequired: true,
    skipInterceptor: true,
  });

//알림 켜고 끄기
const changeAlarmStatus = (enabled) =>
  api.patch(
    `http://172.16.1.230:19092/v1/api/notification/switch?enabled=${enabled}`,
    null,
    { isAuthRequired: true, skipInterceptor: true }
  );

export { fetchAlarm, changeAlarmStatus };
