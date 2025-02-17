import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div>
        <Header />
        <main>
          <div>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
