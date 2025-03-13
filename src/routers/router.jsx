import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyPage from "../pages/MyPage";
import StockListPage from "../pages/StockListPage";
import DisclosureListPage from "../pages/DisclosureListPage/DisclosureListPage";
import DisclosureDetailPage from "../pages/DisclosureDetailPage";
import MainPage from "../pages/MainPage";
import IntroduceDisclosurePage from "../pages/IntroduceDisclosurePage";
import EarningsPage from "../pages/EarningsPage";
import EarningsCalendarPage from "../pages/EarningsCalendarPage/EarningsCalendar";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        path: "/my_page",
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      { path: "/stocks", element: <StockListPage /> },
      { path: "/disclosures", element: <DisclosureListPage /> },
      { path: "/earnings/:ticker", element: <EarningsPage /> },
      { path: "/earnings", element: <EarningsCalendarPage /> },
      {
        path: "/disclosures/:filling_id",
        element: <DisclosureDetailPage />,
      },
      { path: "/main/:ticker/:filling_id", element: <MainPage /> },
      { path: "/introduce_disclosures", element: <IntroduceDisclosurePage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

export default router;
