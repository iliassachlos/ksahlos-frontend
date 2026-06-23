import { Container, Stack, useMediaQuery, useTheme } from "@mui/material";
import type { FC, ReactNode } from "react";

import { SIDEBAR_WIDTH } from "@/data/globals";

import { DashboardDesktopOnly } from "./dashboard-desktop-only";
import { DashboardSidebar } from "./dashboard-sidebar";

export const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobile) {
    return <DashboardDesktopOnly />;
  }

  return (
    <Stack direction="row" sx={{ minHeight: "100dvh", pl: `${SIDEBAR_WIDTH}px` }}>
      <DashboardSidebar />

      <Container maxWidth="xl" sx={{ p: 4 }}>
        {children}
      </Container>
    </Stack>
  );
};
