import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import { LoginPage } from "@/pages/login/LoginPage";
import { SignupPage } from "@/pages/signup/SignupPage";
import { ROUTES } from "@/constant/routes";

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: ROUTES.SIGN_IN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.SIGN_UP,
    element: <SignupPage />,
  },
]);

export default router;
