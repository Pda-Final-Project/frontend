//알림 조회, 알림 on/off
import api from "./axiosInstance";

//알림 조회
const fetchAlarm = () =>
  api.get(`${import.meta.env.VITE_API_USER_URL}/notification`, {
    isAuthRequired: true,
    skipInterceptor: true,
  });

export { fetchAlarm };
