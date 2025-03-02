//종목 조회, 보유 종목 조회, 관심 종목 조회, 추가, 삭제
import api from "./axiosInstance";

const fetchStocks = (sortBy = "", searchParam = "") =>
  api.get("http://127.0.0.1:19099/v1/api/stocks", {
    params: {
      sortBy,
      searchParam,
    },

    isAuthRequired: false,
  });

const fetchHoldingStocks = (sortBy = "") =>
  api.get("http://127.0.0.1:19092/v1/api/stocks/holding", {
    params: { sortBy: sortBy },
    isAuthRequired: true,
  });

const fetchLikeStocks = () =>
  api.get("http://127.0.0.1:19092/v1/api/stocks/like", {
    isAuthRequired: true,
  });
const removeLikeStock = (ticker) =>
  api.delete(`http://127.0.0.1:19092/v1/api/stocks/like/${ticker}`, {
    isAuthRequired: true,
  });
const addLikeStock = (ticker) =>
  api.post(
    "http://127.0.0.1:19092/v1/api/stocks/like",
    { StockTicker: ticker },
    { isAuthRequired: true }
  );

export {
  fetchStocks,
  fetchHoldingStocks,
  fetchLikeStocks,
  removeLikeStock,
  addLikeStock,
};
