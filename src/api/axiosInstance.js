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
      console.log("토큰이 없습니다.");
    }
  }

  return config;
});

// 응답 인터셉터 - 403 에러 처리
api.interceptors.response.use(
  (response) => response, // 성공 시 응답 반환
  (error) => {
    const { config } = error;

    // 특정 API 요청에서 응답 인터셉터를 건너뛰도록 설정
    if (config && config.skipInterceptor) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 403) {
      alert("로그인 후 이용해주세요");
    }
    return Promise.reject(error);
  }
);

export default api;
