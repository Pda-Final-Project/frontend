import api from "./axiosInstance";

const news = async () =>
  await api.get("http://172.16.1.230:19099/v1/api/news", {
    isAuthRequired: false,
  });

const fetchEarning = async (ticker) =>
  await api.get(`http://172.16.1.230:19099/v1/api/earnings/${ticker}`, {
    isAuthRequired: false,
  });

//환율 조회
const fetchExchangeRate = () =>
  api.get(`http://172.16.1.230:19099/v1/api/exchange-rate/AAPL`);

export { news, fetchEarning, fetchExchangeRate };
