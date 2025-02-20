import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex h-screen w-full">
      {/* 사이드바 - 왼쪽에 고정 */}
      <aside className=" bg-gray-800 text-white h-full sticky top-0">
        <Sidebar />
      </aside>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex flex-col flex-grow">
        {/* 헤더 */}
        <header className="bg-gray-200">
          <Header />
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-grow bg-gray-100 p-6 overflow-y-auto">
          <Outlet />
        </main>

        {/* 푸터 */}
        <footer className="bg-gray-200">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
