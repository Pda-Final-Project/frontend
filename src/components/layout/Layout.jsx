import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useLikedStocksStore } from "../../hooks/useLikedStocksStore";
import { useEffect } from "react";
import useSseAlarm from "../../hooks/useSseAlarm";

export default function Layout() {
  const { fetchLikedStocks } = useLikedStocksStore();
  useSseAlarm();

  useEffect(() => {
    fetchLikedStocks();
  }, []);

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden text-xs text-black">
      {/* 사이드바 */}
      <aside className="h-screen w-16 fixed left-0 top-0 z-150">
        <Sidebar />
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-col flex-grow ml-16">
        {/* 헤더 */}
        <header className="fixed top-0 left-16 right-0 z-100">
          <Header />
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex flex-grow flex-col pt-16">
          <div className="flex-grow">
            <Outlet />
          </div>
        </main>

        {/* 푸터 */}
        <footer className="bg-gray-light h-20">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
