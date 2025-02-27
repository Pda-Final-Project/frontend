//종목 조회, 보유 종목 조회, 관심 종목 조회, 추가, 삭제
import api from "./axiosInstance";

const fetchStocks = (sortBy = "", searchParam = "") =>
  api.get("/stocks", {
    params: {
      sortBy,
      searchParam,
    },

    isAuthRequired: false,
  });

const fetchHoldingStocks = (sortBy = "") =>
  api.get("/stocks/holding", {
    params: { sortBy: sortBy },
    isAuthRequired: true,
  });

const fetchLikeStocks = () => api.get("/stocks/like", { isAuthRequired: true });
const removeLikeStock = (ticker) =>
  api.delete(`/stocks/like/${ticker}`, { isAuthRequired: true });
const addLikeStock = (ticker) =>
  api.post("/stocks/like", { ticker: ticker }, { isAuthRequired: true });

export {
  fetchStocks,
  fetchHoldingStocks,
  fetchLikeStocks,
  removeLikeStock,
  addLikeStock,
};
