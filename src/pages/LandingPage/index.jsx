import React, { useState } from "react";
import Disclosures from "./components/Disclosures";
import News from "./components/News";
import Stocks from "./components/Stocks";

export default function Index() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full overflow-hidden px-4">  {/* 좌우 여백 추가 */}

      {/** 실시간 공시 정보 */}
      <div className="w-full mt-4">
        <Disclosures />
      </div>

      {/** 해외 경제 뉴스 */}
      <div className="w-full mt-4">
        <News />
      </div>

      {/** 해외 종목 순위 */}
      <div className="flex flex-wrap justify-start gap-4 w-full mt-4">
        <Stocks />
        <Stocks />
      </div>

    </div>
  );
}
