import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DUMMY_DISCLOSURES from "./data/dummyDisclosures";
import { HiPlusCircle } from "react-icons/hi";

export default function Disclosures() {
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
    <div className="w-full">
      {/* 제목 클릭 시 disclosures 페이지 이동 */}
      <div
        className="flex p-3 items-center cursor-pointer"
        onClick={() => navigate("/disclosures")}
      >
        <h1 className="text-[18px] font-bold hover:text-blue-md mb-1 mr-2">
          실시간{" "}
          <span className={isYellow ? "text-yellow-500" : "text-blue-md"}>
            NEW
          </span>{" "}
          해외공시
        </h1>
        <span className="text-blue-md text-center font-semibold hover:underline"> 더 많은 공시 보러가기</span>
      </div>
      {/* 가로 스크롤 컨테이너 */}
      <div className="w-full overflow-auto no-scrollbar">
        <div className="flex space-x-4 rounded-lg max-w-screen-xl whitespace-nowrap">
          {DUMMY_DISCLOSURES.slice(0, 10).map((item) => (
            <div
              key={item.filling_id}
              className="bg-gray-50 p-4 rounded-lg shadow-light transition-all flex flex-col cursor-pointer hover:bg-gray-200 duration-300 min-w-60"
              onClick={() =>
                navigate(`/main/${item.filling_ticker}/${item.filling_id}`)
              } // 종목코드(티커) 클릭 시 이동
            >
              {/* 제목 */}
              <p className="font-bold text-lg sm:text-[16px]">
                {item.filling_title}
              </p>

              {/* 공시 ID */}
              <p className="text-[12px] sm:text-base text-gray-600 mt-1">
                {item.filling_id}
              </p>

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
            className=" flex items-center justify-center min-w-60 bg-gray-50 text-blue-md font-bold text-lg rounded-lg shadow-md transition-all hover:bg-gray-200 cursor-pointer duration-300"
          >
            <HiPlusCircle />
            <span className="ml-1">more</span>
          </button>
        </div>
      </div>
    </div>
  );
}
