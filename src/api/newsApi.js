// 뉴스 조회
import api from "./axiosInstance";
const news =()=>{
    api.get("/news", { isAuthRequired: false });
};

export{ news };