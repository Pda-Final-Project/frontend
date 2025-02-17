import React from "react";
import Disclosures from "./components/Disclosures";
import News from "./components/News";
import Stocks from "./components/Stocks";

export default function index() {
  return (
    <div>
      {/** 실시간 공시 정보 */}
      <div>
        <Disclosures />
      </div>

      {/** 해외 경제 뉴스 */}
      <div>
        <News />
      </div>

      {/** 해외 종목 순위 */}
      <div>
        <Stocks />
      </div>
    </div>
  );
}
