import React from "react";
import { useParams } from "react-router-dom";

const CompanyInfo = ({ earningData }) => {
  const { ticker } = useParams(); // URL에서 ticker 가져오기

  if (!ticker) {
    return <p className="text-red-500">티커 정보를 찾을 수 없습니다.</p>;
  }

  // 현재 날짜 기준 가장 최근 실적 발표 데이터 찾기
  const today = new Date();
  const pastReports = earningData.filter(
    (data) => new Date(data.date) <= today
  );
  const latestReport = pastReports.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )[0];

  // 변동률(%) 계산 함수
  const calculatePercentageChange = (actual, estimated) => {
    if (!actual || !estimated) return null;
    return (((actual - estimated) / estimated) * 100).toFixed(2);
  };

  // 스타일 결정 함수
  const getTextColor = (value) => {
    if (value > 0) return "text-red-500"; // 양수 → 빨간색
    if (value < 0) return "text-blue-500"; // 음수 → 파란색
    return "text-gray-700"; // 기본색
  };

  const epsChange = latestReport
    ? calculatePercentageChange(
        parseFloat(latestReport.eps),
        parseFloat(latestReport.eps_estimated)
      )
    : null;

  const revenueChange = latestReport
    ? calculatePercentageChange(
        parseInt(latestReport.revenue),
        parseInt(latestReport.revenue_estimated)
      )
    : null;

  const formatToBillionWon = (amount) => {
    return amount
      ? (parseInt(amount) / 1_0000_0000).toFixed(2) + "억원"
      : "N/A";
  };

  return (
    <div className="flex bg-gray-light p-3 px-8 justify-between rounded-lg items-center w-full h-full">
      <div className="flex gap-4 items-center">
        {/* 기업 로고 */}
        <img
          src={`${import.meta.env.VITE_STOCK_LOGO_URL}${ticker}.png`}
          alt={`${ticker} 로고`}
          className="w-8 h-8 object-contain rounded-full"
        />
        {/* 기업명 */}
        <h2 className="text-lg font-semibold">{ticker}</h2>
      </div>
      <div className="flex gap-4 items-center text-sm font-semibold">
        {/* EPS 정보 */}
        {latestReport && (
          <div className="flex items-center space-x-1">
            <span>EPS |</span>
            <span>{latestReport.eps ?? "N/A"}</span>
            {epsChange !== null && (
              <span className={`${getTextColor(epsChange)} text-sm`}>
                ({epsChange}%)
              </span>
            )}
          </div>
        )}

        {/* 매출 정보 */}
        {latestReport && (
          <div className="flex items-center space-x-1">
            <span>매출 |</span>
            <span>{formatToBillionWon(latestReport.revenue)}</span>
            {revenueChange !== null && (
              <span className={`${getTextColor(revenueChange)} text-sm`}>
                ({revenueChange}%)
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyInfo;
