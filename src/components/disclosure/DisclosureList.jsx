import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchFillings } from "../../api/disclosureApi";

const fillingTypeData = [
  { id: "10-Q", name: "분기 보고서 (10-Q)" },
  { id: "8-K", name: "수시 보고서 (8-K)" },
  { id: "S-1", name: "증권 거래 신고서 (Form S-1)" },
  { id: "4", name: "내부자 거래 보고서 (Form4)" },
  { id: "SC 13G", name: "지분율 5% 이상 변동 보고서 (Schedule 13D/13G)" },
];

export default function DisclosureList() {
  const navigate = useNavigate();
  const location = useLocation();

  // 검색 필터 상태
  const [ticker, setTicker] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fillingType, setFillingType] = useState("");

  const [fillings, setFillings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 10;

  const tryFetchDisclosures = async () => {
    const params = {
      ticker,
      fillingType,
      startDate,
      endDate,
    };
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== "")
    );
    try {
      const response = await fetchFillings(filteredParams);

      if (response.data.status === "FOUND") {
        setFillings(response.data.data.content);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    tryFetchDisclosures();
  };

  useEffect(() => {
    tryFetchDisclosures();
  }, []);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = fillings.slice(indexOfFirstReport, indexOfLastReport);

  const handleClick = (fillingId) => {
    const currentPath = location.pathname;

    if (currentPath.startsWith("/main") && currentPath.endsWith("/all")) {
      navigate(currentPath.replace("/all", `/${fillingId}`));
    } else {
      navigate(`${currentPath}/${fillingId}`);
    }
  };

  const resetSearch = () => {
    setCurrentPage(1);
    setEndDate("");
    setStartDate("");
    setFillingType("");
    setTicker("");
  };

  return (
    <div className="w-full flex flex-col gap-4 text-sm font-semibold">
      {/* 검색 필터 */}
      <div className="bg-white p-4">
        <div className="flex flex-col justify-center items-center mt-3 mb-3">
          <h1 className="text-lg text-center font-bold mb-1">
            해외 공시 찾아보기{" "}
          </h1>
          <span className="text-blue-md text-center">
            {" "}
            🔎 SEC Edgar 공시를 쉽고 간편하게 검색해 보세요
          </span>
        </div>

        <div className="bg-gray-light p-5 rounded-lg flex flex-col justify-center items-center">
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-12 w-full">
            {/* 왼쪽 (종목명 + 기간) */}
            <div className="flex flex-col gap-3 w-full">
              {/* 종목 검색 */}
              <div className="flex items-center mt-6">
                <h2 className="text-md font-semibold w-1/6">종목</h2>
                <div className="w-5/6">
                  <input
                    type="text"
                    placeholder="종목코드를 입력하세요"
                    className="input-style"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                  />
                </div>
              </div>

              {/* 기간 선택 */}
              <div className="flex items-center">
                <h2 className="text-md font-semibold w-1/6">기간</h2>
                <div className="w-5/6 flex items-center">
                  <input
                    type="date"
                    className="input-style"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span className="px-1">-</span>
                  <input
                    type="date"
                    className="input-style"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* 오른쪽 (공시유형) */}
            <div className="flex flex-col w-full">
              <h2 className="text-md font-semibold mb-2">공시유형</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
                {fillingTypeData.map((type) => (
                  <button
                    key={type.id}
                    className={`px-4 py-2 rounded-md font-semibold ${
                      fillingType === type.id
                        ? "bg-blue-md text-white"
                        : "bg-white"
                    }`}
                    onClick={() => {
                      fillingType == type.id
                        ? setFillingType("")
                        : setFillingType(type.id);
                    }}
                  >
                    {type.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 검색 버튼 */}
          <div className="flex flex-col sm:flex-row mt-8 w-100 gap-8 justify-center">
            <button className="button-style" onClick={handleSearch}>
              검색하기
            </button>
            <button className="white-button-style" onClick={resetSearch}>
              초기화
            </button>
          </div>
        </div>
      </div>

      {/* 공시 리스트 */}
      <div className="bg-white p-4 py-8 rounded-lg">
        <h2 className="text-lg font-semibold mb-2 text-center">
          공시 검색 결과
        </h2>
        <div className="rounded-lg bg-white p-2">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-1 border-gray-md text-gray-md">
                <th className="p-3">지수 종류</th>
                <th className="p-3">보고서명</th>
                <th className="p-3">발행 일시</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((report, index) => (
                <tr
                  key={index}
                  className={`cursor-pointer hover:bg-blue-light rounded-lg ${
                    index % 2 === 0 ? "bg-gray-light" : "bg-white"
                  }`}
                  onClick={() => handleClick(report.fillingId)}
                >
                  <td className="p-3">{report.fillingType}</td>
                  <td className="p-3">{report.fillingTitle}</td>
                  <td className="p-3">{report.submitTimestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="flex justify-center mt-8">
          {Array.from(
            { length: Math.ceil(fillings.length / reportsPerPage) },
            (_, i) => i + 1
          ).map((page) => (
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
