//매수/매도, 주문 취소, 주문 정정
import api from "./axiosInstance";

const removeOrder = (orderId) =>
  api.delete(`/order/${orderId}`, { isAuthRequired: true });
const updateOrder = (orderId, orderData) =>
  api.put(`/order/${orderId}`, orderData, { isAuthRequired: true });
const addOrder = (orderData) =>
  api.post("/order", { orderData }, { isAuthRequired: true });

export { removeOrder, updateOrder, addOrder };
