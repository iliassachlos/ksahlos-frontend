import { lazy, Suspense } from "react";
import { paths } from "./paths";
import { Layout } from "@/components/layout/layout";
import { Outlet } from "react-router-dom";

export const Homepage = lazy(() => import("@/pages/home/"));
export const PhotosPage = lazy(() => import("@/pages/photos/"));

export const mainRoutes = [
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
        index: true,
        element: <Homepage />,
      },
      {
        path: paths.photos,
        element: <PhotosPage />,
      },
    ],
  },
];
