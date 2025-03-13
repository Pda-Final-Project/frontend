import { create } from "zustand";
import {
  fetchLikeStocks,
  removeLikeStock,
  addLikeStock,
} from "../api/stockApi";

// Zustand 스토어 정의
export const useLikedStocksStore = create((set, get) => ({
  likedStocks: [],
  fetchLikedStocks: async () => {
    try {
      const response = await fetchLikeStocks();

      if (
        response?.data?.status === "OK" &&
        Array.isArray(response.data.data)
      ) {
        const formattedData = response.data.data.map((stock) => stock.ticker);
        set({ likedStocks: formattedData });
      } else {
        console.warn("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("좋아요 리스트 불러오기 실패:", error);
    }
  },
  toggleLike: async (ticker) => {
    const currentLikedStocks = get().likedStocks;
    const isLiked = currentLikedStocks.some((stock) => stock === ticker);

    let newLikedStocks;
    if (isLiked) {
      // ✅ 기존 배열에서 선택한 주식 제거
      newLikedStocks = currentLikedStocks.filter((stock) => stock !== ticker);
    } else {
      // ✅ 새로운 주식을 기존 객체 구조에 맞게 추가
      newLikedStocks = [...currentLikedStocks, ticker];
    }

    set({ likedStocks: newLikedStocks });

    try {
      console.log(ticker);
      if (isLiked) {
        await removeLikeStock(ticker);
      } else {
        await addLikeStock(ticker);
      }
    } catch (error) {
      console.error("좋아요 변경 실패:", error);
      alert("좋아요 변경에 실패했습니다. 다시 시도해주세요.");
      set({ likedStocks: currentLikedStocks }); // ✅ 롤백 처리
    }
  },
}));
