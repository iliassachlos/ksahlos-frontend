import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { isTokenValid, TOKEN_STORAGE_KEY } from "@/utils/auth";

import { paths } from "./paths";

interface GuestRouteProps {
  children: ReactNode;
}

export const GuestRoute: FC<GuestRouteProps> = ({ children }) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (isTokenValid(token)) {
    return <Navigate to={paths.dashboard} replace />;
  }

  return <>{children}</>;
};
