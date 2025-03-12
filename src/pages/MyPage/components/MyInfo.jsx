import React, { useState, useEffect } from "react";
import { fetchAccountInfo } from "../../../api/accountApi";
import Deposit from "./Deposit";

export default function MyInfo() {
  const [account, setAccount] = useState({
    accountNumber: "270-74-631000",
    accountName: "CMA 종합 계좌",
    userName: "홍길동",
  });

  const [isDepositOpen, setIsDepositOpen] = useState(false);

  const tryFetchAccount = async () => {
    try {
      const response = await fetchAccountInfo();
      if (response.data.status === "OK") {
        setAccount(response.data.data);
      }
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  useEffect(() => {
    tryFetchAccount();
  }, []);

  return (
    <div className="w-full flex justify-between items-center bg-gray-light p-3 rounded-lg font-semibold">
      <div>
        {/* 계좌번호 */}
        <span className="text-[16px]">{account.accountNumber}</span>
        <button 
          className="bg-blue-100 p-2 px-3 rounded-lg ml-3 hover:cursor-pointer hover:bg-blue-md hover:text-white duration-300 ease-in-out"
          onClick={() => setIsDepositOpen(true)}
        >
          예수금 조회
        </button>
      </div>

      {/* 계좌 타입 & 사용자 이름 */}
      <div className="text-[16px] flex space-x-2">
        <span>{account.accountName}</span>
        <span>{account.userName}</span>
      </div>

      {/* 예수금 조회 모달 */}
      <Deposit isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} />
    </div>
  );
}
