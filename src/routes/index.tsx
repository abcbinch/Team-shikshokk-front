import { useRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import OwnerOrderAllHistory from "../pages/Order/OwnerOrderPage/OwnerOrderAllHistory";
import OwnerOrderHistory from "../pages/Order/OwnerOrderPage/OwnerOrderHistory";

import Menus from "../pages/Menus";

import Clock from "../pages/ClockTest";
import Counter from "../pages/CounterTest";
import OwnerMain from "../pages/OwnerMain";
import OwnerReview from "../pages/OwnerReview";


const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/order1", element: <OwnerOrderHistory /> },
    { path: "/order2", element: <OwnerOrderAllHistory /> },

    { path: "/menu", element: <Menus /> },

    { path: "/clock", element: <Clock /> },
    { path: "/counter", element: <Counter /> },
    { path: "/owner", element: <OwnerMain /> },
    { path: "/owner-review", element: <OwnerReview /> },

  ]);

  return routes;
};

export default AppRoutes;
