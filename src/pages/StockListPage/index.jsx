import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useStockSse } from "../../hooks/useSseStockInfo";
import { fetchStocks } from "../../api/stockApi";
import { formatNumber } from "../../utils/numberFormat";

export default function StockListPage() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(""); // 기본 정렬: 거래량 많은 순
  const stocksPerPage = 10;
  const [visible, setVisible] = useState(false);
  const { isConnected, error } = useStockSse(setStocks);

  useEffect(() => {
    tryFetchStocks("");
    setTimeout(() => setVisible(true), 100);
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
    <div
      className={`w-full h-full flex flex-col justify-center px-32 py-20 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
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
            className={`px-4 py-2 font-bold rounded-lg text-blue-md hover:bg-blue-light duration-300 ${
              sortBy === "volume" ? "bg-blue-light" : "bg-gray-light"
            }`}
            onClick={() => {
              setSortBy("volume");
              tryFetchStocks("vol");
              setCurrentPage(1);
            }}
          >
            거래량
          </button>
          <button
            className={`px-4 py-2 font-bold rounded-lg text-blue-md hover:bg-blue-light duration-300 ${
              sortBy === "rate" ? "bg-blue-light" : "bg-gray-light"
            }`}
            onClick={() => {
              setSortBy("rate");
              tryFetchStocks("rate");
              setCurrentPage(1);
            }}
          >
            급상승
          </button>
          <button
            className={`px-4 py-2 font-bold rounded-lg text-blue-md hover:bg-blue-light duration-300 ${
              sortBy === "" ? "bg-blue-light" : "bg-gray-light"
            }`}
            onClick={() => {
              setSortBy("");
              tryFetchStocks("");
              setCurrentPage(1);
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
                  className={`cursor-pointer hover:bg-blue-light rounded-lg duration-300 ${
                    index % 2 === 0 ? "bg-gray-light" : "bg-white"
                  }`}
                  onClick={() => navigate(`../main/${stock.ticker}/all`)}
                >
                  <td className="py-4 px-8 flex items-center space-x-2">
                    <FaHeart
                      className={`${
                        stock.isFavorite ? "text-red-md" : "text-gray-400"
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

                  <td className="p-3">
                    {formatNumber(parseInt(stock.current_price))}원
                  </td>
                  <td
                    className={`p-3 ${
                      parseFloat(stock.change_rate) >= 0
                        ? "text-red-md"
                        : "text-blue-dark"
                    }`}
                  >
                    {stock.change_rate}%
                  </td>

                  <td className="p-3">
                    {formatNumber(parseFloat(stock.volume))}
                  </td>
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
