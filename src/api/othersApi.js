import api from "./axiosInstance";

const news = async () =>
  await api.get("news", {
    isAuthRequired: false,
  });

const fetchEarning = async (ticker) =>
  await api.get(`earnings/${ticker}`, {
    isAuthRequired: false,
  });

//환율 조회
const fetchExchangeRate = () =>
  api.get(`${import.meta.env.VITE_API_DATA_URL}/exchange-rate/TSLA`, {
    isAuthRequired: false,
  });

export { news, fetchEarning, fetchExchangeRate };
