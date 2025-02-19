import React, { useState } from "react";

const percents = [
  { id: 0.1, name: "10%" },
  { id: 0.25, name: "25%" },
  { id: 0.5, name: "50%" },
  { id: 0.75, name: "75%" },
  { id: 1, name: "전량" },
];

// 소수점 판매하기
export default function SellBox({ currentPrice, withHolding, orderStock }) {
  const [sellQuantity, setSellQuantity] = useState(0);
  const minUnit = 1; // 최소 단위 설정
  const maxQuantity =
    Math.floor((withHolding / currentPrice) * 10 ** 5) / 10 ** 5;

  const checkSellQuantity = (tmpQuantity) => {
    let quantity = parseFloat(tmpQuantity) || 0; // NaN 방지
    quantity = Math.floor(quantity * 10 ** 5) / 10 ** 5; // 소수점 5자리까지 제한

    if (quantity >= 0 && quantity <= maxQuantity) {
      setSellQuantity(quantity);
    }
  };

  // 🔥 최종 주문 금액 (소수점 2자리까지 유지)
  const totalOrderPrice = Math.floor(currentPrice * sellQuantity * 100) / 100;

  return (
    <div>
      <div>소수점 판매하기</div>
      <div>
        <button onClick={() => checkSellQuantity(sellQuantity - minUnit)}>
          -
        </button>
        <input
          type="number"
          onChange={(e) => checkSellQuantity(e.target.value)}
          value={sellQuantity}
          step={minUnit} // 소수점 5자리 단위로 입력 가능
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
      <div>
        <div>판매 가능</div>
        <div>{maxQuantity}주</div>
      </div>
      <div>
        <div>예상 최종 주문 금액</div>
        <div>{totalOrderPrice}원</div>
      </div>
      <button
        onClick={() => orderStock("sell", sellQuantity, totalOrderPrice)}
        disabled={sellQuantity <= 0}
      >
        판매하기
      </button>
    </div>
  );
}
