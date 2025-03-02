import { create } from "zustand";
import {
  fetchLikeStocks,
  removeLikeStock,
  addLikeStock,
} from "../api/stockApi";

// Zustand 스토어 정의
export const useLikedStocksStore = create((set, get) => ({
  likedStocks: [], // ✅ Set 대신 Array 사용

  // ✅ API에서 좋아요 리스트 불러오기
  fetchLikedStocks: async () => {
    try {
      const response = await fetchLikeStocks();
      console.log("Fetched liked stocks:", response.data);

      if (
        response?.data?.status === "OK" &&
        Array.isArray(response.data.data)
      ) {
        set({ likedStocks: response.data.data }); // ✅ Array로 저장
      } else {
        console.warn("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("좋아요 리스트 불러오기 실패:", error);
    }
  },

  // ✅ 좋아요 토글 (추가/삭제)
  toggleLike: async (ticker) => {
    const currentLikedStocks = get().likedStocks;
    const isLiked = currentLikedStocks.includes(ticker);
    const newLikedStocks = isLiked
      ? currentLikedStocks.filter((stock) => stock !== ticker)
      : [...currentLikedStocks, ticker];

    set({ likedStocks: newLikedStocks });

    try {
      if (isLiked) {
        await removeLikeStock(ticker);
      } else {
        await addLikeStock(ticker);
      }
    } catch (error) {
      console.error("좋아요 변경 실패:", error);
      alert("좋아요 변경에 실패했습니다. 다시 시도해주세요.");

      // ✅ API 실패 시 상태 롤백
      set({ likedStocks: currentLikedStocks });
    }
  },
}));
