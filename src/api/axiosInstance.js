import axios from "axios";

const api = axios.create({
  baseURL: "",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// 요청 인터셉터 - isAuthRequired 플래그 기반 인증 처리
api.interceptors.request.use((config) => {
  if (config.isAuthRequired) {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // 토큰이 없으면 적절한 처리
      console.log("토큰이 없습니다.");
    }
  }

  return config;
});

export default api;
