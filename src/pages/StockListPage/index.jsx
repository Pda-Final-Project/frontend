import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useStockSse } from "../../hooks/useSseStockInfo";
import { fetchStocks } from "../../api/stockApi";

export default function StockListPage() {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("volume"); // 기본 정렬: 거래량 많은 순
  const stocksPerPage = 10;

  const { isConnected, error } = useStockSse(
    `${import.meta.env.VITE_API_DATA_URL}/stocks/stream`,
    stocks,
    setStocks
  );

  // 더미 데이터 생성
  useEffect(() => {
    if (!isConnected) {
      const dummyStocks = Array(30).fill().map((_, index) => ({
        name: "테슬라",
        ticker: "TSLA",
        current_price: (511410 + index * 100).toLocaleString(),
        change_rate: `+${(3032 + index * 10).toLocaleString()}원 (${(4.4 + index * 0.1).toFixed(1)}%)`,
        volume: (1000000 - index * 5000).toLocaleString(),
        isFavorite: index === 0, // 첫 번째 항목만 관심 등록
      }));
      setStocks(dummyStocks);
    } else {
      tryFetchStocks();
    }
  }, [isConnected]);

  // 주식 조회 API 함수
  const tryFetchStocks = async (sortBy = "") => {
    try {
      const response = await fetchStocks(sortBy);
      if (response.data.status === "OK") {
        setStocks(response.data.data);
      }
    } catch (error) {
      console.error("주식 리스트 조회 중 오류 발생:", error);
    }
  };

  // 정렬 함수
  const sortedStocks = [...stocks].sort((a, b) => {
    if (sortBy === "volume") return parseInt(b.volume.replace(/,/g, "")) - parseInt(a.volume.replace(/,/g, ""));
    if (sortBy === "rate") return parseFloat(b.change_rate.match(/\d+(\.\d+)?/g)[1]) - parseFloat(a.change_rate.match(/\d+(\.\d+)?/g)[1]);
    return 0;
  });

  // 현재 페이지의 데이터 필터링
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = sortedStocks.slice(indexOfFirstStock, indexOfLastStock);

  return (
    <div className="w-full mx-auto p-5">
      <h1 className="text-lg font-bold mb-4">해외 주식</h1>
      
      {/* 정렬 버튼 */}
      <div className="flex space-x-4 mb-4">
        <button 
          className={`px-4 py-2 rounded-md ${sortBy === "volume" ? "bg-blue-md text-white font-semibold" : "bg-gray-200"}`}
          onClick={() => { setSortBy("volume"); tryFetchStocks("vol"); }}
        >
          거래량 많은 순
        </button>
        <button 
          className={`px-4 py-2 rounded-md ${sortBy === "rate" ? "bg-blue-md text-white" : "bg-gray-200"}`}
          onClick={() => { setSortBy("rate"); tryFetchStocks("rate"); }}
        >
          급상승
        </button>
      </div>

      {/* 테이블 */}
      <div className="rounded-lg">
        <table className="w-full text-center">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3">종목</th>
              <th className="p-3">현재가</th>
              <th className="p-3">등락률</th>
              <th className="p-3">거래량</th>
            </tr>
          </thead>
          <tbody>
            {currentStocks.map((stock, index) => (
              <tr
                key={index}
                className={`cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                onClick={() => navigate(`../main/${stock.ticker}/all`)}
              >
                <td className="p-3 flex items-center">
                  <FaHeart className={`mr-2 ${stock.isFavorite ? 'text-red-500' : 'text-gray-400'}`} />
                  {index + 1 + (currentPage - 1) * stocksPerPage}
                </td>
                <td className="p-3 flex items-center">
                  <img
                    src="/tesla-logo.png"
                    alt="테슬라"
                    className="w-5 h-5 mr-2"
                  />
                  {stock.name}
                </td>
                <td className="p-3">{stock.current_price} 원</td>
                <td className="p-3 text-red-500">{stock.change_rate}</td>
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
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === page ? "bg-blue-md text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}
