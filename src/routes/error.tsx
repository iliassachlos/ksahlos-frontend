import { Layout } from "@/components/layout/main/layout";
import { paths } from "./paths";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { LayoutLoading } from "@/components/layout/layout-loading";

export const NotFoundPage = lazy(() => import("@/pages/404/"));

export const errorRoutes = [
  {
    path: paths.home,
    element: (
      <Layout>
        <Suspense fallback={<LayoutLoading />}>
          <Outlet />
        </Suspense>
      </Layout>
    ),
    children: [
      {
        path: paths.notFound,
        element: <NotFoundPage />,
      },
    ],
  },
];
