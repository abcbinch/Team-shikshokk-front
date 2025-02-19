import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import OwnerOrderAllHistory from "../pages/Order/OwnerOrderPage/OwnerOrderAllHistory";
import OwnerOrderHistory from "../pages/Order/OwnerOrderPage/OwnerOrderHistory";
import Menus from "../pages/Menus";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/order1", element: <OwnerOrderHistory /> },
    { path: "/order2", element: <OwnerOrderAllHistory /> },
    { path: "/menu", element: <Menus /> },
  ]);

  return routes;
};

export default AppRoutes;
