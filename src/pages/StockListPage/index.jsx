import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStockSse } from "../../hooks/useSseStockInfo";
import { fetchStocks } from "../../api/stockApi";

export default function StockListPage() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([
    {
      ticker: "APPL",
      name: "apple",
      price: "1000",
      rate: "+12",
      volume: "100",
    },
    {
      ticker: "NVDA",
      name: "nvida",
      price: "1000",
      rate: "+12",
      volume: "100",
    },
    {
      ticker: "TSLA",
      name: "tesla",
      price: "1000",
      rate: "+12",
      volume: "100",
    },
  ]);

  const { isConnected, error } = useStockSse(
    `${import.meta.env.VITE_API_DATA_URL}/stocks/stream`,
    stocks,
    setStocks
  );

  //주식 조회
  const tryFetchStocks = async (sortBy = "") => {
    try {
      const response = await fetchStocks(sortBy);
      if (response.data.status == "OK") {
        setStocks(response.data.data);
      }
    } catch (error) {
      console.error("주식 리스트 조회 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    tryFetchStocks();
  }, []);

  return (
    <div>
      <div>해외 주식</div>
      <div className="flex flex-col">
        {/** 정렬 */}
        <div className="flex w-32 gap-2">
          <div
            className="white-button-style"
            onClick={() => {
              tryFetchStocks("vol");
            }}
          >
            거래량
          </div>
          <div
            className="white-button-style"
            onClick={() => {
              tryFetchStocks("rate");
            }}
          >
            등락율
          </div>
        </div>

        {/** 종목 리스트 */}
        <div className="grid grid-cols-4 gap-4">
          <div>종목</div>
          <div>현재가</div>
          <div>등락율</div>
          <div>거래량</div>
        </div>
        {stocks.map((stock) => (
          <div
            key={stock.ticker}
            className="grid grid-cols-4 gap-4"
            onClick={() => {
              navigate(`../main/${stock.ticker}/all`);
            }}
          >
            <div>{stock.name}</div>
            <div>
              {stock.current_price}
              <span>원</span>
            </div>
            <div>
              {stock.change_rate}
              <span>%</span>
            </div>
            <div>
              {stock.volume}
              <span>주</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
