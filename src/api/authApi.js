//로그인, 회원가입
import api from "./axiosInstance";

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
  // toast("😀 로그아웃에 성공했습니다!", {
  //   position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: false,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: "light",
  //   transition: Bounce,
  // });
  alert("로그아웃 완료!");
};

const checkAccountPassword = (pin) =>
  api.post(
    `account/verify-pin`,
    pin, // request body
    { isAuthRequired: true } // config (headers, params 등)
  );

export { login, register, logout, checkAccountPassword };
