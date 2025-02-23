import React, { useState } from "react";
import PasswordModal from "../common/PasswordModal";

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
  const [modalMessage, setModalMessage] = useState({
    price: "",
    quantity: "",
    type: "판매",
  });
  const minUnit = 1;

  const checkSellQuantity = (tmpQuantity) => {
    let quantity = parseFloat(tmpQuantity) || 0;
    quantity = Math.floor(quantity * 10 ** 5) / 10 ** 5; // 소수점 5자리까지 제한

    if (quantity >= 0 && quantity <= maxQuantity) {
      setSellQuantity(quantity);
    }
  };

  const totalOrderPrice = Math.floor(currentPrice * sellQuantity);

  const openModal = () => {
    modalMessage.price = totalOrderPrice;
    modalMessage.quantity = sellQuantity;
    setModalMessage(modalMessage);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <PasswordModal
        isOpen={isModalOpen}
        setOpen={setIsModalOpen}
        action={() => orderStock("sell", sellQuantity, totalOrderPrice)} // action을 함수로 수정
        message={modalMessage}
      />
      <div>판매하기</div>
      <div>
        <div>판매가격</div>
        <input
          type="number"
          onChange={(e) => checkSellQuantity(e.target.value)}
          value={sellQuantity}
          step={minUnit}
        />
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
        onClick={() => openModal()}
        disabled={sellQuantity <= 0}
        className="bg-gray-200 w-full"
      >
        판매하기
      </button>
    </div>
  );
}
