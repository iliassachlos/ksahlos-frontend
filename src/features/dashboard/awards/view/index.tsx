import { Divider, Stack, Typography } from "@mui/material";
import type { FC } from "react";

import { AddAward } from "../components/add-award/add-award";
import { AwardGrid } from "../components/award-grid/award-grid";

export const DashboardAwardsView: FC = () => {
  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignSelf: "stretch",
        gap: 3,
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
        }}
      >
        <Typography variant="h3">Awards</Typography>
        <AddAward />
      </Stack>

      <Divider sx={{ width: "100%" }} />

      <AwardGrid />
    </Stack>
  );
};
