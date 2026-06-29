import type { FC } from "react";
import { Helmet } from "react-helmet-async";

import { DashboardCollectionsView } from "@/features/dashboard/collections/view";

const DashboardCollectionsPage: FC = () => (
  <>
    <Helmet>
      <title>Ksahlos Photography - Dashboard - Collections</title>
    </Helmet>

    <DashboardCollectionsView />
  </>
);

export default DashboardCollectionsPage;
