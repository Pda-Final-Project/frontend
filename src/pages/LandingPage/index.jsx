import React, { useState } from "react";
import Disclosures from "./components/Disclosures";
import News from "./components/News";
import Stocks from "./components/Stocks";
import BestStocks from "./components/BestStocks";

export default function Index() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col w-full p-4">  {/* 좌우 여백 추가 */}

      {/** 실시간 공시 정보 */}
      <div className="">
        <Disclosures />
      </div>

      {/** 해외 경제 뉴스 */}
      <div className="mt-4">
        <News />
      </div>

      {/** 해외 종목 순위 */}
      <div className="flex justify-between mt-4 w-full">
        <BestStocks />
        <Stocks />
      </div>

    </div>
  );
}
