import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DUMMY_DISCLOSURES from "./data/dummyDisclosures";

export default function Disclosures() {
  const MAIN_SITE_URL = "https://your-main-site.com/disclosures";
  const navigate = useNavigate();
  const [isYellow, setIsYellow] = useState(true); // 색상 토글 상태 바꿔주는 useState 함수

  // 1초 간격으로 색상 변경 (NEW 텍스트에 적용)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsYellow((prev) => !prev);
    }, 1000); // 1초 간격

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      {/* 제목 클릭 시 disclosures 페이지 이동 */}
      <h1
        className="text-[18px] font-bold cursor-pointer p-3 hover:text-blue-md"
        onClick={() => navigate("/disclosures")}
      >
        실시간 <span className={isYellow ? "text-yellow-500" : "text-blue-md"}>NEW</span> 해외공시
      </h1>

      {/* 가로 스크롤 컨테이너 */}
      <div className="w-full overflow-x-auto">
        <div className="flex space-x-4 p-4 rounded-lg min-w-max whitespace-nowrap">
          {DUMMY_DISCLOSURES.slice(0, 10).map((item) => (
            <div
              key={item.filling_id}
              className="bg-gray-50 p-4 rounded-lg shadow-light transition-all min-w-[220px] sm:min-w-[240px] md:min-w-[220px] lg:min-w-[220px] max-w-[220px] flex flex-col cursor-pointer hover:bg-gray-100 duration-300"
              onClick={() => navigate(`/main/${item.filling_ticker}/${item.filling_id}`)} // 종목코드(티커) 클릭 시 이동
            >
              {/* 제목 */}
              <p className="font-bold text-lg sm:text-[16px]">{item.filling_title}</p>

              {/* 공시 ID */}
              <p className="text-[12px] sm:text-base text-gray-600 mt-1">{item.filling_id}</p>

              {/* 공시 타입 & 종목 코드 (클릭 가능하게) */}
              <p className="text-[10px] sm:text-base mt-1 font-medium">
                {item.filling_type} •{" "}
                <span className="text-blue-md font-bold cursor-pointer hover:underline">
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
            className="flex items-center justify-center min-w-[220px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[350px] max-w-[400px] bg-gray-50 text-gray-500 font-bold text-lg rounded-lg shadow-md transition-all hover:bg-gray-300 cursor-pointer duration-300"
          >
            ➕ more
          </button>
        </div>
      </div>
    </div>
  );
}
