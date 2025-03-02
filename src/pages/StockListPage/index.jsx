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
        change_rate: `${(3032 + index * 10).toLocaleString()}원 (${(4.4 + index * 0.1).toFixed(1)}%)`,
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
    const getRateValue = (rate) => parseFloat(rate.match(/\d+(\.\d+)?/g)[1]);
    const getVolumeValue = (volume) => parseInt(volume.replace(/,/g, ""));
    
    if (sortBy === "volume") return getVolumeValue(b.volume) - getVolumeValue(a.volume);
    if (sortBy === "rate") return getRateValue(b.change_rate) - getRateValue(a.change_rate);
    if (sortBy === "popularity") {
      const avgA = (getRateValue(a.change_rate) + getVolumeValue(a.volume)) / 2;
      const avgB = (getRateValue(b.change_rate) + getVolumeValue(b.volume)) / 2;
      return avgB - avgA;
    }
    return 0;
  });

  // 현재 페이지의 데이터 필터링
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = sortedStocks.slice(indexOfFirstStock, indexOfLastStock);

  return (
    
    <div className="w-full mx-auto p-10">
      <div className="flex items-center space-x-2 mb-2">
      <h1 className="text-lg font-bold mb-2">해외 종목 순위 </h1> <span className="text-blue-md">투자자가 선택한 종목 🇺🇸 TOP 30을 둘러봐요</span> 
      </div>
      
      {/* 정렬 버튼 */}
      <div className="flex space-x-4 mb-5">
        <button 
          className={`px-4 py-2 font-bold rounded-lg ${sortBy === "volume" ? "bg-gray-light text-blue-md" : "text-blue-md"}`}
          onClick={() => { setSortBy("volume"); tryFetchStocks("vol"); }}
        >
          거래량
        </button>
        <button 
          className={`px-4 py-2 font-bold rounded-lg ${sortBy === "rate" ? "bg-gray-light text-blue-md" : "text-blue-md"}`}
          onClick={() => { setSortBy("rate"); tryFetchStocks("rate"); }}
        >
          급상승
        </button>
        <button 
          className={`px-4 py-2 font-bold rounded-lg ${sortBy === "popularity" ? "bg-gray-light text-blue-md" : "text-blue-md"}`}
          onClick={() => { setSortBy("popularity"); }}
        >
          인기
        </button>
      </div>

      {/* 테이블 */}
      <div>
      <table className="w-full text-center overflow-hidden rounded-2xl border-separate border-spacing-0">
          <thead>
            <tr className="bg-white text-gray-500 rounded-xl">
              <th className="p-3 text-left">종목</th>
              <th className="p-3">현재가</th>
              <th className="p-3">등락률</th>
              <th className="p-3">거래량</th>
            </tr>

          </thead>
          <tbody className="overflow-hidden rounded-b-2xl">
            {currentStocks.map((stock, index) => (
              <tr
                key={index}
                className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-light' : 'bg-white'}`}
                onClick={() => navigate(`../main/${stock.ticker}/all`)}
              >
                <td className="p-3 flex items-center space-x-2 ">
                  <FaHeart className={`${stock.isFavorite ? 'text-red-500' : 'text-gray-400'}`} />
                  <span>{index + 1 + (currentPage - 1) * stocksPerPage}</span>
                  <img
                    src={`${import.meta.env.VITE_STOCK_LOGO_URL}${stock.ticker}.png`}
                    className="w-5 h-5 rounded-full"
                    alt="img"
                  />
                  <span>{stock.name}</span>
                </td>
                
                <td className="p-3">{stock.current_price} 원</td>
                <td className={`p-3 ${parseFloat(stock.change_rate) >= 0 ? "text-red-500" : "text-blue-500"}`}>{stock.change_rate}</td>
                
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
              currentPage === page ? "bg-blue-md text-white font-semibold" : "bg-white"
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