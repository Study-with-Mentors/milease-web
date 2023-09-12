import { useRoutes } from "react-router-dom";

const CommonRoute = () => {
  let element = useRoutes([
    {
      path: "",
      element: <div>this</div>,
      index: true,
    },
  ]);
  return element;
};

export default CommonRoute;
