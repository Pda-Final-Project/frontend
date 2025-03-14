import React, { useState, useEffect } from "react";
import Disclosures from "./components/Disclosures";
import News from "./components/News";
import Stocks from "./components/Stocks";

export default function Index() {
  const [showModal, setShowModal] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    disclosures: false,
    news: false,
    stocks: false,
  });

  useEffect(() => {
    setTimeout(
      () => setVisibleSections((prev) => ({ ...prev, disclosures: true })),
      100
    );
    setTimeout(
      () => setVisibleSections((prev) => ({ ...prev, news: true })),
      400
    );
    setTimeout(
      () => setVisibleSections((prev) => ({ ...prev, stocks: true })),
      700
    );
  }, []);

  return (
    <div className="flex flex-col w-full px-32 py-20 space-y-20">
      {/* 실시간 공시 정보 */}
      <div
        className={`transition-all duration-700 overflow-x-hidden${
          visibleSections.disclosures
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <Disclosures />
      </div>

      {/* 해외 경제 뉴스 */}
      <div
        className={`transition-all duration-700 ${
          visibleSections.news
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <News />
      </div>

      {/* 해외 종목 순위 */}
      <div
        className={`transition-all duration-700 ${
          visibleSections.stocks
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <Stocks />
      </div>
    </div>
  );
}
