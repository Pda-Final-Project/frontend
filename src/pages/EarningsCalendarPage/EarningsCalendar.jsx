import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const getNewYorkTime = () => {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
};

const EarningsCalendar = () => {
  const navigate = useNavigate();
  const [nyTime, setNyTime] = useState(getNewYorkTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setNyTime(getNewYorkTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (ticker) => {
    navigate(`/earnings/${ticker}`);
  };

  const earningsData = {
    "3월": [
      { ticker: "ORCL", date: "10일 17:00" },
      { ticker: "ADBE", date: "12일 16:00" },
    ],
    "4월": [
      { ticker: "XOM", date: "03일 17:00" },
      { ticker: "MS", date: "11일 08:00" },
      { ticker: "JPM", date: "11일 08:00" },
      { ticker: "UNH", date: "14일 08:00" },
      { ticker: "NFLX", date: "16일 16:00" },
      { ticker: "TSM", date: "16일 06:00" },
      { ticker: "ASML", date: "16일 01:00" },
      { ticker: "V", date: "21일 06:00" },
      { ticker: "META", date: "22일 06:00" },
      { ticker: "NOW", date: "22일 06:00" },
      { ticker: "TSLA", date: "23일 16:00" },
      { ticker: "MSFT", date: "23일 16:00" },
      { ticker: "GOOGL", date: "23일 16:00" },
      { ticker: "IBM", date: "23일 16:00" },
      { ticker: "INTC", date: "23일 16:00" },
      { ticker: "KO", date: "28일 08:00" },
      { ticker: "AMZN", date: "28일 06:00" },
      { ticker: "AMD", date: "28일 06:00" },
      { ticker: "MA", date: "29일 08:00" },
      { ticker: "AAPL", date: "30일 06:00" },
      { ticker: "LIN", date: "30일 06:00" },
    ],
    "5월": [
      { ticker: "LLY", date: "01일 08:00" },
      { ticker: "PLTR", date: "05일 06:00" },
      { ticker: "WMT", date: "15일 09:00" },
      { ticker: "CRM", date: "27일 06:00" },
      { ticker: "NVDA", date: "28일 16:00" },
      { ticker: "COST", date: "28일 16:00" },
    ],
    "6월": [
      { ticker: "AVGO", date: "10일 16:00" },
    ],
  };
  
  return (
    
    <div className="max-w-500 p-6 rounded-xl">
      <h2 className="items-center text-lg text-center font-bold mb-1">2025년 상반기 실적발표 일정</h2>
      
      <p className="text-blue-md text-center text-sm font-semibold mb-4">
        종목을 클릭하여 해당 기업의 분기 실적 보고 예상치와 실제 발표치를 확인해보세요!
      </p>
      <p className="bg-blue-light mr-100 ml-100 text-center text-sm font-semibold p-2 rounded-md mb-2">
        뉴욕 현재 시간 {nyTime} (EDT/EST)
      </p>
      <p className="text-blue-md text-right font-semibold mb-2">
      아래 일정은 뉴욕시간 기준이며, 매주 업데이트 됩니다.
      </p>
      <div className="grid grid-cols-4 gap-3 bg-blue-md p-3 rounded-xl">
        {Object.entries(earningsData).map(([month, companies]) => (
            
          <div >
            <h3 className="text-sm font-semibold bg-blue-light py-2 text-center rounded-md">{month}</h3>
            <div className="bg-white p-4 rounded-xl shadow-md mt-3 h-100 overflow-y-auto">
                
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              {companies.map((company, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center cursor-pointer text-center"
                  onClick={() => handleNavigate(company.ticker)}
                >
                  <img
                    src={`${import.meta.env.VITE_STOCK_LOGO_URL}${company.ticker}.png`}
                    alt={company.ticker}
                    className="w-12 h-12 rounded-full border border-gray-300 transition-transform duration-300 ease-in-out hover:scale-130"
                  />
                  <p className="text-sm mt-2">{company.date}</p>
                  
                </div>
                
              ))}
            </div>
            
            </div>
            
        
          </div>
          
         
        ))}
      </div>
      <p className="text-center text-xs text-blue-md font-semibold bg-blue-light p-2 rounded-xl mt-2 mr-100 ml-100">
  데이터 제공: <a href="https://finance.yahoo.com/calendar" target="_blank" className="underline">Yahoo! Finance Earnings Calendar</a>
</p>
    </div>
  );
};

export default EarningsCalendar;
