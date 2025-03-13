//종목 조회, 보유 종목 조회, 관심 종목 조회, 추가, 삭제
import api from "./axiosInstance";

//종목 조회
const fetchStocks = (sortBy = "", searchParam = "") =>
  api.get("stocks", {
    params: {
      sortBy,
      searchParam,
    },

    isAuthRequired: false,
  });

//특정 종목에 대한 주수 조회
const fetchHoldingStocks = (ticker) =>
  api.get(`stocks/holdingStocks/${ticker}`, {
    isAuthRequired: true,
    skipInterceptor: true,
  });

//특정 종목에 대한 사용가능 주수 조회
const fetchAvailQuantityByStock = (ticker) =>
  api.get(`/holdingStocks/available-stocks/${ticker}`, {
    isAuthRequired: true,
    skipInterceptor: true,
  });

//차트 조회
const fetchChart = (params) =>
  api.get("chart", {
    params: params, // 빈 값 필터링하여 전달
    isAuthRequired: false,
  });

//관심 종목 조회, 추가, 삭제
const fetchLikeStocks = () =>
  api.get(`pinnedStocks/like`, {
    isAuthRequired: true,
    skipInterceptor: true,
  });
const removeLikeStock = (ticker) =>
  api.delete(`pinnedStocks/like/${ticker}`, {
    isAuthRequired: true,
  });
const addLikeStock = (ticker) =>
  api.post(
    `pinnedStocks/like`,
    { stockTicker: ticker },
    { isAuthRequired: true }
  );

export {
  fetchStocks,
  fetchHoldingStocks,
  fetchLikeStocks,
  removeLikeStock,
  addLikeStock,
  fetchAvailQuantityByStock,
  fetchChart,
};
