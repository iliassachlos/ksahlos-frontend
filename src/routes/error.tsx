import { Layout } from "@/components/layout/layout";
import { paths } from "./paths";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

export const NotFoundPage = lazy(() => import("@/pages/404/"));

export const errorRoutes = [
  {
    path: paths.home,
    element: (
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
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
