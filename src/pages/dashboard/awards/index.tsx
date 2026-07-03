import type { FC } from "react";
import { Helmet } from "react-helmet-async";

import { DashboardAwardsView } from "@/features/dashboard/awards/view";

const DashboardAwardsPage: FC = () => (
  <>
    <Helmet>
      <title>Ksahlos Photography - Dashboard - Awards</title>
    </Helmet>
    <DashboardAwardsView />
  </>
);

export default DashboardAwardsPage;
