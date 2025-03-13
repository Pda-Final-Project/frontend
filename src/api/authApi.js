//로그인, 회원가입
import api from "./axiosInstance";
import { toast } from "react-toastify";

const login = (userData) =>
  api.post(`${import.meta.env.VITE_API_USER_URL}/auth/login`, userData, {
    isAuthRequired: false,
  });

const register = (userData) =>
  api.post(`${import.meta.env.VITE_API_USER_URL}/auth/join`, userData, {
    isAuthRequired: false,
  });

const logout = (setIsLogin) => {
  sessionStorage.removeItem("accessToken");
  setIsLogin(false);
  toast("😀 로그아웃에 성공했습니다!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const checkAccountPassword = (pin) =>
  api.post(
    `${import.meta.env.VITE_API_USER_URL}/account/verify-pin`,
    pin, // request body
    { isAuthRequired: true } // config (headers, params 등)
  );

export { login, register, logout, checkAccountPassword };
