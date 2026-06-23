import type { FC } from "react";
import { Helmet } from "react-helmet-async";

import { DashboardPhotosView } from "@/features/dashboard/photos/view";

const DashboardPhotosPage: FC = () => (
  <>
    <Helmet>
      <title>Ksahlos Photography - Dashboard - Photos</title>
    </Helmet>
    <DashboardPhotosView />
  </>
);

export default DashboardPhotosPage;
