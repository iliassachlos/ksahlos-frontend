import { Stack } from "@mui/material";
import type { FC, ReactNode } from "react";

import { SIDEBAR_WIDTH } from "@/data/globals";

import { DashboardSidebar } from "./dashboard-sidebar";

export const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <Stack direction="row" sx={{ minHeight: "100dvh" }}>
    <DashboardSidebar />

    <Stack direction='row' sx={{ flexGrow: 1, ml: `${SIDEBAR_WIDTH}px`, p: 4 }}>
      {children}
    </Stack>
  </Stack>
);
