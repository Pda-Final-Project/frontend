import React, { useState } from "react";
import CheckModal from "../common/CheckModal";

const moneys = [
  { id: 1000, name: "+천원" },
  { id: 10000, name: "+1만원" },
  { id: 50000, name: "+5만원" },
  { id: 100000, name: "+10만원" },
  { id: 1000000, name: "+100만원" },
];

// 가격 기준 주식 구매
export default function BuyBox({ currentPrice, withHolding, orderStock }) {
  const [buyPrice, setBuyPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const minUnit = 1;

  const checkBuyPrice = (tmpPrice) => {
    let price = parseFloat(tmpPrice) || 0;
    price = Math.floor(price);
    price = Math.min(Math.max(price, 0), withHolding);
    setBuyPrice(price);
  };

  const totalOrderQuantity = parseFloat((buyPrice / currentPrice).toFixed(5));

  return (
    <div className="p-4">
      <CheckModal
        isOpen={isModalOpen}
        setOpen={setIsModalOpen}
        action={() => orderStock("buy", totalOrderQuantity, buyPrice)} // action을 함수로 수정
        title="투자 확인"
        message={`총 가격: ${buyPrice} / 수량: ${totalOrderQuantity} 투자하시겠습니까?`}
      />
      <div>소수점 투자하기</div>
      <div>
        <button onClick={() => checkBuyPrice(buyPrice - minUnit)}>-</button>
        <input
          type="number"
          onChange={(e) => checkBuyPrice(e.target.value)}
          value={buyPrice}
          step={minUnit}
        />
        <span>원</span>
        <button onClick={() => checkBuyPrice(buyPrice + minUnit)}>+</button>
      </div>
      <div>
        {moneys.map((el) => (
          <button key={el.id} onClick={() => checkBuyPrice(buyPrice + el.id)}>
            {el.name}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        <div>투자 가능</div>
        <div>{withHolding}원</div>
      </div>
      <div className="flex gap-4">
        <div>예상 최종 주식 수</div>
        <div>{totalOrderQuantity}주</div>
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={buyPrice <= 0}
        className="bg-gray-200 w-full"
      >
        투자하기
      </button>
    </div>
  );
}
