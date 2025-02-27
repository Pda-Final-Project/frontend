import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function index() {
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
      ticker: "APPL",
      name: "apple",
      price: "1000",
      rate: "+12",
      volume: "100",
    },
    {
      ticker: "APPL2",
      name: "apple2",
      price: "1000",
      rate: "+12",
      volume: "100",
    },
  ]);

  useEffect(() => {
    //종목리스트 조회 api 호출
  }, []);
  return (
    <div>
      <div>해외 주식</div>
      <div className="flex flex-col">
        <div className="grid grid-cols-4 gap-4">
          <div>종목</div>
          <div>현재가</div>
          <div>등락률</div>
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
              {stock.price}
              <span>원</span>
            </div>
            <div>
              {stock.rate}
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
