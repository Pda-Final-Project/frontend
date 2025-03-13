//예수금, 해외 주식 잔고, 손익 내역 조회
import api from "./axiosInstance";

//예수금 조회
const fetchBalance = () =>
  api.get(`${import.meta.env.VITE_API_USER_URL}/account/balance`, {
    isAuthRequired: true,
    skipInterceptor: true,
  });

//사용 가능 예수금 조회
const fetchAvailBalance = () =>
  api.get(`${import.meta.env.VITE_API_USER_URL}/account/available-balance`, {
    isAuthRequired: true,
    skipInterceptor: true,
  });

//해외 주식 잔고 조회
const fetchTotalHoldings = () =>
  api.get(`${import.meta.env.VITE_API_USER_URL}/holdings/total/summary`, {
    isAuthRequired: true,
  });

//손익 내역 조회(list)
const fetchTradeProfitList = () =>
  api.get(`${import.meta.env.VITE_API_USER_URL}/tradeProfit/list`, {
    isAuthRequired: true,
  });

//손익 내역 조회(sum)
const fetchTradeProfitSum = () =>
  api.get(`${import.meta.env.VITE_API_USER_URL}/tradeProfit/sum`, {
    isAuthRequired: true,
  });

//보유 종목들 세부 데이터
const fetchHoldings = (sortBy) =>
  api.get(
    `${import.meta.env.VITE_API_USER_URL}/holdingStocks?sortBy=${sortBy}`,
    {
      isAuthRequired: true,
      skipInterceptor: true,
    }
  );

//주문 목록 리스트에 있는 체결 내역 조회
const fetchOrderTradeList = (filter) =>
  api.get(`execution/trades${filter}`, {
    isAuthRequired: true,
  });

//사용자 계좌 정보 조회
const fetchAccountInfo = () =>
  api.get(`${import.meta.env.VITE_API_USER_URL}/account/info`, {
    isAuthRequired: true,
  });

//사용자 예수금 세부 정보 조회
const fetchBalanceDetail = () =>
  api.get(`${import.meta.env.VITE_API_USER_URL}/balance/details`, {
    isAuthRequired: true,
  });
export {
  fetchAvailBalance,
  fetchBalance,
  fetchTotalHoldings,
  fetchTradeProfitList,
  fetchTradeProfitSum,
  fetchHoldings,
  fetchOrderTradeList,
  fetchAccountInfo,
  fetchBalanceDetail,
};
