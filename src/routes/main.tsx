import { lazy, Suspense } from "react";
import { paths } from "./paths";
import { Outlet } from "react-router-dom";
import { Layout } from "@/components/layout/main/layout";
import { LayoutLoading } from "@/components/layout/layout-loading";
import LoginPage from "@/pages/login";

import { GuestRoute } from "./guest-route";

export const Homepage = lazy(() => import("@/pages/home/"));
export const PhotosPage = lazy(() => import("@/pages/photos/"));
export const CollectionPage = lazy(() => import("@/pages/collection/"));

export const mainRoutes = [
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
        index: true,
        element: <Homepage />,
      },
      {
        path: paths.photos,
        element: <PhotosPage />,
      },
      {
        path: paths.collectionDetail,
        element: <CollectionPage />,
      },
      {
        path: paths.login,
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
    ],
  },
];
