import React from "react";
import { FaHeart } from "react-icons/fa";
import { useLikedStocksStore } from "../../hooks/useLikedStocksStore";

export default function LikeButton({ ticker }) {
  const { likedStocks, toggleLike } = useLikedStocksStore();
  const isLiked = likedStocks?.some((stock) => stock === ticker);
  return (
    <div
      className={`${
        isLiked ? "text-red-500" : "text-gray-md"
      } text-lg cursor-pointer`}
      onClick={() => toggleLike(ticker)}
    >
      <FaHeart />
    </div>
  );
}
