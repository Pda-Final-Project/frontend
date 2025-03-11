import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { removeLikeStock, addLikeStock } from "../../api/stockApi";

export default function LikeButton({ ticker, initState }) {
  const [isLiked, setIsLiked] = useState(initState);
  const changeLikeState = () => {
    if (isLiked) {
      //관심 종목에서 삭제
      //   tryRemoveLikeStock();
    } else {
      //관심 종목에 추가
      //   tryAddLikeStock();
    }
    setIsLiked(!isLiked);
  };

  const tryAddLikeStock = async () => {
    //추후 수정
    try {
      const response = await addLikeStock(ticker);
      if (response.data.status === "CREATED") {
        console.log(response.data.message);
      } else {
        console.log("Failed!!", response.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const tryRemoveLikeStock = async () => {
    try {
      const response = await removeLikeStock(ticker);
      if (response.data.status === "CREATED") {
        console.log(response.data.message);
      } else {
        console.log("Failed!!", response.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div
      className={`${isLiked ? "text-red-md" : "text-gray-md"} text-lg`}
      onClick={() => {
        changeLikeState();
      }}
    >
      <FaHeart />
    </div>
  );
}
