import { Divider, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { AddPhoto } from "../components/photo-form/add-photo";
import { PhotoList } from "../components/photo-list/photo-list";

export const DashboardPhotosView: FC = () => {
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
        <Typography variant="h3">Photos</Typography>
        <AddPhoto />
      </Stack>

      <Divider sx={{ width: "100%" }} />

      <PhotoList />
    </Stack>
  );
};
