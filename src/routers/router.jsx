import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MyPage from "../pages/MyPage";
import StockListPage from "../pages/StockListPage";
import DisclosureListPage from "../pages/DisclosureListPage";
import DisclosureDetailPage from "../pages/DisclosureDetailPage";
import MainPage from "../pages/MainPage";
import IntroduceDisclosurePage from "../pages/IntroduceDisclosurePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/my_page", element: <MyPage /> },
      { path: "/stocks", element: <StockListPage /> },
      { path: "/disclosures", element: <DisclosureListPage /> },
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
