//로그인, 회원가입
import api from "./axiosInstance";
const login = (phoneNumber, password) =>
  api.post("/auth/login", { phoneNumber, password }, { isAuthRequired: false });
const register = (userData) =>
  api.post("/auth/join", userData, { isAuthRequired: false });
const logout = () => {
  sessionStorage.removeItem("accessToken");
  console.log("로그아웃 완료!");
};

export { login, register, logout };
