import React, { useState, useEffect } from "react";
import { fetchAccountInfo } from "../../../api/accountApi";

export default function MyInfo() {
  const [account, setAccount] = useState({
    accountNumber: "270-74-631000",
    accountName: "CMA 종합 계좌",
    userName: "홍길동",
  });

  const tryFetchAccount = async () => {
    try {
      const response = await fetchAccountInfo(); // 실제 API URL로 변경
      if (response.data.status == "OK") {
        setAccount(response.data.data);
      }
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  useEffect(() => {
    tryFetchAccount(); // 컴포넌트 마운트 시 API 호출 (현재 주석 처리)
  }, []);

  return (
    <div className="w-full flex justify-between items-center bg-gray-light p-3 rounded-lg font-semibold">
      <div>
              {/* 계좌번호 */}
      <span className="text-[16px]">{account.account_number}</span>
      <span className="bg-blue-100 p-2 rounded-lg ml-3 hover:cursor-pointer hover:bg-blue-md hover:text-white">
        예수금 조회
      </span>
      </div>
      {/* 계좌 타입 & 사용자 이름 */}
      <div className="text-[16px] flex space-x-2">
        <span>{account.accountName}</span>
        <span>{account.userName}</span>
      </div>
    </div>
  );
}
