import React, { useEffect, useState, useMemo } from "react";
import { timeAgo } from "../../../utils/timeAgo";
import { news } from "../../../api/othersApi";
import { HiPlusCircle } from "react-icons/hi";

const NEWS_SITE_URL = "https://finance.daum.net/global/news";

export default function News() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await news(); // API 호출

        if (response?.data?.data && Array.isArray(response.data.data)) {
          setNewsData(response.data.data);
        } else {
          console.error("잘못된 응답 구조:", response);
          setNewsData([]); // 빈 배열로 초기화하여 에러 방지
        }
      } catch (error) {
        console.error("뉴스 데이터를 가져오는 중 오류 발생:", error);
        setNewsData([]); // 네트워크 오류 시 빈 배열 유지
      }
    };

    fetchNews();
  }, []);

  // 🔹 `useMemo`로 안전한 데이터 변환 (undefined 방지)
  const safeNewsData = useMemo(
    () => (Array.isArray(newsData) ? newsData : []),
    [newsData]
  );

  // 🔹 `useMemo`로 상위 10개 뉴스만 필터링
  const topNews = useMemo(() => safeNewsData.slice(0, 10), [safeNewsData]);

  return (
    <div className="w-full">
      {/* 제목 */}
      <div className="flex items-end mb-4">
        <h1 className="text-[18px] font-bold mr-2">해외 증시 속보</h1>
        <a
          className="font-semibold text-blue-md text-center cursor-pointer hover:underline"
          href={NEWS_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          해외 증시 속보 보러가기
        </a>
      </div>

      {/* 데이터 로딩 또는 없는 경우 */}
      {safeNewsData.length === 0 ? (
        <p className="text-gray-500 text-center">
          뉴스 데이터를 불러오는 중...
        </p>
      ) : (
        <div className="w-full relative">
          <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-[rgba(255,255,255,0.8)] to-transparent pointer-events-none z-10"></div>

          <div className="overflow-auto no-scrollbar">
            {/* 가로 스크롤 적용 */}
            <div className="flex space-x-4 rounded-lg max-w-xl">
              {topNews.map((article, index) => (
                <a
                  key={index}
                  href={article.news_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="overflow-x-hidden rounded-lg w-72 flex flex-col duration-300 h-60">
                    {/* 뉴스 이미지 */}
                    <img
                      src={article.news_img.replace(/S\.jpg$/, "L.jpg")}
                      alt={article.news_title}
                      className="w-72 h-40 object-cover rounded-md transition-transform hover:scale-110"
                    />

                    {/* 뉴스 제목 */}
                    <h2 className="mt-2 font-semibold text-sm px-2">
                      {article?.news_title?.length > 53
                        ? `${article.news_title.slice(0, 53)}...`
                        : article.news_title}
                    </h2>

                    {/* 출처 및 시간 ("00분 전" 표시) */}
                    <p className="text-md text-gray-600 px-2 py-1">
                      {article.news_company} • {timeAgo(article.news_date)}
                    </p>
                  </div>
                </a>
              ))}

              {/* 더보기 버튼 */}
              <a
                href={NEWS_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center min-w-72 bg-gray-50 text-blue-md font-bold text-lg rounded-lg transition-all hover:bg-gray-200 duration-300"
              >
                <HiPlusCircle />
                <span className="ml-1">more</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
