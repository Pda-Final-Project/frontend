import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DUMMY_DISCLOSURES from "./data/dummyDisclosures"; // 더미 데이터 불러오기

export default function Disclosures() {
  const MAIN_SITE_URL = "https://your-main-site.com/disclosures"; // 메인 공시 사이트 URL
  const navigate = useNavigate();
  const [isYellow, setIsYellow] = useState(true); // 색상 토글 상태

  // 1초 간격으로 색상 변경하는 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setIsYellow((prev) => !prev); // 색상 상태 변경
    }, 1000); // 1초 간격

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  return (
    <div className="p-4">
      {/* 제목 클릭 시 disclosures 페이지로 이동 */}
      <h1 
        className="text-2xl font-bold cursor-pointer hover:underline"
        onClick={() => navigate("/disclosures")}
      >
        실시간 <span className={isYellow ? "text-yellow-500" : "text-blue-500"}>NEW</span> 해외공시
      </h1>

      {/* 가로 스크롤 컨테이너 */}
      <div className="overflow-x-auto mt-4">
        <div className="flex space-x-4 p-4 rounded-lg min-w-max">
          {DUMMY_DISCLOSURES.slice(0, 10).map((item) => (
            <div
              key={item.filling_id}
              className="bg-gray-50 p-4 rounded-lg shadow-md transition-all min-w-[220px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[350px] max-w-[400px] flex flex-col cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/main/${item.filling_ticker}`)} // 종목코드 클릭 시 이동
            >
              {/* 제목 */}
              <p className="font-bold text-lg sm:text-xl">{item.filling_title}</p>

              {/* 공시 ID */}
              <p className="text-sm sm:text-base text-gray-600 mt-1">{item.filling_id}</p>

              {/* 공시 타입 & 종목 코드 (클릭 가능) */}
              <p className="text-sm sm:text-base mt-1 font-medium">
                {item.filling_type} • 
                <span className="text-blue-500 font-bold cursor-pointer hover:underline">
                  {item.filling_ticker}
                </span>
              </p>

              {/* 생성 일시 */}
              <p className="text-sm text-gray-500 mt-auto">
                {new Date(item.creation_timestamp).toLocaleString()}
              </p>
            </div>
          ))}

          {/* 더보기 버튼 */}
          <button
            onClick={() => navigate("/disclosures")}
            className="flex items-center justify-center min-w-[220px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[350px] max-w-[400px] bg-gray-50 text-gray-500 font-bold text-lg rounded-lg shadow-md transition-all hover:bg-gray-300 cursor-pointer"
          >
            ➕ more
          </button>
        </div>
      </div>
    </div>
  );
}
