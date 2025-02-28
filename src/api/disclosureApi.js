//공시 리스트 조회, 번역, 요약 조회
import api from "./axiosInstance";

const fetchFillingInfo = (filling_id) =>
  api.get(`http://127.0.0.1:19098/v1/api/fillings/${filling_id}`, {
    isAuthRequired: false,
  });

const fetchFillings = (params) =>
  api.get("http://localhost:19098/v1/api/fillings", {
    params: params, // 빈 값 필터링하여 전달
    isAuthRequired: false,
    validateStatus: (status) => status >= 200 && status < 400,
  });

export { fetchFillingInfo, fetchFillings };
