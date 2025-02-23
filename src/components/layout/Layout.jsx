import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex h-screen w-full overflow-x-hidden">
      {/* 사이드바 - 왼쪽에 고정 */}
      <aside className="h-full top-0">
        <Sidebar />
      </aside>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex flex-col flex-grow">
        {/* 헤더 */}
        <header className="bg-gray-200 fixed top-0 left-20 right-0 z-10 h-16">
          <Header />
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex flex-grow left-20 relative min-h-screen mt-16">
          <Outlet />
        </main>

        {/* 푸터 */}
        <footer className="bg-gray-200 h-full">
          <Footer />
        </footer>
      </div>
    </div>
  );
}
