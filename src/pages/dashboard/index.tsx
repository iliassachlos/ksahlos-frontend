import { DashboardView } from "@/features/dashboard/view";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";

const DashboardPage: FC = () => (
  <>
    <Helmet>
      <title>Ksahlos Photography - Dashboard</title>
    </Helmet>
    <DashboardView />
  </>
);

export default DashboardPage;
