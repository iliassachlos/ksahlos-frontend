import { Divider, Stack, Typography } from "@mui/material";
import type { FC } from "react";

import { AddCollection } from "../components/collection-form/add-collection";
import { CollectionList } from "../components/collection-list/collection-list";

export const DashboardCollectionsView: FC = () => {
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
        <Typography variant="h3">Collections</Typography>
        <AddCollection />
      </Stack>

      <Divider sx={{ width: "100%" }} />

      <CollectionList />
    </Stack>
  );
};
