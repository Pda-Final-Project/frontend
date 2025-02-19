import React, { useState } from "react";
import DUMMY_NEWS from "./data/dummyNews"; // 더미 데이터 불러오기

const TABS = ["Bloomberg", "Forbes", "Investing.com"];

// 각 탭별 메인 뉴스 사이트 URL
const NEWS_SITES = {
    Bloomberg: "https://www.bloomberg.com",
    Forbes: "https://www.forbes.com",
    "Investing.com": "https://www.investing.com",
};

// 발행 시간을 "00분 전"으로 변환하는 함수
const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / (1000 * 60)); // 분 단위 차이 계산

    if (diff < 1) return "방금 전";
    if (diff < 60) return `${diff}분 전`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
};

export default function News() {
    const [activeTab, setActiveTab] = useState(TABS[0]);

    return (
        <div className="p-4">
            {/* 제목 */}
            <h1 className="text-2xl font-bold">🌍 글로벌 경제 뉴스</h1>

            {/* 탭 메뉴 */}
            <div className="flex space-x-4 my-4 border-b">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        className={`pb-2 px-4 font-semibold ${
                            activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* 가로 스크롤 컨테이너 */}
            <div className="overflow-x-auto mt-4">
                <div className="flex space-x-4 p-4 rounded-lg min-w-max">
                    {DUMMY_NEWS[activeTab].slice(0, 10).map((article, index) => (
                        <a key={article.news_id} href={article.news_url} target="_blank" rel="noopener noreferrer">
                            <div className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow min-w-[220px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[350px] max-w-[400px] flex flex-col">
                                {/* 뉴스 이미지 */}
                                <img
                                    src={article.news_img}
                                    alt={article.news_title}
                                    className="w-full h-40 object-cover rounded-md"
                                />
                                {/* 뉴스 제목 */}
                                <h2 className="mt-2 font-bold text-lg">{article.news_title}</h2>
                                {/* 출처 및 시간 ("00분 전" 표시) */}
                                <p className="text-sm text-gray-600">
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
                        className="flex items-center justify-center min-w-[220px] sm:min-w-[280px] md:min-w-[320px] lg:min-w-[350px] max-w-[400px] bg-gray-150 text-gray-500 font-bold text-lg rounded-lg shadow-md transition-all hover:bg-gray-300"
                    >
                        ➕ more
                    </a>
                </div>
            </div>
        </div>
    );
}
