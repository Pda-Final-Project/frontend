import React from "react";
import { useNavigate } from "react-router-dom";

const earningsData = {
    "3월": [
      { ticker: "ORCL", date: "10일 17:00" },
      { ticker: "ADBE", date: "12일 16:00" },
    ],
    "4월": [
      { ticker: "META", date: "22일 06:00" },
      { ticker: "NOW", date: "22일 06:00" },
      { ticker: "TSLA", date: "23일 16:00" },
      { ticker: "MSFT", date: "23일 16:00" },
      { ticker: "GOOGL", date: "23일 16:00" },
      { ticker: "IBM", date: "23일 16:00" },
      { ticker: "INTC", date: "23일 16:00" },
      { ticker: "V", date: "21일 06:00" },
      { ticker: "NFLX", date: "16일 16:00" },
      { ticker: "TSM", date: "16일 06:00" },
      { ticker: "ASML", date: "16일 01:00" },
      { ticker: "UNH", date: "14일 08:00" },
      { ticker: "MS", date: "11일 08:00" },
      { ticker: "JPM", date: "11일 08:00" },
      { ticker: "XOM", date: "03일 17:00" },
    ],
    "5월": [
      { ticker: "CRM", date: "27일 06:00" },
      { ticker: "NVDA", date: "28일 16:00" },
      { ticker: "COST", date: "28일 16:00" },
      { ticker: "PLTR", date: "05일 06:00" },
      { ticker: "WMT", date: "15일 09:00" },
      { ticker: "LLY", date: "01일 08:00" },
    ],
    "6월": [
      { ticker: "AVGO", date: "10일 16:00" },
    ],
  };
  

const EarningsCalendar = () => {
  const navigate = useNavigate();

  const handleNavigate = (ticker) => {
    navigate(`/earnings/${ticker}`);
  };

  return (
    <div className="max-w-500 p-6 rounded-xl">
      
      <h2 className="items-center text-lg text-center font-bold mb-1">2025년 상반기 실적발표 일정</h2>
      
      <p className="text-blue-md text-center font-semibold mb-4">
        종목을 클릭하여 해당 기업의 분기 실적 보고 예상치와 실제 발표치를 확인해보세요!
      </p>
      <div className="grid grid-cols-4 gap-3 bg-blue-md p-3 rounded-xl">
        {Object.entries(earningsData).map(([month, companies]) => (
          <div key={month} className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-sm font-semibold bg-blue-light py-2 text-center rounded-md">{month}</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {companies.map((company, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleNavigate(company.ticker)}
                >
                  <img
                    src={`${import.meta.env.VITE_STOCK_LOGO_URL}${company.ticker}.png`}
                    alt={company.ticker}
                    className="w-12 h-12 rounded-full border border-gray-300"
                  />
                  <p className="text-sm mt-2">{company.date}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarningsCalendar;
