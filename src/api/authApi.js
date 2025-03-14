//로그인, 회원가입
import { Weight } from "lucide-react";
import api from "./axiosInstance";
import { toast } from "react-toastify";

const login = (userData) =>
  api.post(`auth/login`, userData, {
    isAuthRequired: false,
  });

const register = (userData) =>
  api.post(`auth/join`, userData, {
    isAuthRequired: false,
  });

const logout = (setIsLogin) => {
  sessionStorage.removeItem("accessToken");
  setIsLogin(false);
  toast.info("😀 로그아웃에 성공했습니다!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    style: {
      backgroundColor: "#54b0fe", // 원하는 배경색 (예: 초록색)
      color: "#eee", // 텍스트 색상
      fontWeight: "bold", // 글자 굵기
      fontSize: "14px", // 글자 크기
    },
  });
};

const checkAccountPassword = (pin) =>
  api.post(
    `account/verify-pin`,
    pin, // request body
    { isAuthRequired: true } // config (headers, params 등)
  );

export { login, register, logout, checkAccountPassword };
