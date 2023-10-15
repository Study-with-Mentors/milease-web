import { useRoutes } from "react-router-dom";
import HomePage from "../pages/common/HomePage";
import TravelPage from "../pages/common/TravelPage";
import AboutPage from "../pages/common/AboutPage";
import LoginGooglePage from "../pages/common/LoginGooglePage";
import Dashboard from "../pages/common/admin/dashboard/Dashboard";
import NotFoundPage from "../pages/common/404Page";

const CommonRoute = () => {

  let element = useRoutes([
    {
      path: "",
      element: <HomePage />,
      index: true,
    },
    {
      path: "travel",
      element: <TravelPage />,
    },
    {
      path: "about",
      element: <AboutPage />,
    },
    {
      path: "auth",
      element: <LoginGooglePage />,
    },
    {
      path: "admin",
      element: <Dashboard />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return element;
};

export default CommonRoute;
