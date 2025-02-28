import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  // 검색 필터 상태
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedReportType, setSelectedReportType] = useState("수시 보고서");

  // 더미 공시 데이터 (API 연동 가능)
  const DUMMY_REPORTS = Array(15).fill({
    type: "8-K",
    title: "테슬라 수시보고서",
    date: "2025-00-00",
  });

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5;

  // 현재 페이지에 해당하는 공시 데이터
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = DUMMY_REPORTS.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  return (
    <div className="w-full p-5 mx-auto">
      {/* 검색 필터 */}
      <h1 className="text-lg font-bold mb-3">해외 공시</h1>

      <div className="bg-gray-100 p-5 rounded-lg">
        {/* 왼쪽(종목 + 기간) / 오른쪽(공시유형) 배치 */}
        <div className="flex justify-between gap-5">
          {/* 왼쪽 (종목명 + 기간) */}
          <div className="flex flex-col w-1/2 gap-3">
            {/* 종목 검색 */}
            <div className="flex items-center">
              <h2 className="text-md font-semibold w-16">종목</h2>
              <input
                type="text"
                placeholder="종목명을 입력하세요"
                className="bg-white p-2 w-full rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* 기간 선택 */}
            <div className="flex items-center">
              <h2 className="text-md font-semibold w-16">기간</h2>
              <input
                type="date"
                className="bg-white p-2 rounded-md flex-grow"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="px-3">~</span>
              <input
                type="date"
                className="bg-white p-2 rounded-md flex-grow"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          {/* 오른쪽 (공시유형) */}
          <div className="ml-50 flex flex-col w-1/2">
            <h2 className="text-md font-semibold mb-2">공시유형</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "연간 보고서",
                "분기 보고서",
                "수시 보고서",
                "증권 발행 등록 신고서",
                "내부자 거래 보고서",
                "주식 대량 보유 보고서",
              ].map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-md ${
                    selectedReportType === type
                      ? "bg-blue-md text-white"
                      : "bg-white"
                  }`}
                  onClick={() => setSelectedReportType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 검색 버튼 (맨 아래 중앙 정렬) */}
        <div className="flex justify-center mt-5">
          <button className="w-100 bg-blue-md text-white px-6 py-2 rounded-md">
            공시 검색하기
          </button>
        </div>
      </div>

      {/* 공시 리스트 */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">공시 검색 결과</h2>
        <div className="border border-gray-300 rounded-lg">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-light">
                <th className="p-3">지수 종류</th>
                <th className="p-3">보고서명</th>
                <th className="p-3">발행 일시</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((report, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-100 cursor-pointer"
                  onClick={() => navigate(`/disclosures/${index}`)}
                >
                  <td className="p-3">{report.type}</td>
                  <td className="p-3">{report.title}</td>
                  <td className="p-3">{report.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-4">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === page ? "bg-blue-md text-white" : "bg-gray-light"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
