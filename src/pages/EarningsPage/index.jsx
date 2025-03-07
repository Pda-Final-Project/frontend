import React from "react";
import CompanyInfo from "./components/CompanyInfo";
import EarningsReport from "./components/EarningsReport";
import EarningsChart from "./components/EarningsChart";

const EarningsPage = () => {
  return (
    <div className="px-32 py-20 flex flex-col w-full">
      <div className="text-center">
        <h1 className="text-lg font-bold">실적 발표 및 어닝콜 정보</h1>
        <h2 className="text-blue-md mt-2 mb-4 font-semibold">
          기업의 실적 발표 일정을 한눈에 확인하고, 예상 EPS 및 매출과 실제
          실적을 비교해보세요.{" "}
        </h2>
      </div>

      {/* 기업 정보 */}
      <div className="flex  mb-5 mt-3">
        <CompanyInfo />
      </div>

      <div>
        {/* 실적 발표 정보 */}
        <div>
          <EarningsReport />
        </div>

        {/* 차트 */}
        {/* <h2 className="text-blue-md mt-2 mb-4 font-semibold">
          EPS 및 매출 변동 추이를 확인하고, 투자 결정을 위한 필수 정보를 쉽고
          빠르게 확인하세요!
        </h2> */}
        <div className=" bg-gray-light flex-col p-8 rounded-lg justify-center">
          <div className="grid-cols-2 grid gap-8 mb-4">
            <h2 className="text-[16px] font-bold">분기별 EPS 변동 추이</h2>
            <h2 className="text-[16px] font-bold">분기별 매출 변동 추이</h2>
          </div>
          <EarningsChart />
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;
