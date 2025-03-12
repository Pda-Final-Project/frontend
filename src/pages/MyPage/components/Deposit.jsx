import { useEffect, useState } from "react";
import { fetchBalanceDetail } from "../../../api/accountApi";

const dummyData = {
  availableBalance: 400000, // 예수금
  d1Balance: 365000, // 예수금 D+1
  batchBalance: 400000, // 예수금 D+2
  balance: 300000, // 출금 가능 금액
};

const Deposit = ({ isOpen, onClose }) => {
  const [depositData, setDepositData] = useState(dummyData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchDepositData();
    }
  }, [isOpen]);

  const fetchDepositData = async () => {
    setLoading(true);
    try {
      const response = await fetchBalanceDetail(); // 실제 API 엔드포인트로 변경
      if (response.data.status === 200) {
        setDepositData(response.data.data);
      }
    } catch (error) {
      console.error("예수금 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md z-[1000]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[320px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1010]">
        <h2 className="text-lg font-bold mb-4 text-center">예수금 조회</h2>
        {loading ? (
          <p className="text-center text-gray-500">데이터 불러오는 중...</p>
        ) : depositData ? (
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between py-1">
              <span className="text-gray-600">예수금</span>
              <span className="font-bold">
                {depositData.availableBalance.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">예수금 D+1</span>
              <span className="font-bold">
                {depositData.d1Balance.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">예수금 D+2</span>
              <span className="font-bold">
                {depositData.batchBalance.toLocaleString()}원
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-900 font-bold">출금 가능 금액</span>
              <span className="font-bold">
                {depositData.balance.toLocaleString()}원
              </span>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">
            데이터를 불러올 수 없습니다.
          </p>
        )}
        <button
          className="mt-4 w-full bg-blue-md text-white p-2 rounded-lg hover:bg-blue-light hover:text-black"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Deposit;
