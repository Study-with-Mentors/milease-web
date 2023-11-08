import { useRoutes } from "react-router-dom";
import HomePage from "../pages/common/HomePage";
import TravelPage from "../pages/common/TravelPage";
import AboutPage from "../pages/common/AboutPage";
import LoginGooglePage from "../pages/common/LoginGooglePage";
import Dashboard from "../pages/common/admin/dashboard/Dashboard";
import NotFoundPage from "../pages/common/404Page";
import UsersList from "../pages/common/admin/userList/UsersList";
import AdminAuthorize from "../pages/common/admin/AdminAuthorize";
import UserAuthorize from "../pages/common/user/UserAuthorize";
import Profile from "../pages/common/user/Profile";
import { Delete } from "@mui/icons-material";

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
      element: <AdminAuthorize />,
      children: [
        {
          path: "",
          element: <Dashboard />
        },
        {
          path: "users",
          element: <UsersList />
        }
      ]
    },
    {
      path: "profile",
      element: <UserAuthorize />,
      children: [
        {
          path: "",
          element: <Profile />
        },
        {
          path: "delete",
          element: <Delete />
        }
      ]
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);
  return element;
};

export default CommonRoute;
