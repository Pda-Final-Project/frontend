import React, { useEffect, useState } from "react";
import InsightBox from "../../components/disclosure/InsightBox";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFillingInfo } from "../../api/disclosureApi";
import DisclosureSummary from "./DisclosureSummary/DisclosureSummary";
import { IoChevronBack } from "react-icons/io5";
import { dummySummaryData } from "./dummySummaryData";
import { MdGTranslate } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";

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
        console.log(response.data.data);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      alert("서버 내부 오류가 발생했습니다..");
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
        {/** 공시 타입에 대한 팁 */}
        <div className="flex w-full bg-gray-light p-4 rounded-lg text-[14px] text-gray-dark mt-8">
          수시보고서를 통해 어쩌구 저쩌구 인사이트를 얻어보세요
        </div>
      </div>

      {/* 공시 추가 인사이트 */}
      {filling.fillingType == "10-Q" || filling.fillingType == "8-K" ? (
        <InsightBox
          ticker={filling.fillingTicker}
          fillingType={filling.fillingType}
          filling10qJsonUrl={filling.filling10qJsonUrl}
        />
      ) : (
        ""
      )}

      {/* 공시 요약본 */}
      <div className="w-full h-full flex flex-col bg-white rounded-lg overflow-hidden">
        <DisclosureSummary summaryData={dummySummaryData} />
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
