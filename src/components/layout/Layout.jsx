import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import { useLikedStocksStore } from "../../hooks/useLikedStocksStore";
import { useEffect } from "react";

export default function Layout() {
  const { fetchLikedStocks } = useLikedStocksStore();

  useEffect(() => {
    fetchLikedStocks();
  }, []);
  return (
    <div className="flex min-h-screen w-full overflow-x-hidden text-xs text-black no-scrollbar">
      {/* 메인 컨텐츠 영역 */}
      <div className="flex flex-col flex-grow ml-16 relative ">
        {/* 헤더 */}
        <header className=" fixed top-0 left-16 right-0 z-100">
          <Header />
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex flex-grow pt-16 items-center justify-center">
          <Outlet />
        </main>

        {/* 푸터 */}
        <footer className="bg-gray-light h-20">
          <Footer />
        </footer>
      </div>
      {/* 사이드바 - 왼쪽에 고정 */}
      <aside className="h-screen w-16 fixed left-0 top-0 z-150">
        <Sidebar />
      </aside>
    </div>
  );
}
