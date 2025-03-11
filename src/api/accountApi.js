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

//해외 주식 잔고 조회
const fetchTotalHoldings = () =>
  api.get("http://127.0.0.1:19092/v1/api/holdings/total/summary", {
    isAuthRequired: true,
  });

//손익 내역 조회(list)
const fetchTradeProfitList = () =>
  api.get("http://127.0.0.1:19092/v1/api/tradeProfit/list", {
    isAuthRequired: true,
  });

//손익 내역 조회(sum)
const fetchTradeProfitSum = () =>
  api.get("http://127.0.0.1:19092/v1/api/tradeProfit/sum", {
    isAuthRequired: true,
  });

//보유 종목들 세부 데이터
const fetchHoldings = (sortBy) =>
  api.get(`http://127.0.0.1:19092/v1/api/stocks?sortBy=${sortBy}`, {
    isAuthRequired: true,
  });

//주문 목록 리스트에 있는 체결 내역 조회
const fetchOrderTradeList = (filter) =>
  api.get(`http://127.0.0.1:19095/v1/api/execution/trades${filter}`, {
    isAuthRequired: true,
  });

//사용자 계좌 정보 조회
const fetchAccountInfo = () =>
  api.get("http://127.0.0.1:19092/v1/api/account/info", {
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
};
