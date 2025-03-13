//매수/매도, 주문 취소, 주문 정정
import api from "./axiosInstance";

const postOrder = (orderData) =>
  api.post("order/create", orderData, {
    isAuthRequired: true,
  });

const fetchInitMarketPrice = (ticker) =>
  api.get(`trades/latest?symbol=${ticker}`, {
    isAuthRequired: false,
  });

export { postOrder, fetchInitMarketPrice };
