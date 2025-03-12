//로그인, 회원가입
import api from "./axiosInstance";

const login = (userData) =>
  api.post("http://127.0.0.1:19092/v1/api/auth/login", userData, {
    isAuthRequired: false,
  });

const register = (userData) =>
  api.post("http://127.0.0.1:19092/v1/api/auth/join", userData, {
    isAuthRequired: false,
  });

const logout = (setIsLogin) => {
  sessionStorage.removeItem("accessToken");
  setIsLogin(false);
  alert("로그아웃 완료!");
};

export { login, register, logout };
