//예수금, 해외 주식 잔고, 손익 내역 조회
import api from "./axiosInstance";

//예수금 조회
const fetchBalance = () =>
  api.get("http://127.0.0.1:19092/v1/api/account/balance", {
    isAuthRequired: true,
  });

//사용 가능 예수금 조회
const fetchAvailBalance = () =>
  api.get("http://127.0.0.1:19092/v1/api/account/available-balance", {
    isAuthRequired: true,
  });

export { fetchAvailBalance, fetchBalance };
