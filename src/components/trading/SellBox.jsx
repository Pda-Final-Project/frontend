import React, { useState } from "react";

const percents = [
  { id: 0.1, name: "10%" },
  { id: 0.25, name: "25%" },
  { id: 0.5, name: "50%" },
  { id: 0.75, name: "75%" },
  { id: 1, name: "전량" },
];

export default function SellBox({ maxQuantity, orderStock }) {
  const [sellQuantity, setSellQuantity] = useState();
  const [sellPrice, setSellPrice] = useState();

  const checkSellQuantity = (tmpQuantity) => {
    let quantity = parseFloat(tmpQuantity) || 0;
    quantity = Math.floor(quantity);

    if (quantity >= 0 && quantity <= maxQuantity) {
      setSellQuantity(quantity);
    }
  };

  const totalOrderPrice = Math.floor(sellPrice * sellQuantity) || 0;

  return (
    <div className="bg-white p-4 flex flex-col rounded-lg text-xs">
      {/** 제목 */}
      <div className="font-semibold text-[16px]">판매하기</div>
      {/** 판매 입력 */}
      <div className="flex flex-col space-y-2 py-2 border-b-1 border-gray-md">
        <div className="flex items-center">
          <div className="font-semibold w-1/5">판매가격</div>
          <input
            type="number"
            className="input-style text-sm"
            onChange={(e) => setSellPrice(e.target.value)}
            value={sellPrice}
          />
        </div>
        <div className="flex items-start">
          <div className="font-semibold w-1/5 mt-3">판매수량</div>
          <div className="w-full flex flex-col space-y-2">
            <input
              type="number"
              className="input-style text-sm"
              placeholder={`최대 ${maxQuantity}주 가능`}
              value={sellQuantity}
              onChange={(e) => setSellQuantity(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              {percents.map((percent) => (
                <button
                  key={percent.id}
                  className="white-button-style"
                  onClick={() => checkSellQuantity(maxQuantity * percent.id)}
                >
                  {percent.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-2">
        <div className="font-semibold">총 판매 금액</div>
        <div className="font-semibold">{totalOrderPrice}원</div>
      </div>
      <button
        className="button-style"
        onClick={() => orderStock("SELL", sellQuantity, sellPrice)}
        disabled={
          sellQuantity <= 0 ||
          sellQuantity > maxQuantity ||
          totalOrderPrice <= 0
        }
      >
        판매하기
      </button>
    </div>
  );
}
