import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* 로고 */}
      <div className="flex items-center space-x-2">
        <img src="../../../public/images/logo.png" alt="FinPago Logo" className="w-48 cursor-pointer" />
        {/* <h1 className="text-xl font-bold">FinPago</h1> */}
      </div>

      {/* 네비게이션 */}
      <nav className="flex space-x-6 text-lg">
        <a href="#" className="px-4 py-2 font-bold hover:text-blue-500">해외공시</a>
        <a href="#" className="px-4 py-2 font-bold hover:text-blue-500">해외주식</a>
        <input 
          type="text"
          placeholder="종목명 or 종목 코드로 검색" 
          className="px-4 py-2 rounded-lg border bg-gray-100 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <a href="#" className="px-4 py-2 font-bold hover:text-blue-500">My계좌</a>
      </nav>

      {/* 로그인 & 알림 */}
      <div className="flex items-center space-x-4">
        <button className=" font-bold bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">
          로그인
        </button>
        <button className="text-gray-500 hover:text-black">
          <i className="fas fa-bell text-2xl"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
