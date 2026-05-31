import { createBrowserRouter, Navigate } from "react-router-dom";
import { errorRoutes } from "./error";
import { mainRoutes } from "./main";

export const routes = [
  ...mainRoutes,
  ...errorRoutes,
  { path: "*", element: <Navigate to="/404" /> },
];

const router = createBrowserRouter(routes);

export default router;
