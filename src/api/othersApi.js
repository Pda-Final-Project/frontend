import api from "./axiosInstance";

const news = async () =>
  await api.get("http://127.0.0.1:19099/v1/api/news", {
    isAuthRequired: false,
  });

const fetchEarning = async (ticker) =>
  await api.get(`http://127.0.0.1:19099/v1/api/earnings/${ticker}`, {
    isAuthRequired: false,
  });

const fetchExchangeRate = async () =>
  await api.get("환율 조회 api", { isAuthRequired: false });

export { news, fetchEarning, fetchExchangeRate };
