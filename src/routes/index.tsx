import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import OwnerOrderAllHistory from "../pages/Order/OwnerOrderPage/OwnerOrderAllHistory";
import OwnerOrderHistory from "../pages/Order/OwnerOrderPage/OwnerOrderHistory";

import Menus from "../pages/Menus";

import OwnerMain from "../pages/OwnerMain";
import OwnerReview from "../pages/OwnerReview";

import CounterTest from "../pages/CounterTest";
import OrderTest from "../pages/Order/OwnerOrderPage/OrderTest";
const AppRoutes = () => {
  let routes = useRoutes([
    // { path: "/", element: <Home /> },
    { path: "/order1", element: <OwnerOrderHistory /> },
    { path: "/order2", element: <OwnerOrderAllHistory /> },

    { path: "/menu", element: <Menus /> },

    { path: "/", element: <OwnerOrderHistory /> },

    { path: "/owner", element: <OwnerMain /> },
    { path: "/owner-review", element: <OwnerReview /> },
    { path: "/counter", element: <CounterTest /> },
    { path: "/testorder", element: <OrderTest /> },
  ]);

  return routes;
};

export default AppRoutes;
