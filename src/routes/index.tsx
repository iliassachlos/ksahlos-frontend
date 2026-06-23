import { createBrowserRouter, Navigate } from "react-router-dom";
import { dashboardRoutes } from "./dashboard";
import { errorRoutes } from "./error";
import { mainRoutes } from "./main";

export const routes = [
  ...mainRoutes,
  ...dashboardRoutes,
  ...errorRoutes,
  { path: "*", element: <Navigate to="/404" /> },
];

const router = createBrowserRouter(routes);

export default router;
