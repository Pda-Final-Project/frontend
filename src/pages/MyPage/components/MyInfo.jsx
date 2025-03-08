import React, { useState, useEffect } from "react";

export default function MyInfo() {
  const [account, setAccount] = useState({
    account_number: "270-74-631000",
    account_name: "CMA 종합 계좌",
    user_name: "홍길동",
  });

  // 간단한 API 호출 함수 (나중에 주석 해제하면 API 연동 가능)
  const fetchAccount = async () => {
    try {
      const response = await fetch("https://api.example.com/accounts"); // 실제 API URL로 변경
      if (!response.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");
      const data = await response.json();

      if (data && data.length > 0) {
        setAccount(data[0]); // 첫 번째 계좌 정보 저장
      }
    } catch (error) {
      console.error("API 호출 실패:", error);
    }
  };

  /*
  useEffect(() => {
    fetchAccount(); // 컴포넌트 마운트 시 API 호출 (현재 주석 처리)
  }, []);
  */

  return (
    <div className="w-full flex justify-between items-center bg-gray-light p-3 rounded-lg text-black font-semibold">
      {/* 계좌번호 */}
      <span className="text-[16px]">{account.account_number}</span>

      {/* 계좌 타입 & 사용자 이름 */}
      <div className="text-[16px] flex space-x-2">
        <span>{account.account_name}</span>
        <span>{account.user_name}</span>
      </div>
    </div>
  );
}
