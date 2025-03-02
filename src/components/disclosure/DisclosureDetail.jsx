import React, { useEffect, useState } from "react";
import InsightBox from "../../components/disclosure/InsightBox";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFillingInfo } from "../../api/disclosureApi";
import { IoChevronBack } from "react-icons/io5";

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
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error.message);
      alert("서버 내부 오류가 발생했습니다..");
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* 공시 기본 정보 */}
      <div className="flex w-full p-6 justify-between items-center font-semibold rounded-lg bg-white">
        <div className="font-semibold text-lg flex items-center gap-4">
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
      {/* 공시 추가 인사이트 */}
      {filling.fillingType == "10-Q" || filling.fillingType == "8-K" ? (
        <div className="w-full flex flex-col p-6 bg-white rounded-lg">
          <InsightBox
            fillingType={filling.fillingType}
            filling10qJsonUrl={filling.filling10qJsonUrl}
          />
        </div>
      ) : (
        ""
      )}

      {/* 공시 요약본 */}
      <div className="w-full flex flex-col p-6 bg-white rounded-lg"></div>
      {/* 공시 원문 */}
      <div className="w-full flex flex-col p-6 bg-white rounded-lg"></div>
      {/* 공시 요약본 */}
    </div>
  );
}
