import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyPage from "../pages/MyPage";
import StockListPage from "../pages/StockListPage";
import DisclosureListPage from "../pages/StockListPage";
import DisclosureDetailPage from "../pages/DisclosureDetailPage";
import MainPage from "../pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/my_page", element: <MyPage /> },
      { path: "/stocks", element: <StockListPage /> },
      { path: "/disclosures", element: <DisclosureListPage /> },
      {
        path: "/disclosures/:disclosure_id",
        element: <DisclosureDetailPage />,
      },
      { path: "/main/:stock_ticker", element: <MainPage /> },
    ],
  },
]);

export default router;
