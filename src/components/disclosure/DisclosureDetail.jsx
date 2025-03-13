import React, { useEffect, useState } from "react";
import InsightBox from "../../components/disclosure/InsightBox";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFillingInfo } from "../../api/disclosureApi";
import DisclosureSummary from "./DisclosureSummary/DisclosureSummary";
import { IoChevronBack } from "react-icons/io5";
import { dummySummaryData } from "./dummySummaryData";
import { MdGTranslate } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";
import { mapFilingType } from "../../utils/mappingFillingType";

export default function DisclosureDetail() {
  const { filling_id } = useParams();
  const [filling, setFilling] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    tryFetchFilling();
  }, []);

  const tryFetchFilling = async () => {
    try {
      const response = await fetchFillingInfo(filling_id);
      if (response.data.status == "FOUND") {
        setFilling(response.data.data);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // 공시 타입 설명을 반환하는 함수
  const getFillingTypeTip = (type) => {
    switch (type) {
      case "10-Q":
        return "10-Q (분기보고서)는 기업이 3개월마다 실적과 재무 상태를 보고하는 문서로, 투자자가 기업의 성과를 주기적으로 확인할 수 있어요. 연간 보고서인 10-K보다 간략하지만, 실적 흐름을 파악하는 데 중요한 자료예요.";
      case "8-K":
        return "8-K (수시 보고서)는 기업에 중요한 사건(예: CEO 교체, 합병, 파산 등)이 발생하면 즉시 투자자에게 알리는 보고서예요. 기업의 주요 변동 사항을 빠르게 파악할 수 있도록 제공돼요.";
      case "FormS-1":
        return "FormS-1(증권신고서)는 기업이 기업공개(IPO)를 통해 처음으로 주식을 발행할 때, 사업 개요와 재무 정보를 공개하는 보고서예요. 투자자는 이를 통해 기업의 성장 가능성과 리스크를 확인할 수 있어요.";
      case "SC 13D":
        return "Schedule 13D/13G (대량 보유 보고서)는 특정 투자자가 기업의 주식을 5% 이상 보유하게 되면 그 목적과 계획을 공개하는 보고서예요. 투자자의 의도를 파악하고 기업 지배 구조 변화를 예측하는 데 도움을 줘요.";
      case "Form4":
        return "Form 4 (내부자 거래 보고서)는 기업의 임원이나 주요 주주가 해당 기업의 주식을 매매할 경우, 이를 신고하는 문서예요. 내부자의 거래 동향을 확인하여 투자 판단에 활용할 수 있어요.";
      default:
        return "이 공시 유형에 대한 추가 설명이 없습니다.";
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="bg-white p-8 rounded-lg">
        {/* 공시 기본 정보 */}
        <div className="flex w-full justify-between items-center font-semibold rounded-lg bg-white">
          <div className="font-semibold text-[20px] flex items-center gap-4">
            <IoChevronBack
              className="hover:text-blue-md text-2xl cursor-pointer"
              onClick={() => {
                navigate(-1);
              }}
            />
            {filling.fillingTitle}
          </div>
          <div className="flex items-center gap-8 text-sm">
            <div>공시 분류: {filling.fillingType}</div>
            <div>제출일자: {filling.submitTimestamp}</div>
          </div>
        </div>

        {/* 공시 타입에 대한 팁 */}
        <div className="flex w-full bg-gray-light p-4 rounded-lg text-[14px] text-gray-dark mt-8">
          {getFillingTypeTip(mapFilingType(filling.fillingType))}
        </div>
      </div>

      {/* 공시 추가 인사이트 */}
      {mapFilingType(filling.fillingType) == "10-Q" ? (
        <InsightBox
          ticker={filling.fillingTicker}
          fillingType={mapFilingType(filling.fillingType)}
          filling10qJsonUrl={filling.filling10qJsonUrl}
        />
      ) : (
        ""
      )}
      {/* 공시 요약본 */}
      <div className="w-full h-full flex flex-col bg-white rounded-lg overflow-hidden">
        <DisclosureSummary
          summaryData={dummySummaryData}
          fillingId={filling_id}
        />
      </div>

      {/* 공시 원문 */}
      <div className="w-full flex justify-between bg-white rounded-lg p-8 text-[14px]">
        <div
          className="flex gap-2 duration-300 items-center bg-blue-md text-white py-2 px-4 rounded-lg hover:bg-blue-light hover:text-black cursor-pointer"
          onClick={() => {
            window.open(filling.fillingTranslatedContentUrl, "_self");
          }}
        >
          <MdGTranslate />
          공시 번역 보기
        </div>
        <div
          className="flex gap-2 duration-300 items-center bg-blue-md text-white py-2 px-4 rounded-lg hover:bg-blue-light hover:text-black cursor-pointer"
          onClick={() => {
            window.open(filling.fillingUrl, "_self");
          }}
        >
          <IoDocumentTextSharp />
          공시 원문 보기
        </div>
      </div>
    </div>
  );
}
