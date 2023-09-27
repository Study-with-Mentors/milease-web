import { Outlet, useRoutes } from "react-router-dom";
import LoginSignupPage from "../pages/common/LoginSignupPage";
import HomePage from "../pages/common/HomePage";
import TravelPage from "../pages/common/TravelPage";
import AboutPage from "../pages/common/AboutPage";

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
      element: <LoginSignupPage />,
      index: true,
    },
  ]);
  return element;
};

export default CommonRoute;
