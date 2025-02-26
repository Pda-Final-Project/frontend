import React, {useState} from "react";
import { FaRegBell } from "react-icons/fa";
import AlarmModal from "../common/AlarmModal";

const Header = () => {
  const [showAlarm, setShowAlarm] = useState(false);
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white">
      {/* 로고 */}
      <div className="flex items-center space-x-2">
        <img src="../../../public/images/logo.png" alt="FinPago Logo" className="w-36 cursor-pointer" />
        {/* <h1 className="text-xl font-bold">FinPago</h1> */}
      </div>

      {/* 네비게이션 */}
      <nav className="flex space-x-6 text-[14px] font-semibold items-center">
        <a href="#" className="px-4 py-2 hover:text-blue-md duration-300">해외공시</a>
        <a href="#" className="px-4 py-2 hover:text-blue-md duration-300">해외주식</a>
        {/* 검색창 */}
        <div className="flex-grow max-w-lg">
        <input 
          type="text"
          placeholder="종목명 or 종목 코드로 검색" 
          className="w-full min-w-[300px] rounded-xl px-3 py-2 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-md duration-300"
        />
        </div>
        <a href="#" className="px-5 py-2 hover:text-blue-md duration-300">My계좌</a>
      </nav>
  {/* 로그인 & 알림 */}
      <div className="flex items-center space-x-4 relative">
        {/* 알림 버튼 */}
        <button onClick={() => setShowAlarm(true)} className="relative">
          <FaRegBell className="text-blue-md text-2xl mx-3 cursor-pointer hover:text-blue-light duration-300" />
        </button>

        {/* 로그인 버튼 */}
        <button className="button-style">
          로그인
        </button>
      </div>

      {/* 알람 모달 (showAlarm이 true일 때만 렌더링) */}
      {showAlarm && <AlarmModal onClose={() => setShowAlarm(false)} />}
    </header>
  );
};

export default Header;