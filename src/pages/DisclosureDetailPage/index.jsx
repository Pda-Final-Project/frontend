import React, { useEffect, useState } from "react";
import InsightBox from "../../components/disclosure/InsightBox";
import { useParams } from "react-router-dom";
import { fetchFillingInfo } from "../../api/disclosureApi";
import DisclosureDetail from "../../components/disclosure/DisclosureDetail";

export default function DisclosureDetailPage() {
  const { filling_id } = useParams();

  const [filling, setFilling] = useState({});

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
    <div className="w-full h-full px-32 py-20 bg-gray-light">
      <DisclosureDetail />
    </div>
  );
}
