import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { isTokenValid } from "@/utils/auth";

import { paths } from "./paths";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!isTokenValid(token)) {
    return <Navigate to={paths.login} replace />;
  }

  return <>{children}</>;
};
