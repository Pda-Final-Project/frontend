import api from "./axiosInstance";

const news = async () => {
    return await api.get("/news", { isAuthRequired: false });
};

export { news };
