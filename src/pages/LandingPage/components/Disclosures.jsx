import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiPlusCircle } from "react-icons/hi";
import { fetchFillings } from "../../../api/disclosureApi";

export default function Disclosures() {
  const navigate = useNavigate();
  const [fillings, setFillings] = useState(); // 초기값을 더미 데이터로 설정

  useEffect(() => {
    tryFetchFillings();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const tryFetchFillings = async () => {
    try {
      const response = await fetchFillings();

      if (response.data.status === "FOUND") {
        const fetchedData = response.data.data.content;
        setFillings(fetchedData);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="w-full">
      {/* 제목 클릭 시 disclosures 페이지 이동 */}
      <div className="flex mb-4 items-end">
        <h1 className="text-[18px] font-bold mr-2 ">
          실시간 <span className="text-blue-md">NEW</span> 해외 공시
        </h1>
        <span
          className="text-blue-md text-center font-semibold hover:underline cursor-pointer"
          onClick={() => navigate("/disclosures")}
        >
          {" "}
          더 많은 공시 보러가기
        </span>
      </div>
      <div className="w-full relative">
        {/* 오른쪽 끝에 고정된 그림자 추가 */}
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[rgba(255,255,255,0.8)] to-transparent pointer-events-none z-10"></div>
        <div className="w-full overflow-x-scroll relative no-scrollbar">
          <div className="flex space-x-4 rounded-lg max-w-xl whitespace-nowrap shadow-lg">
            {/* fillings 배열이 제대로 있는지 확인하고, 없다면 로딩 중 표시 */}
            {Array.isArray(fillings) && fillings.length > 0 ? (
              fillings?.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-light transition-all flex flex-col cursor-pointer hover:bg-gray-200 duration-300 min-w-60"
                  onClick={() =>
                    navigate(`/main/${item.fillingTicker}/${item.fillingId}`)
                  } // 종목코드(티커) 클릭 시 이동
                >
                  {/* 제목 */}
                  <p className="font-bold text-lg sm:text-[16px]">
                    {item.fillingTitle}
                  </p>

                  {/* 공시 ID */}
                  <p className="text-[12px] sm:text-base text-gray-600 mt-1">
                    {item.fillingId}
                  </p>

                  {/* 공시 타입 & 종목 코드 (클릭 가능하게) */}
                  <p className="text-[10px] sm:text-base mt-1 font-medium">
                    {item.fillingType} •{" "}
                    <span className="text-blue-md font-bold cursor-pointer hover:underline">
                      {item.fillingTicker}
                    </span>
                  </p>

                  {/* 생성 일시 */}
                  <p className="text-sm text-gray-500 mt-auto">
                    {new Date(item.submitTimestamp).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p>로딩 중...</p>
            )}

            {/* 더보기 버튼 */}
            <button
              onClick={() => navigate("/disclosures")}
              className="flex items-center justify-center min-w-60 bg-gray-50 text-blue-md font-bold text-lg rounded-lg shadow-md transition-all hover:bg-gray-200 cursor-pointer duration-300"
            >
              <HiPlusCircle />
              <span className="ml-1">more</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
