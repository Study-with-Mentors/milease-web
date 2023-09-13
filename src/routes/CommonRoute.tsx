import { Outlet, useRoutes } from "react-router-dom";
import LoginSignupPage from "../pages/common/LoginSignupPage";

const CommonRoute = () => {
  let element = useRoutes([
    {
      path: "",
      element: <div>this</div>,
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
