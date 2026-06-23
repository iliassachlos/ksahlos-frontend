import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { isTokenValid } from "@/utils/auth";

import { paths } from "./paths";

interface GuestRouteProps {
  children: ReactNode;
}

export const GuestRoute: FC<GuestRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (isTokenValid(token)) {
    return <Navigate to={paths.dashboard} replace />;
  }

  return <>{children}</>;
};
