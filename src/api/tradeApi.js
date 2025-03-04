//매수/매도, 주문 취소, 주문 정정
import api from "./axiosInstance";

const postOrder = (orderData) =>
  api.post("http://127.0.0.1:19093/v1/api/order/create", orderData, {
    isAuthRequired: true,
  });

export { postOrder };
