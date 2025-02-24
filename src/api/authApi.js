//로그인, 회원가입
import api from "./axiosInstance";
const login = (userData) =>
  api.post("/auth/login", userData, { isAuthRequired: false });
const register = (userData) =>
  api.post("/auth/join", userData, { isAuthRequired: false });
const logout = () => {
  sessionStorage.removeItem("accessToken");
  console.log("로그아웃 완료!");
};

export { login, register, logout };
