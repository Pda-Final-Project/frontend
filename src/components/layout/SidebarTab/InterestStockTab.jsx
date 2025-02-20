import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InterestStockTab() {
  const [stocks, setStocks] = useState([
    {
      stock_ticker: "NVDA",
      stock_name: "엔비디아",
      current_price: 1000,
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

  useEffect(() => {}, []);

  return (
    <div className="h-full w-80 bg-white z- 50">
      {/* 내부 사이드바 헤더 */}
      <div className="p-4 flex justify-between">
        <h2 className="text-lg font-semibold">My 관심종목</h2>
      </div>

      {/* 내부 콘텐츠 */}
      <div className="p-4">
        {stocks.map((el) => (
          <div
            key={el.stock_ticker}
            className="flex  justify-between"
            onClick={() => {
              navigate(`/main/${el.stock_ticker}`);
            }}
          >
            <div className="flex items-center">
              <img
                src={`${import.meta.env.VITE_STOCK_LOGO_URL}${
                  el.stock_ticker
                }.png`}
                className="w-12 h-12 rounded-full"
              />
              <div>{el.stock_name}</div>
            </div>

            <div>
              <div>{el.current_price}</div>
              <div>{el.change_rate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
