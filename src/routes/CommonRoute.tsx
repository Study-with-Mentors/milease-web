import { useRoutes } from "react-router-dom";
import HomePage from "../pages/common/HomePage";
import TravelPage from "../pages/common/TravelPage";
import AboutPage from "../pages/common/AboutPage";
import LoginGooglePage from "../pages/common/LoginGooglePage";
import Dashboard from "../pages/common/admin/dashboard/Dashboard";

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
      index: true,
    },
    {
      path: "about",
      element: <AboutPage />,
      index: true,
    },
    {
      path: "auth",
      element: <LoginGooglePage />,
      index: true,
    },
    {
      path: "admin",
      element: <Dashboard />,
      index: true,
    },
  ]);
  return element;
};

export default CommonRoute;
