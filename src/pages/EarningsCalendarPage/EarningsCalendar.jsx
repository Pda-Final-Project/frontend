import React from "react";
import { useNavigate } from "react-router-dom";

const earningsData = {
  "3월": [
    { ticker: "AAPL", date: "19일 17:00" },
    { ticker: "TSLA", date: "22일 16:30" },
    { ticker: "MSFT", date: "25일 18:00" },
    { ticker: "GOOGL", date: "28일 17:45" },
    { ticker: "AMZN", date: "30일 16:00" },
    { ticker: "META", date: "31일 15:30" },
    { ticker: "AMZN", date: "30일 16:00" },
    { ticker: "META", date: "31일 15:30" },
  ],
  "4월": [
    { ticker: "NFLX", date: "10일 17:00" },
    { ticker: "NVDA", date: "12일 18:30" },
  ],
  "5월": [
    { ticker: "NFLX", date: "10일 17:00" },
    { ticker: "NVDA", date: "12일 18:30" },
  ],
  "6월": [
    { ticker: "NFLX", date: "10일 17:00" },
    { ticker: "NVDA", date: "12일 18:30" },
  ],
  "7월": [
    { ticker: "NFLX", date: "10일 17:00" },
    { ticker: "NVDA", date: "12일 18:30" },
  ],
  "8월": [
    { ticker: "NFLX", date: "10일 17:00" },
    { ticker: "NVDA", date: "12일 18:30" },
  ],
};

const EarningsCalendar = () => {
  const navigate = useNavigate();

  const handleNavigate = (ticker) => {
    navigate(`/earnings/${ticker}`);
  };

  return (
    <div className="max-w-500 p-6 rounded-xl">
      <h2 className="text-lg font-bold mb-1">실적발표 일정</h2>
      <p className="text-blue-md font-semibold mb-4">
        기업을 클릭하여 해당 기업의 분기 실적 보고 예상치와 실제 발표치를 확인해보세요!
      </p>
      <div className="grid grid-cols-6 gap-3 bg-blue-md p-3 rounded-xl">
        {Object.entries(earningsData).map(([month, companies]) => (
          <div key={month} className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-sm font-semibold bg-blue-light py-2 text-center rounded-md">{month}</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
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
