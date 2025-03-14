import React, { useState, useEffect } from "react";
import CompanyInfo from "./components/CompanyInfo";
import EarningsReport from "./components/EarningsReport";
import EarningsChart from "./components/EarningsChart";
import { useParams } from "react-router-dom";
import { fetchEarning } from "../../api/othersApi";

const EarningsPage = () => {
  const { ticker } = useParams();
  const [earningData, setEarningData] = useState([]);
  const [visible, setVisible] = useState(false);

  const tryFetchEarning = async () => {
    try {
      const response = await fetchEarning(ticker);
      if (response.data.status == "OK") {
        setEarningData(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    tryFetchEarning();
  }, [ticker]);
  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);
  return (
    <div
      className={`w-full h-full flex flex-col justify-center px-32 py-20 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="text-center">
        <h1 className="text-lg font-bold">실적 발표 및 어닝콜 정보</h1>
        <h2 className="text-blue-md mt-2 mb-4 font-semibold text-sm">
          기업의 실적 발표 일정을 한눈에 확인하고, 예상 EPS 및 매출과 실제
          실적을 비교해보세요.
        </h2>
      </div>

      {/* 기업 정보 */}
      <div className="flex  mb-5 mt-3">
        <CompanyInfo earningData={earningData} />
      </div>

      <div>
        {/* 실적 발표 정보 */}
        <div>
          <EarningsReport earningData={earningData} />
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
          <EarningsChart earningData={earningData} />
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;
