//종목 조회, 보유 종목 조회, 관심 종목 조회, 추가, 삭제
import api from "./axiosInstance";

//종목 조회
const fetchStocks = (sortBy = "", searchParam = "") =>
  api.get("http://172.16.1.230:19099/v1/api/stocks", {
    params: {
      sortBy,
      searchParam,
    },

    isAuthRequired: false,
  });

//특정 종목에 대한 주수 조회
const fetchHoldingStocks = (ticker) =>
  api.get(`http://172.16.1.230:19092/v1/api/stocks/holdings/${ticker}`, {
    isAuthRequired: true,
  });

//특정 종목에 대한 사용가능 주수 조회
const fetchAvailQuantityByStock = (ticker) =>
  api.get(
    `http://172.16.1.230:19092/v1/api/stocks/available-stocks/${ticker}`,
    {
      isAuthRequired: true,
    }
  );

//차트 조회
const fetchChart = (params) =>
  api.get("http://172.16.1.230:19099/v1/api/chart", {
    params: params, // 빈 값 필터링하여 전달
    isAuthRequired: false,
  });

//관심 종목 조회, 추가, 삭제
const fetchLikeStocks = () =>
  api.get("http://172.16.1.230:19092/v1/api/pinnedStocks/like", {
    isAuthRequired: true,
  });
const removeLikeStock = (ticker) =>
  api.delete(`http://172.16.1.230:19092/v1/api/pinnedStocks/like/${ticker}`, {
    isAuthRequired: true,
  });
const addLikeStock = (ticker) =>
  api.post(
    "http://172.16.1.230:19092/v1/api/pinnedStocks/like",
    { ticker: ticker },
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
