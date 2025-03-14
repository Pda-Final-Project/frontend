import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "/api", // 빈 문자열로 설정, 프록시 설정 사용
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
      toast.error("😣 로그인 후 시도해주세요.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          color: "#eee", // 텍스트 색상
          fontWeight: "bold", // 글자 굵기
          fontSize: "14px", // 글자 크기
        },
      });
    }
    return Promise.reject(error);
  }
);

export default api;
