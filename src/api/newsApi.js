import api from "./axiosInstance";

const news = async () =>
  await api.get("http://127.0.0.1:19099/v1/api/news", {
    isAuthRequired: false,
  });

export { news };
