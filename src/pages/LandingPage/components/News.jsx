import React, { useState } from "react";
import DUMMY_NEWS from "./data/dummyNews";
import { timeAgo } from "../../../utils/timeAgo";

const TABS = ["Bloomberg", "Forbes", "Investing.com"];

// 각 탭별 메인 뉴스 사이트 URL
const NEWS_SITES = {
    Bloomberg: "https://www.bloomberg.com",
    Forbes: "https://www.forbes.com",
    "Investing.com": "https://www.investing.com",
};

export default function News() {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    return (
        <div className="p-4">
            {/* 제목 */}
            <h1 className="text-[18px] font-bold">글로벌 경제 뉴스</h1>

            {/* 탭 메뉴 */}
            <div className="flex space-x-3 my-5 border-b">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        className={`pb-2 px-4 font-semibold ${
                            activeTab === tab ? "border-b-2 border-blue-md text-blue-md" : "text-gray-500 hover:text-blue-md duration-300"
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* 컨테이너 */}
            <div className="w-full overflow-x-auto"> {/* ✅ 가로 스크롤 적용 */}
                <div className="flex space-x-4 p-4 rounded-lg min-w-max">
                    {DUMMY_NEWS[activeTab].slice(0, 10).map((article, index) => (
                        <a key={article.news_id} href={article.news_url} target="_blank" rel="noopener noreferrer">
                            <div className="bg-gray-50 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow min-w-[180px] sm:min-w-[220px] md:min-w-[260px] lg:min-w-[280px] max-w-[320px] flex flex-col duration-300">

                                {/* 뉴스 이미지 */}
                                <img
                                    src={article.news_img}
                                    alt={article.news_title}
                                    className="w-full h-40 object-cover rounded-md"
                                />
                                {/* 뉴스 제목 */}
                                <h2 className="mt-2 font-semibold text-sm">{article.news_title}</h2>
                                {/* 출처 및 시간 ("00분 전" 표시) */}
                                <p className="text-md text-gray-600">
                                    {article.news_company} • {timeAgo(article.news_date)}
                                </p>
                            </div>
                        </a>
                    ))}

                    {/* 더보기 버튼 */}
                    <a
                        href={NEWS_SITES[activeTab]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center min-w-[180px] sm:min-w-[220px] md:min-w-[260px] lg:min-w-[280px] max-w-[320px] bg-gray-150 text-gray-500 font-bold text-lg rounded-lg shadow-md transition-all hover:bg-gray-200 duration-300"
                    >
                        ➕ more
                    </a>
                </div>
            </div>
        </div>
    );
}
