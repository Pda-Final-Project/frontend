import React from "react";
import { FaHeart } from "react-icons/fa";
import { useLikedStocksStore } from "../../hooks/useLikedStocksStore";

export default function LikeButton({ ticker }) {
  const { likedStocks, toggleLike } = useLikedStocksStore();
  const isLiked = likedStocks?.some((stock) => stock === ticker);

  const handleClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링을 막아 페이지 이동 방지
    toggleLike(ticker);
  };

  return (
    <div
      className={`${
        isLiked ? "text-red-500" : "text-gray-md"
      } text-lg cursor-pointer`}
      onClick={handleClick}
    >
      <FaHeart />
    </div>
  );
}
