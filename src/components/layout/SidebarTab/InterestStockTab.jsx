import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InterestStockTab() {
  const [stocks, setStocks] = useState([
    {
      ticker: "NVDA",
      name: "엔비디아",
      price: 1000,
      change_rate: 1.23,
      pinned: true,
    },
    {
      ticker: "NVDA",
      name: "엔비디아",
      price: 1000,
      change_rate: 1.23,
      pinned: true,
    },
    {
      ticker: "NVDA",
      name: "엔비디아",
      price: 1000,
      change_rate: 1.23,
      pinned: true,
    },
    {
      ticker: "NVDA",
      name: "엔비디아",
      price: 1000,
      change_rate: 1.23,
      pinned: true,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    //api 연결 후 적용
    const fetchStocks = async () => {
      try {
        const response = await getInterestStocks();

        if (response.status === "success") {
          setStocks(response.data); // 관심 종목 목록 업데이트
        } else {
          throw new Error(
            response.message || "데이터를 불러오는 데 실패했습니다."
          );
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // fetchStocks();
  }, []);

  return (
    <div className="h-full w-100 bg-gray-light border-r-1 border-gray-md z- 50 py-4 px-2 space-y-2">
      {/* 내부 사이드바 헤더 */}
      <div className="p-4 flex flex-col justify-between border-b-1 border-gray-md">
        <h2 className="text-lg font-semibold w-full">My 관심주식</h2>
        <div className="text-sm mt-1 text-blue-md">
          나의 관심 주식을 모아보세요
        </div>
      </div>

      {/* 내부 콘텐츠 */}
      <div className="p-2 flex flex-col space-y-2">
        {stocks.map((stock) => (
          <div
            key={stock.ticker}
            className="flex justify-between p-2 hover:bg-blue-light duration-300 rounded-lg cursor-pointer"
            onClick={() => {
              navigate(`/main/${stock.ticker}/all`);
            }}
          >
            <div className="flex items-center space-x-2">
              <img
                src={`${import.meta.env.VITE_STOCK_LOGO_URL}${
                  stock.ticker
                }.png`}
                className="w-12 h-12 rounded-full"
              />
              <div className="font-semibold">{stock.name}</div>
            </div>

            <div className="flex flex-col items-end font-semibold">
              <div>{stock.price}원</div>
              <div className="text-sm">{stock.change_rate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
