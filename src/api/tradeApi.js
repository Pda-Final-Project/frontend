//매수/매도, 주문 취소, 주문 정정
import api from "./axiosInstance";

const postOrder = (orderData) =>
  api.post("http://172.16.1.230:19093/v1/api/order/create", orderData, {
    isAuthRequired: true,
  });

const fetchInitMarketPrice = (ticker) =>
  api.get(`http://172.16.1.230:19095/v1/api/trades/latest?symbol=${ticker}`, {
    isAuthRequired: false,
  });

export { postOrder, fetchInitMarketPrice };
