import api from "./axiosInstance";

const news = async () => await api.get("/news", { isAuthRequired: false });

export { news };
