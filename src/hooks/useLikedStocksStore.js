import { create } from "zustand";
import {
  fetchLikeStocks,
  removeLikeStock,
  addLikeStock,
} from "../api/stockApi";

// Zustand 스토어 정의
export const useLikedStocksStore = create((set, get) => ({
  likedStocks: new Set(), // 좋아요한 종목을 Set으로 저장

  // ✅ API에서 좋아요 리스트 불러오기
  fetchLikedStocks: async () => {
    try {
      const response = await fetchLikeStocks();
      if (response.data.status === "OK") {
        set({ likedStocks: new Set(response.data.data) });
      }
    } catch (error) {
      console.error("좋아요 리스트 불러오기 실패:", error);
    }
  },

  // ✅ 좋아요 토글 (추가/삭제)
  toggleLike: async (ticker) => {
    // 현재 상태 가져오기
    const currentLikedStocks = get().likedStocks;
    const newLikedStocks = new Set(currentLikedStocks);
    const isLiked = newLikedStocks.has(ticker);

    // UI 즉시 반영
    if (isLiked) {
      newLikedStocks.delete(ticker);
    } else {
      newLikedStocks.add(ticker);
    }

    set({ likedStocks: newLikedStocks });

    try {
      if (isLiked) {
        await removeLikeStock(ticker);
      } else {
        await addLikeStock(ticker);
      }
    } catch (error) {
      console.error("좋아요 변경 실패:", error);

      // API 실패하면 상태 롤백
      set({ likedStocks: currentLikedStocks });
    }
  },
}));
