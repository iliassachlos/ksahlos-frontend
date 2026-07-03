import { CircularProgress, Stack } from "@mui/material";
import type { FC } from "react";

export const LayoutLoading: FC = () => {
  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
      }}
    >
      <CircularProgress />
    </Stack>
  );
};
