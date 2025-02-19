import React, { useState } from "react";
import CheckModal from "../common/CheckModal";

const percents = [
  { id: 0.1, name: "10%" },
  { id: 0.25, name: "25%" },
  { id: 0.5, name: "50%" },
  { id: 0.75, name: "75%" },
  { id: 1, name: "전량" },
];

// 소수점 판매하기
export default function SellBox({ currentPrice, maxQuantity, orderStock }) {
  const [sellQuantity, setSellQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const minUnit = 1;

  const checkSellQuantity = (tmpQuantity) => {
    let quantity = parseFloat(tmpQuantity) || 0;
    quantity = Math.floor(quantity * 10 ** 5) / 10 ** 5; // 소수점 5자리까지 제한

    if (quantity >= 0 && quantity <= maxQuantity) {
      setSellQuantity(quantity);
    }
  };

  const totalOrderPrice = Math.floor(currentPrice * sellQuantity);

  return (
    <div className="p-4">
      <CheckModal
        isOpen={isModalOpen}
        setOpen={setIsModalOpen}
        action={() => orderStock("sell", sellQuantity, totalOrderPrice)} // action을 함수로 수정
        title="판매 확인"
        message={`총 가격: ${totalOrderPrice} / 수량: ${sellQuantity} 판매하시겠습니까?`}
      />
      <div>소수점 판매하기</div>
      <div>
        <button onClick={() => checkSellQuantity(sellQuantity - minUnit)}>
          -
        </button>
        <input
          type="number"
          onChange={(e) => checkSellQuantity(e.target.value)}
          value={sellQuantity}
          step={minUnit}
        />
        <span>주</span>
        <button onClick={() => checkSellQuantity(sellQuantity + minUnit)}>
          +
        </button>
      </div>
      <div>
        {percents.map((el) => (
          <button
            key={el.id}
            onClick={() => checkSellQuantity(maxQuantity * el.id)}
          >
            {el.name}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <div>판매 가능</div>
        <div>{maxQuantity}주</div>
      </div>
      <div className="flex gap-4">
        <div>예상 최종 주문 금액</div>
        <div>{totalOrderPrice}원</div>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={sellQuantity <= 0}
        className="bg-gray-200 w-full"
      >
        판매하기
      </button>
    </div>
  );
}
