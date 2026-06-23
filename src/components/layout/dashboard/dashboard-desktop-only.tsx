import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import type { FC } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { paths } from "@/routes/paths";

export const DashboardDesktopOnly: FC = () => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        minHeight: "100dvh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 2,
        px: 4,
      }}
    >
      <Stack direction="row" sx={{ position: "absolute", top: 16, left: 16 }}>
        <Button
          component="a"
          href={paths.home}
          variant="text"
          startIcon={<ArrowBackIosNewOutlinedIcon />}
        >
          Back to Home
        </Button>
      </Stack>

      <DesktopWindowsOutlinedIcon
        sx={{ fontSize: 48, color: theme.palette.text.disabled }}
      />
      <Typography variant="h5">Desktop required</Typography>

      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 360 }}>
        The studio dashboard isn’t available on small screens yet. Please open
        it on a larger monitor to manage your portfolio.
      </Typography>
    </Stack>
  );
};
