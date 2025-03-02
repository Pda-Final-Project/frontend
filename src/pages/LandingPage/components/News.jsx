import React, { useEffect, useState } from "react";
import { timeAgo } from "../../../utils/timeAgo";
import { news } from "../../../api/newsApi";
import { HiPlusCircle } from "react-icons/hi";

const NEWS_SITE_URL = "https://www.investing.com";

export default function News() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await news(); // API 호출

        // 응답이 정상적인지 확인 후 상태 업데이트
        if (response && response.data && Array.isArray(response.data.data)) {
          setNewsData(response.data.data); // API 응답에서 'data' 배열을 저장
        } else {
          console.error("잘못된 응답 구조:", response);
          setNewsData([]); // 에러 방지를 위해 빈 배열로 설정
        }
      } catch (error) {
        console.error("뉴스 데이터를 가져오는 중 오류 발생:", error);
        setNewsData([]);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="w-full p-4">
      {/* 제목 */}
      <h1 className="text-[18px] font-bold ml-3">글로벌 경제 뉴스</h1>
      {/* 데이터가 로딩되지 않았을 경우 표시 */}
      {newsData.length === 0 ? (
        <p className="text-gray-500 text-center">
          뉴스 데이터를 불러오는 중...
        </p>
      ) : (
        <div className="w-full overflow-auto no-scrollbar">
          {" "}
          {/* 가로 스크롤 적용 */}
          <div className="flex space-x-4 p-4 rounded-lg max-w-screen-xl">
            {newsData.slice(0, 10).map((article, index) => (
              <a
                key={index}
                href={article.news_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-gray-50 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow min-w-[180px] sm:min-w-[220px] md:min-w-[260px] lg:min-w-[280px] max-w-[320px] flex flex-col duration-300 h-60">
                  {/* 뉴스 이미지 */}
                  <img
                    src={article.news_img.replace(/S\.jpg$/, "L.jpg")}
                    alt={article.news_title}
                    className="w-72 h-40 object-cover rounded-md"
                  />

                  {/* 뉴스 제목 */}
                  <h2 className="mt-2 font-semibold text-sm">
                    {article.news_title}
                  </h2>
                  {/* 출처 및 시간 ("00분 전" 표시) */}
                  <p className="text-md text-gray-600">
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
              className="flex items-center justify-center min-w-[180px] sm:min-w-[220px] md:min-w-[260px] lg:min-w-[280px] max-w-[320px] bg-gray-50 text-blue-md font-bold text-lg rounded-lg shadow-md transition-all hover:bg-gray-200 duration-300"
            >
              <HiPlusCircle />
              <span className="ml-1">more</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
