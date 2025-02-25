import React, { useEffect, useState } from "react";
import PasswordModal from "../common/PasswordModal";

const percents = [
  { id: 0.1, name: "10%" },
  { id: 0.25, name: "25%" },
  { id: 0.5, name: "50%" },
  { id: 0.75, name: "75%" },
  { id: 1, name: "전량" },
];

export default function BuyBox({ withHolding, orderStock }) {
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    price: "",
    quantity: "",
    type: "주문",
  });

  //지정가에 대해 구매 가능한 최대 주수
  useEffect(() => {
    if (buyPrice > 0) {
      const calculatedMaxQuantity = Math.floor(withHolding / buyPrice);
      setMaxQuantity(calculatedMaxQuantity);
    } else {
      setMaxQuantity(0);
    }
    setBuyQuantity(maxQuantity); // maxQuantity가 업데이트될 때마다 buyQuantity 업데이트
  }, [buyPrice, withHolding, maxQuantity]);

  const checkBuyQuantity = (tmpQuantity) => {
    let quantity = Math.floor(parseFloat(tmpQuantity)) || 0;
    if (quantity >= 0 && quantity <= maxQuantity) {
      setBuyQuantity(quantity);
    }
  };

  const totalOrderPrice = Math.floor(buyPrice * buyQuantity);

  const openModal = () => {
    setModalMessage({
      price: totalOrderPrice,
      quantity: buyQuantity,
      type: "주문",
    });
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white p-4 flex flex-col rounded-lg text-xs">
      <PasswordModal
        isOpen={isModalOpen}
        setOpen={setIsModalOpen}
        action={() => orderStock("sell", buyQuantity, totalOrderPrice)} // action을 함수로 수정
        message={modalMessage}
      />
      {/** 제목 */}
      <div className="font-semibold text-[16px]">주문하기</div>
      {/** 판매 입력 */}
      <div className="flex flex-col space-y-2 py-2 border-b-1 border-gray-md">
        <div className="flex items-center">
          <div className="font-semibold w-1/5">주문가격</div>
          <input
            type="number"
            className="input-style text-sm"
            onChange={(e) => setBuyPrice(e.target.value)}
            value={buyPrice}
          />
        </div>
        <div className="flex items-start">
          
          <div className="font-semibold w-1/5 mt-3">주문수량</div>
          <div className="w-full flex flex-col space-y-2">
            <input
              type="number"
              className="input-style text-sm"
              placeholder={`최대 ${maxQuantity}주 가능`}
              value={buyQuantity}
              onChange={(e) => setBuyQuantity(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              {percents.map((percent) => (
                <button
                  key={percent.id}
                  className="white-button-style"
                  onClick={() => checkBuyQuantity(maxQuantity * percent.id)}
                >
                  {percent.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-2">
        <div className="font-semibold">총 주문 금액</div>
        <div className="font-semibold">{totalOrderPrice}원</div>
      </div>
      <button
        className="button-style"
        onClick={() => openModal()}
        disabled={
          buyQuantity <= 0 || buyQuantity > maxQuantity || totalOrderPrice <= 0
        }
      >
        구매하기
      </button>
    </div>
  );
}
