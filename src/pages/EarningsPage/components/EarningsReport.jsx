import React from "react";

const EarningsReport = ({ earningData }) => {
  if (!earningData || earningData.length === 0)
    return <p>데이터가 없습니다.</p>;
  const now = new Date();

// 가장 최근 실적 발표 데이터 필터링
const latestReportIndex = earningData
  .map((data, index) => ({ ...data, index })) // 인덱스 추가
  .filter((data) => data.eps_estimated && data.revenue_estimated && new Date(data.date) <= now)
  .sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.index; // 최신 데이터의 인덱스 가져오기

  const latestReport = earningData[latestReportIndex];
  const nextReport = earningData[latestReportIndex+1];

  // 변동률(%) 계산
  const calculatePercentageChange = (actual, estimated) => {
    if (!actual || !estimated) return null;
    return (((actual - estimated) / estimated) * 100).toFixed(2);
  };

  const getTextColor = (value) => {
    if (value > 0) return "text-red-md";
    if (value < 0) return "text-blue-dark";
    return "text-gray-700";
  };

  const formatToBillionWon = (amount) => {
    return amount
      ? (parseInt(amount) / 1_0000_0000).toFixed(2) + "억원"
      : "N/A";
  };
  // amc, bmo 변환
  const formatTime = (time) => {
    return time === "amc" ? "폐장후" : time === "bmo" ? "개장전" : time;
  };

  return (
    <div>
      <div className="bg-gray-light mb-5 flex gap-8 justify-center p-8 rounded-lg">
        {/* 가장 최근 발표된 실적 데이터 */}
        {latestReport && (
          <div className="w-full">
            <h2 className="font-bold text-[16px] mb-3">가장 최근 실적 발표</h2>
            <div className="bg-white p-8 rounded-md shadow-md text-sm w-full">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">실적 발표일</span>
                <span>{latestReport.date}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">발표 시간</span>
                <span>{formatTime(latestReport.time)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">예상 EPS</span>
                <span>{latestReport.eps_estimated}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">실제 EPS</span>
                <span>
                  {latestReport.eps ?? "N/A"}{" "}
                  {latestReport.eps && (
                    <span
                      className={`${getTextColor(
                        calculatePercentageChange(
                          parseFloat(latestReport.eps),
                          parseFloat(latestReport.eps_estimated)
                        )
                      )} text-sm`}
                    >
                      (
                      {calculatePercentageChange(
                        parseFloat(latestReport.eps),
                        parseFloat(latestReport.eps_estimated)
                      )}
                      %)
                    </span>
                  )}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">예상 매출</span>
                <span>
                  {formatToBillionWon(latestReport.revenue_estimated)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">실제 매출</span>
                <span>
                  {formatToBillionWon(latestReport.revenue) ?? "N/A"}
                  {latestReport.revenue && (
                    <span
                      className={`${getTextColor(
                        calculatePercentageChange(
                          parseInt(latestReport.revenue),
                          parseInt(latestReport.revenue_estimated)
                        )
                      )} text-sm`}
                    >
                      (
                      {calculatePercentageChange(
                        parseInt(latestReport.revenue),
                        parseInt(latestReport.revenue_estimated)
                      )}
                      %)
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 다가올 실적 발표 데이터 */}
       {/* 다가올 실적 발표 데이터 */}
{nextReport && (
  <div className="w-full">
    <h2 className="font-bold text-[16px] mb-3">다가올 실적 발표</h2>
    <div className="bg-white w-full p-8 rounded-md shadow-md text-sm">
      <div className="flex justify-between mb-3">
        <span className="font-semibold">실적 발표 예정일</span>
        <span>{nextReport.date}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="font-semibold">예상 EPS</span>
        <span>{nextReport.eps_estimated!=='null' ? nextReport.eps_estimated :<p className="text-gray-400">발표 예정</p>}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="font-semibold">실제 EPS</span>
        <span className="text-gray-400">발표 예정</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="font-semibold">예상 매출</span>
        <span>{nextReport.revenue_estimated!=='null' ? formatToBillionWon(nextReport.revenue_estimated) : <p className="text-gray-400">발표 예정</p>}</span>
      </div>
      
      <div className="flex justify-between">
        <span className="font-semibold">실제 매출</span>
        <span className="text-gray-400">발표 예정</span>
      </div>
    </div>
  </div>


        )}
      </div>
    </div>
  );
};

export default EarningsReport;
