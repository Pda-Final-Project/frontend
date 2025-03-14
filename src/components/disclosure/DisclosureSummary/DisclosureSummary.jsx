import { useEffect, useState } from "react";
import "./sec-summary.css";
import { FiTrendingUp, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import axios from "axios";

export default function Summary({ summaryData, fillingId }) {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("");

  const tryFetchSummaryData = async () => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_FILL_SUMMARY}${fillingId}.json`
      );
      if (response.status === 200) {
        const rawData = response.data;
        const parsedData =
          typeof rawData === "string" ? JSON.parse(rawData) : rawData;
        console.log(parsedData);
        setData(parsedData);
        setActiveTab(Object.keys(parsedData.content)[0]); // content의 첫 번째 키를 기본 활성 탭으로 설정
      }
    } catch (error) {
      console.error("Error fetching summary data:", error.message);
    }
  };

  useEffect(() => {
    tryFetchSummaryData();
  }, [fillingId]);

  if (!data) return <p>Loading...</p>;

  const { info, content, summary } = data;
  const contentTabs = Object.keys(content);
  const infoEntries = Object.entries(info); // info 객체를 동적으로 처리

  const {
    총평: overallSummary,
    "시장 영향": marketImpact,
    "주요 리스크 요인": riskFactor,
    "장단기 전망": outlook,
  } = summary || {};
  const hasExtraSummary = marketImpact || riskFactor || outlook;

  return (
    <div className="p-8">
      <div className="summary-container text-[14px] w-full flex-col">
        <h1 className="text-[18px] font-semibold mb-3">SEC 공시 요약</h1>
        <div className="flex justify-between gap-4">
          {/* 공시 정보 동적 처리 */}
          {infoEntries.map(([key, value]) => (
            <section
              className="bg-gray-light rounded-lg p-6 mb-4 border border-gray-200 w-full"
              key={key}
            >
              <h2 className="text-[16px] font-bold mb-2">{key}</h2>
              <p dangerouslySetInnerHTML={{ __html: value }} />
            </section>
          ))}
        </div>

        {/* 동적 탭 생성 (content 키) */}
        <div className="flex border-b border-gray-md mb-4">
          {contentTabs.map((tab) => (
            <button
              key={tab}
              className={`py-3 px-6 font-medium ${
                activeTab === tab
                  ? "border-b-4 border-blue-md text-blue-md font-semibold"
                  : "text-gray-md"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
          <button
            className={`py-3 px-6 ${
              activeTab === "총평"
                ? "border-b-4 border-blue-md text-blue-md font-semibold"
                : "text-gray-md"
            }`}
            onClick={() => setActiveTab("총평")}
          >
            총평
          </button>
        </div>

        {/* 탭 콘텐츠 렌더링 */}
        <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          {contentTabs.includes(activeTab) && (
            <div dangerouslySetInnerHTML={{ __html: content[activeTab] }} />
          )}

          {activeTab === "총평" && (
            <p dangerouslySetInnerHTML={{ __html: overallSummary }} />
          )}
        </section>

        {/* 추가 요약 (리스크, 시장 영향, 전망) */}
        {hasExtraSummary && (
          <div className="space-y-4 flex-col mt-4">
            <div className="flex gap-4">
              {marketImpact && (
                <div className="w-full p-4 border border-l-8 border-blue-500 rounded-lg hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2 mb-2">
                    <FiTrendingUp className="text-blue-600" />
                    <h4 className="font-semibold text-blue-500">시장 영향</h4>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: marketImpact }} />
                </div>
              )}

              {riskFactor && (
                <div className="w-full p-4 border border-l-8 border-red-400 rounded-lg hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2 mb-2">
                    <FiAlertCircle className="text-red-600" />
                    <h4 className="font-semibold text-red-600">
                      주요 리스크 요인
                    </h4>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: riskFactor }} />
                </div>
              )}

              {outlook && (
                <div className="w-full p-4 border border-l-8 border-green-500 rounded-lg hover:scale-105 transition-transform">
                  <div className="flex items-center gap-2 mb-2">
                    <FiCheckCircle className="text-green-600" />
                    <h4 className="font-semibold text-green-600">
                      장단기 전망
                    </h4>
                  </div>
                  <p dangerouslySetInnerHTML={{ __html: outlook }} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
