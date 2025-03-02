import React, { useState } from "react";
import Disclosures from "./components/Disclosures";
import News from "./components/News";
import Stocks from "./components/Stocks";

export default function Index() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col w-full px-32 py-20 space-y-20">
      {" "}
      {/* 좌우 여백 추가 */}
      {/** 실시간 공시 정보 */}
      <div className="">
        <Disclosures />
      </div>
      {/** 해외 경제 뉴스 */}
      <div className="">
        <News />
      </div>
      {/** 해외 종목 순위 */}
      <div className="flex w-full">
        <Stocks />
      </div>
    </div>
  );
}
