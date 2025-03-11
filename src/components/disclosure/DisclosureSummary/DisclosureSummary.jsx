import React from "react";
import "./sec-summary.css";
import { FiTrendingUp, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export default function Summary({ summaryData }) {
  // summaryData가 문자열이라면 앞뒤 공백을 제거한 후 JSON으로 파싱해요.
  const data =
    typeof summaryData === "string"
      ? JSON.parse(summaryData.trim())
      : summaryData;

  return (
    <div className="p-8">
      <div className="summary-container text-[14px] w-full flex-col">
        <h2 className="text-[20px] font-semibold mb-4">SEC 10-Q 공시 요약</h2>

        <table className="w-full mb-12">
          <thead>
            <tr className="border-b-1 border-gray-md">
              <th className="py-4 w-1/4">항목</th>
              <th className="py-4 w-3/4">내용</th>
            </tr>
          </thead>
          <tbody>
            {data.table.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-blue-light ${
                  index % 2 === 0 ? "bg-gray-light" : ""
                }`}
              >
                <td
                  className="py-6 px-2 text-center font-semibold"
                  dangerouslySetInnerHTML={{ __html: row.항목 }}
                ></td>
                <td
                  className="py-6 px-2"
                  dangerouslySetInnerHTML={{ __html: row.내용 }}
                ></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="text-[20px] font-semibold mb-4">총평</h2>
        <p
          className="p-6 border border-gray-md rounded-lg text-[14px] bg-gray-light"
          dangerouslySetInnerHTML={{ __html: data.summary["전체 총평"] }}
        ></p>

        <div className="space-y-4 flex-col mt-4">
          <div className="flex gap-4">
            {/* 성장 요인 */}
            <div className="w-full flex-col items-start space-y-2 p-4 border border-blue-md rounded-lg text-blue-600 transition-transform hover:scale-105">
              <div className="flex gap-2 items-center">
                <FiTrendingUp className="h-[16px] w-[16px] " />
                <h4 className="font-semibold">주요 성장 요인</h4>
              </div>
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: data.summary["주요 성장 요인"],
                }}
              ></p>
            </div>
            {/* 리스크 요인 */}
            <div className="w-full flex-col items-start p-4 space-y-2 border border-red-md rounded-lg transition-transform hover:scale-105">
              <div className="flex items-center gap-2">
                <FiAlertCircle className="h-[16px] w-[16px] text-red-700" />
                <h4 className="font-semibold text-red-700">주요 리스크 요인</h4>
              </div>

              <p
                className="text-sm text-red-700"
                dangerouslySetInnerHTML={{
                  __html: data.summary["주요 리스크 요인"],
                }}
              ></p>
            </div>
            {/* 전망 */}
            <div className="w-full flex-col items-start space-y-2 p-4 border border-green-600 rounded-lg transition-transform hover:scale-105">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="h-[16px] w-[16px] text-green-600" />
                <h4 className="font-semibold text-green-600">전망</h4>{" "}
              </div>
              <p
                className="text-sm text-green-600"
                dangerouslySetInnerHTML={{ __html: data.summary["전망"] }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
