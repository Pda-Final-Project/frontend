import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchFillings } from "../../api/disclosureApi";

const fillingTypeData = [
  { id: "10-Q", name: "분기 보고서 (10-Q)" },
  { id: "8-K", name: "수시 보고서 (8-K)" },
  { id: "S-1", name: `증권 거래 신고서 (Form S-1)` },
  { id: "4", name: "내부자 거래 보고서 (Form4)" },
  { id: "SC-13G", name: "지분율 5% 이상 변동 보고서 (Schedule 13D/13G)" },
];

export default function DisclosureList({ ticker = "" }) {
  const navigate = useNavigate();
  const location = useLocation();

  // 검색 필터 상태
  const [tickerParam, setTickerParam] = useState(ticker);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fillingType, setFillingType] = useState("");

  // 페이지네이션 관련 상태
  const [fillings, setFillings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const reportsPerPage = 10;

  const tryFetchDisclosures = async (page = 0) => {
    const params = {
      ticker: tickerParam,
      fillingType,
      startDate,
      endDate,
      page,
      size: reportsPerPage,
    };
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(([_, value]) => value !== "")
    );
    try {
      const response = await fetchFillings(filteredParams);
      if (response.status == 404) {
        setFillings([]);
        setTotalPages(1);
        return;
      }
      if (response.data.status === "FOUND") {
        setFillings(response.data.data.content);
        setTotalPages(response.data.data.totalPages);
      }
    } catch (error) {
      console.error(error);
      setFillings([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    tryFetchDisclosures(currentPage);
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(0);
    tryFetchDisclosures(0);
  };

  const handleClick = (fillingId) => {
    const currentPath = location.pathname;
    if (currentPath.startsWith("/main") && currentPath.endsWith("/all")) {
      navigate(currentPath.replace("/all", `/${fillingId}`));
    } else {
      navigate(`${currentPath}/${fillingId}`);
    }
  };

  const resetSearch = () => {
    const currentPath = location.pathname;
    if (currentPath.startsWith("/main") && currentPath.endsWith("/all")) {
      setTickerParam(ticker);
    } else {
      setTickerParam("");
    }

    setStartDate("");
    setEndDate("");
    setFillingType("");
    setCurrentPage(0);
  };

  return (
    <div className="w-full flex flex-col gap-20 text-sm font-semibold transition-all duration-700 ease-out">
      {/* 검색 필터 */}
      <div className="bg-white rounded-lg">
        <div className="flex flex-col justify-center items-center mb-4">
          <h1 className="text-lg text-center font-bold mb-1">
            해외 공시 찾아보기
          </h1>
          <span className="text-blue-md text-center">
            🔎 SEC Edgar 공시를 쉽고 간편하게 검색해 보세요
          </span>
        </div>

        <div className="bg-gray-light p-5 rounded-lg flex flex-col justify-center items-center">
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-8 w-full">
            {/* 종목 검색 */}
            <div className="flex flex-col gap-3 w-full">
              <div className="flex items-center mt-6">
                <h2 className="text-md font-semibold w-1/8 mr-2">종목</h2>

                <input
                  type="text"
                  placeholder="종목코드를 입력하세요"
                  className="w-7/8 border bg-white border-gray-md px-2 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-md"
                  value={tickerParam}
                  onChange={(e) => setTickerParam(e.target.value)}
                />
              </div>

              {/* 기간 선택 */}
              <div className="flex items-center">
                <h2 className="text-md font-semibold w-1/8 mr-2">기간</h2>
                <div className="w-7/8 flex items-center justify-between">
                  <input
                    type="date"
                    className="border bg-white border-gray-md px-1 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-md w-full"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span className="px-1">-</span>
                  <input
                    type="date"
                    className="border bg-white border-gray-md px-1 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-md w-full"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* 공시유형 */}
            <div className="flex flex-col w-full">
              <h2 className="text-md font-semibold mb-2">공시유형</h2>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {fillingTypeData.slice(0, 4).map((type) => (
                  <button
                    key={type.id}
                    className={`px-4 py-2 rounded-md font-semibold ${
                      fillingType === type.id
                        ? "bg-blue-md text-white"
                        : "bg-white"
                    }`}
                    onClick={() =>
                      setFillingType(fillingType === type.id ? "" : type.id)
                    }
                  >
                    {type.name}
                  </button>
                ))}
              </div>
              <button
                key={fillingTypeData[4].id}
                className={`px-4 py-2 rounded-md font-semibold ${
                  fillingType === fillingTypeData[4].id
                    ? "bg-blue-md text-white"
                    : "bg-white"
                }`}
                onClick={() =>
                  setFillingType(
                    fillingType === fillingTypeData[4].id
                      ? ""
                      : fillingTypeData[4].id
                  )
                }
              >
                {fillingTypeData[4].name}
              </button>
            </div>
          </div>

          {/* 검색 버튼 */}
          <div className="flex mt-8 gap-8">
            <button
              className="text-center bg-blue-md px-4 py-2 rounded-lg w-60 text-white hover:bg-blue-light hover:text-black cursor-pointer duration-300"
              onClick={handleSearch}
            >
              검색하기
            </button>
            <button
              className="text-center cursor-pointer bg-white px-2 py-1 border-1 border-gray-md font-semibold rounded-lg w-60 hover:bg-blue-md duration-300"
              onClick={resetSearch}
            >
              초기화
            </button>
          </div>
        </div>
      </div>

      {/* 공시 리스트 */}
      <div className="bg-white rounded-lg">
        <h2 className="text-lg font-semibold mb-2 text-center">
          공시 검색 결과
        </h2>
        {fillings.length > 0 ? (
          <div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-1 border-gray-md text-gray-md">
                  <th className="p-3 w-1/6">공시 유형</th>
                  <th className="p-3 w-1/6">종목</th>
                  <th className="p-3 w-1/2">보고서명</th>
                  <th className="p-3 w-1/6">발행 일시</th>
                </tr>
              </thead>
              <tbody>
                {fillings?.map((report) => (
                  <tr
                    key={report.fillingId}
                    className="cursor-pointer hover:bg-blue-light duration-300 rounded-lg"
                    onClick={() => handleClick(report.fillingId)}
                  >
                    <td className="p-3">{report.fillingType}</td>
                    <td className="p-3">{report.fillingTicker}</td>
                    <td className="p-3">
                      {report.fillingTitle.trim() === ""
                        ? "예비 증권 거래 신고서"
                        : report.fillingTitle}
                    </td>
                    <td className="p-3">
                      {
                        new Date(report.submitTimestamp)
                          .toISOString()
                          .split("T")[0]
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* 페이지네이션 */}
            <div className="flex justify-center mt-8">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`mx-1 px-3 py-1 rounded-md ${
                    currentPage === i
                      ? "bg-blue-md text-white"
                      : "bg-gray-light"
                  }`}
                  onClick={() => setCurrentPage(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="min-h-30 flex w-full justify-center items-center font-medium text-gray-md">
            공시 검색 결과가 존재하지 않습니다.
          </div>
        )}
      </div>
    </div>
  );
}
