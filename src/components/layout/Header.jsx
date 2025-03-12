import React, { useEffect, useState, useRef } from "react";
import { FaRegBell } from "react-icons/fa";
import AlarmModal from "../common/AlarmModal";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchStocks } from "../../api/stockApi";
import { formatNumber } from "../../utils/numberFormat";
import { logout } from "../../api/authApi";

const Header = () => {
  const [showAlarm, setShowAlarm] = useState(false);
  const [searchParam, setSearchParam] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const searchRef = useRef(null);
  const alarmRef = useRef(null);

  const handleSearch = async () => {
    try {
      const response = await fetchStocks("", searchParam);
      if (response.data.status === "OK") {
        setSearchResult(response.data.data);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside the search dropdown
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResult([]);
      }
      if (alarmRef.current && !alarmRef.current.contains(event.target)) {
        setShowAlarm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItemsleft = [
    { name: "해외공시", path: "/disclosures" },
    { name: "해외종목", path: "/stocks" },
  ];

  const menuItemsright = [
    { name: "공시 가이드", path: "/introduce_disclosures" },
    { name: "실적발표 캘린더", path: "/earnings" },
    { name: "My계좌", path: "/my_page" },
  ];

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white relative">
      {/* 로고 */}
      <div className="flex items-center space-x-2">
        <img
          src="/images/logo.png"
          alt="FinPago Logo"
          className="w-36 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      {/* 네비게이션 */}
      <nav className="flex space-x-3 text-[14px] font-semibold items-center">
        {menuItemsleft.map((item) => (
          <a
            key={item.path}
            className={`px-4 py-2 cursor-pointer duration-300 ${
              location.pathname === item.path
                ? "text-blue-md"
                : "text-gray-600 hover:text-blue-400"
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </a>
        ))}

        <div ref={searchRef} className="relative flex-grow w-80">
          <input
            type="text"
            placeholder="종목명 or 종목 코드로 검색"
            className="w-full min-w-[300px] rounded-xl px-3 py-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-md duration-300"
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          {/* 검색 결과 드롭다운 */}
          {searchResult.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white shadow-md rounded-lg max-h-60 no-scrollbar overflow-y-auto">
              {searchResult.map((stock, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-gray-100 cursor-pointer text-xs"
                  onClick={() => {
                    setSearchResult([]);
                    setSearchParam("");
                    navigate(`/main/${stock.ticker}/all`);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center w-2/3">
                      <img
                        src={`${import.meta.env.VITE_STOCK_LOGO_URL}${
                          stock.ticker
                        }.png`}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span>
                        {stock.name} ({stock.ticker})
                      </span>
                    </div>
                    <div className="flex flex-col w-1/3 justify-end">
                      <span className="text-right">
                        {formatNumber(parseFloat(stock.current_price))}원
                      </span>
                      <span
                        className={`text-right ${
                          parseFloat(stock.change_rate) >= 0
                            ? "text-red-md"
                            : "text-blue-dark"
                        }`}
                      >
                        {stock.change_rate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {menuItemsright.map((item) => (
          <a
            key={item.path}
            className={`px-4 py-2 cursor-pointer duration-300 ${
              location.pathname === item.path
                ? "text-blue-md"
                : "text-gray-600 hover:text-blue-md"
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </a>
        ))}
      </nav>
      {/* 알림 & 로그인*/}
      <div className="flex items-center space-x-4 relative">
        {/* 알림 버튼 */}
        <button onClick={() => setShowAlarm(true)} className="relative">
          <FaRegBell className="text-blue-md text-2xl mx-3 cursor-pointer hover:text-blue-light duration-300" />
        </button>
        {isLogin ? (
          <button className="button-style" onClick={() => logout(setIsLogin)}>
            로그아웃
          </button>
        ) : (
          <button className="button-style" onClick={() => navigate("/login")}>
            로그인
          </button>
        )}
      </div>

      {/* 알람 모달 */}
      {showAlarm && (
        <div ref={alarmRef}>
          <AlarmModal onClose={() => setShowAlarm(false)} />
        </div>
      )}
    </header>
  );
};

export default Header;
