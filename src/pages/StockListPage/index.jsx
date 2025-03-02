import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useStockSse } from "../../hooks/useSseStockInfo";
import { fetchStocks } from "../../api/stockApi";

export default function StockListPage() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(""); // 기본 정렬: 거래량 많은 순
  const stocksPerPage = 10;

  const { isConnected, error } = useStockSse(
    `${import.meta.env.VITE_API_DATA_URL}/stocks/stream`,
    stocks,
    setStocks
  );

  // 더미 데이터 생성
  useEffect(() => {
    tryFetchStocks("");
  }, []);

  // 주식 조회 API 함수
  const tryFetchStocks = async (param) => {
    try {
      const response = await fetchStocks(param);
      if (response.data.status === "OK") {
        setStocks(response.data.data);
      }
    } catch (error) {
      console.error("주식 리스트 조회 중 오류 발생:", error);
    }
  };

  // 현재 페이지의 데이터 필터링
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

  return (
    <div className="w-full h-full flex flex-col justify-center px-32 py-20">
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <h1 className="text-lg font-bold mb-2">해외 주식 순위 </h1>
          <span className="text-blue-md font-semibold">
            투자자가 선택한 해외 주식 TOP 30을 둘러봐요
          </span>
        </div>

        {/* 정렬 버튼 */}
        <div className="flex space-x-4 mb-5">
          <button
            className={`px-4 py-2 font-bold rounded-lg text-blue-md ${
              sortBy === "volume" ? "bg-blue-light" : "bg-gray-light"
            }`}
            onClick={() => {
              setSortBy("volume");
              tryFetchStocks("vol");
            }}
          >
            거래량
          </button>
          <button
            className={`px-4 py-2 font-bold rounded-lg text-blue-md ${
              sortBy === "rate" ? "bg-blue-light" : "bg-gray-light"
            }`}
            onClick={() => {
              setSortBy("rate");
              tryFetchStocks("rate");
            }}
          >
            급상승
          </button>
          <button
            className={`px-4 py-2 font-bold rounded-lg text-blue-md ${
              sortBy === "" ? "bg-blue-light" : "bg-gray-light"
            }`}
            onClick={() => {
              setSortBy("");
              tryFetchStocks("");
            }}
          >
            인기
          </button>
        </div>
      </div>

      <div>
        {/* 테이블 */}
        <div>
          <table className="w-full text-center overflow-hidden border-separate border-spacing-0 text-sm font-semibold ">
            <thead>
              <tr className="bg-white text-gray-md">
                <th className="p-3 text-left">종목</th>
                <th className="p-3">현재가</th>
                <th className="p-3">등락률</th>
                <th className="p-3">거래량</th>
              </tr>
            </thead>
            <tbody className="overflow-hidden rounded-lg">
              {currentStocks.map((stock, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer hover:bg-blue-light rounded-lg ${
                    index % 2 === 0 ? "bg-gray-light" : "bg-white"
                  }`}
                  onClick={() => navigate(`../main/${stock.ticker}/all`)}
                >
                  <td className="py-4 px-8 flex items-center space-x-2">
                    <FaHeart
                      className={`${
                        stock.isFavorite ? "text-red-500" : "text-gray-400"
                      }`}
                    />
                    <span className="w-12">
                      {index + 1 + (currentPage - 1) * stocksPerPage}
                    </span>
                    <img
                      src={`${import.meta.env.VITE_STOCK_LOGO_URL}${
                        stock.ticker
                      }.png`}
                      className="w-5 h-5 rounded-full ml-3"
                      alt="img"
                    />
                    <span className="ml-1">{stock.name}</span>
                  </td>

                  <td className="p-3">{stock.current_price} 원</td>
                  <td
                    className={`p-3 ${
                      parseFloat(stock.change_rate) >= 0
                        ? "text-red-500"
                        : "text-blue-500"
                    }`}
                  >
                    {stock.change_rate}
                  </td>

                  <td className="p-3">{stock.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* 페이지네이션 */}
        <div className="flex justify-center mt-4">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`mx-1 px-3 py-1 rounded-[150px] ${
                currentPage === page
                  ? "bg-blue-md text-white font-semibold"
                  : "bg-white"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
