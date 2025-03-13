import { React, useState } from "react";
import "./sec-summary.css";
import { FiTrendingUp, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export default function Summary({ summaryData }) {
  const data =
    typeof summaryData === "string"
      ? JSON.parse(summaryData.trim())
      : summaryData;

  const marketImpact = data.summary["시장 영향"];
  const riskFactor = data.summary["주요 리스크 요인"];
  const outlook = data.summary["장단기 전망"];

  const hasExtraSummary = marketImpact || riskFactor || outlook;

  // tab section
  const [activeTab, setActiveTab] = useState("핵심 내용");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-8">
      <div className="summary-container text-[14px] w-full flex-col">
        <h1 className="text-[20px] font-semibold mb-2">SEC 10-Q 공시 요약</h1>
        <h5 className="text-gray-600 mb-2">TSLA 분기 보고서 분석</h5>
        <div className="border-b border-gray-200 mb-2"></div>
        {/* 보고 기업 정보 */}
        <section className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-lg font-bold mb-2">보고 기업 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div></div>
          </div>
        </section>
        {/* 공시 사유 */}
        <section className="bg-gray-50 rounded-lg p-6 mb-6">
          <h1 className="text-lg font-bold mb-2">공시 사유</h1>
          <div className="flex items-start">
            <div className="inline-block bg-white border border-gray-300 rounded-full px-3 py-1 text-sm font-medium mr-3"></div>
            {/* item number */}
            <div>
              <p className="font-bold text-lg">경영진 변화</p>
              <p className="text-gray-600">
                CEO 교체 발표 (Elon Musk → Tom Zhu)
              </p>
            </div>
          </div>
        </section>
        {/* 탭 네비게이션 */}
        <div className="flex border-b border-gray-200 mb-6">
          {["핵심 내용", "시장 영향", "총평"].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-6 font-medium ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* 탭 콘텐츠 */}
        <section className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          {activeTab === "핵심 내용" && (
            <ul className="list-disc pl-6 space-y-4">
              <li className="text-lg">
                Tesla는 Elon Musk가 CEO직에서 사임하고, Tom Zhu가 신임 CEO로
                임명되었음을 발표함.
              </li>
              <li className="text-lg">
                이사회는 2025년 3월 1일부터 변경이 유효함을 승인함.
              </li>
              <li className="text-lg">
                Musk는 이사회 의장직 유지 및 제품 혁신 담당 역할 수행 예정.
              </li>
            </ul>
          )}

          {activeTab === "시장 영향" && (
            <div className="text-lg">
              <p>시장 영향 내용이 여기에 표시됩니다.</p>
            </div>
          )}

          {activeTab === "총평" && (
            <div className="text-lg">
              <p>총평 내용이 여기에 표시됩니다.</p>
            </div>
          )}
        </section>

        {/* 아래는 data.summay 가져와서 랜더링한거 */}

        <h2 className="text-[20px] font-semibold mb-4">총평</h2>
        <p
          className="p-6 border-1 border-gray-300 rounded-lg text-[14px] bg-gray-light"
          dangerouslySetInnerHTML={{ __html: data.summary["총평"] }}
        ></p>

        {hasExtraSummary && (
          <div className="space-y-4 flex-col mt-4">
            <div className="flex gap-4">
              {marketImpact && (
                <div className="w-full flex-col items-start space-y-2 p-4  border-1 border-gray-300 border-l-blue-500 border-l-3 rounded-lg transition-transform hover-container hover: duration-300 hover:scale-105">
                  <div className="flex gap-2 items-center">
                    <FiTrendingUp className="h-[16px] w-[16px] text-blue-600" />
                    <h4 className="font-semibold text-blue-600">시장 영향</h4>
                  </div>
                  <p
                    className="text-sm text-blue-600 hover-expand"
                    dangerouslySetInnerHTML={{ __html: marketImpact }}
                  ></p>
                </div>
              )}

              {riskFactor && (
                <div className="w-full flex-col items-start p-4 space-y-2 border-1 border-gray-300 border-l-red-400 border-l-3 rounded-lg transition-transform hover-container hover: duration-300 hover:scale-105">
                  <div className="flex items-center gap-2">
                    <FiAlertCircle className="h-[16px] w-[16px] text-red-700" />
                    <h4 className="font-semibold text-red-700">
                      주요 리스크 요인
                    </h4>
                  </div>
                  <p
                    className="text-sm text-red-700 hover-expand"
                    dangerouslySetInnerHTML={{ __html: riskFactor }}
                  ></p>
                </div>
              )}

              {outlook && (
                <div className="w-full flex-col items-start space-y-2 p-4 border-1 border-gray-300 border-l-green-500 border-l-3 rounded-lg transition-transform hover-container hover: duration-300 hover:scale-105">
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="h-[16px] w-[16px] text-green-700" />
                    <h4 className="font-semibold text-green-700">
                      장단기 전망
                    </h4>
                  </div>
                  <p
                    className="text-sm text-green-700 hover-expand"
                    dangerouslySetInnerHTML={{ __html: outlook }}
                  ></p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// }
