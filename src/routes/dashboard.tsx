import { lazy, Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { DashboardLayout } from "@/components/layout/dashboard/dashboard-layout";
import { LayoutLoading } from "@/components/layout/layout-loading";

import { paths } from "./paths";
import { ProtectedRoute } from "./protected-route";

export const DashboardPhotosPage = lazy(
  () => import("@/pages/dashboard/photos/"),
);
export const DashboardCollectionsPage = lazy(
  () => import("@/pages/dashboard/collections/"),
);
export const DashboardAwardsPage = lazy(
  () => import("@/pages/dashboard/awards/"),
);

export const dashboardRoutes = [
  {
    path: paths.dashboard,
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Suspense fallback={<LayoutLoading />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={paths.dashboardPhotos} replace />,
      },
      {
        path: paths.dashboardPhotos,
        element: <DashboardPhotosPage />,
      },
      {
        path: paths.dashboardCollections,
        element: <DashboardCollectionsPage />,
      },
      {
        path: paths.dashboardAwards,
        element: <DashboardAwardsPage />,
      },
    ],
  },
];
