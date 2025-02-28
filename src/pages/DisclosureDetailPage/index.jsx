import React, { useState } from "react";
import InsightBox from "../../components/disclosure/InsightBox";

export default function DisclosureDetailPage() {
  const [filling, setFilling] = useState({
    fillingId: "0000320193-25-000008",
    fillingTitle: "분기 보고서",
    fillingType: "10-Q",
    fillingTicker: "AAPL",
    fillingUrl:
      "https://www.sec.gov/Archives/edgar/data/320193/000032019325000008/aapl-20241228.htm",
    fillingFileType: "htm",
    fillingTranslatedContentUrl:
      "https://finpago-bucket.s3.amazonaws.com/fillings/0000320193-25-000008.html",
    filling10qJsonUrl:
      "https://finpago-bucket.s3.amazonaws.com/fillings/json/0000320193-25-000008.json",
    submitTimestamp: "2025-01-31",
  });

  return (
    <div className="flex flex-col gap-4">
      {/* 공시 기본 정보 */}
      <div className="flex w-full p-6 justify-between items-center font-semibold rounded-lg bg-white">
        <div className="font-semibold text-lg">{filling.fillingTitle}</div>
        <div className="flex items-center gap-8 text-sm">
          <div>공시 분류: {filling.fillingType}</div>
          <div>제출일자: {filling.submitTimestamp}</div>
        </div>
      </div>
      {/* 공시 추가 인사이트 */}
      <div className="w-full flex flex-col p-6 bg-white rounded-lg">
        <InsightBox />
      </div>
      {/* 공시 요약본 */}
      <div></div>
      {/* 공시 원문 */}
      <div></div>
      {/* 공시 요약본 */}
    </div>
  );
}
