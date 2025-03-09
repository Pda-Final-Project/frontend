import React from "react";
import "./sec-summary.css";
import { FiTrendingUp, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
// 공시 요약 부분
export default function Summary({ summaryData }) {
  return (
    <div className="p-8">
      <div className="summary-container text-[14px] w-full flex-col">
        <h2 className="text-[20px] font-semibold mb-4">SEC 8-K 공시 요약</h2>

        <table className="w-full mb-12">
          <thead>
            <tr className="border-b-1 border-gray-md">
              <th className="py-4 w-1/4">항목</th>
              <th className="py-4 w-3/4">내용</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-light">
              <td className="py-6 px-2">
                🏢 <span className="font-semibold">보고 기업 정보</span>
              </td>
              <td className="py-6 px-2">
                <span className="bold">Trimont LLC</span> <br />
                공시 제출일: 2025-02-28
              </td>
            </tr>
            <tr>
              <td className="py-6 px-2">
                📑 <span className="bold">공시 사유</span>
              </td>
              <td className="py-6 px-2">
                <span className="bold">Item 2.01 – 자산 인수</span>
                <br />
                웰스파고 은행의 상업용 모기지 서비스 사업의 제3자 서비스 부문
                인수 발표
              </td>
            </tr>
            <tr className="bg-gray-light">
              <td className="py-6 px-2">
                🔍 <span className="bold">핵심 내용 요약</span>
              </td>
              <td className="py-6 px-2">
                - Trimont는{" "}
                <span className="bold">
                  웰스파고의 상업용 모기지 서비스 사업의 제3자 서비스 부문을
                  인수
                </span>
                함.
                <br />- 인수 대상은 약{" "}
                <span className="highlight">$8억 4200만</span> 달러의 원금 및
                이자 포함.
                <br />- Trimont는{" "}
                <span className="bold">15년 이상의 운영 경험</span>을 보유하며,
                상업 및 다가구 대출을 관리.
                <br />- <span className="highlight">2024년</span> 기준으로
                서비스 포트폴리오에 약{" "}
                <span className="highlight">18,402개</span>의 대출 포함, 미지급
                원금 잔액 약 <span className="highlight">$4404억</span>에 달함.
              </td>
            </tr>
            <tr>
              <td className="py-6 px-2">
                📊 <span className="bold">영향 및 전망</span>
              </td>
              <td className="py-6 px-2">
                - Trimont의 웰스파고 인수는{" "}
                <span className="highlight">서비스 능력 향상</span>과{" "}
                <span className="highlight">시장 점유율 확대</span>로 이어질
                가능성이 있음.
                <br />
                - 인수 후에는 두 개의 대출 서비스 기술 플랫폼을 운영하여 고유한
                운영 지침에 따라 관리할 계획.
                <br />- 새로운 서비스 계약 체결로 인해{" "}
                <span className="highlight">운영 효율성</span>이 증가할 것으로
                예상됨.
              </td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-[20px] font-semibold mb-4">총평</h2>
        <p className="p-6 border border-blue-md rounded-lg text-[14px] bg-blue-50">
          이번 8-K 공시는 Trimont의{" "}
          <span className="bold">웰스파고 상업용 모기지 서비스 부문 인수</span>
          에 대한 중요한 발표입니다.
          <br />
          인수는 Trimont의 서비스 포트폴리오를 확장하고,{" "}
          <span className="highlight">운영 능력 향상</span>에 기여할 것으로
          보입니다.
          <br />
          또한, Trimont는 웰스파고와의 협력을 통해{" "}
          <span className="highlight">서비스 품질을 강화</span>할 수 있는 기회를
          가지게 됩니다.
          <br />
          <br />
          향후 이 인수가 Trimont의 시장 내 위치를 어떻게 변화시킬지는 주목할
          만한 사항이며,
          <br />
          장기적으로는 <span className="highlight">
            서비스 효율성 증대
          </span>와 <span className="highlight">수익성 향상</span>에 긍정적인
          영향을 미칠 것으로 예상됩니다.
        </p>
        <div className="space-y-4 flex-col mt-4">
          <div className="flex gap-4">
            {/* 성장 요인 */}
            <div className=" w-full flex items-start gap-3 p-4 border border-gray-md rounded-lg ">
              <FiTrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-semibold">주요 성장 요인</h4>
                <p className="text-sm">
                  AI 반도체 수요 증가, 신규 고객사 확보, 해외 시장 확대
                </p>
              </div>
            </div>

            {/* 리스크 요인 */}
            <div className="w-full flex items-start gap-3 p-4 border border-red-300 rounded-lg">
              <FiAlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <h4 className="font-semibold text-red-800">주요 리스크 요인</h4>
                <p className="text-sm text-red-700">
                  원자재 가격 상승, 경쟁 심화, 환율 변동성
                </p>
              </div>
            </div>
          </div>

          {/* 전망 */}
          <div className="flex items-start gap-3 p-4 border border-green-300 rounded-lg bg-green-50">
            <FiCheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <h4 className="font-semibold text-green-700">전망</h4>
              <p className="text-sm text-green-600">
                2024년 연간 실적은 AI 반도체 수요 지속과 신규 생산라인 가동으로
                인해 매출액 25~30%, 영업이익 20~25% 성장이 예상됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
