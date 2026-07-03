import { HEADER_HEIGHT } from "@/data/globals";
import { paths } from "@/routes/paths";
import { Typography, useScrollTrigger } from "@mui/material";
import { alpha, Stack, useTheme } from "@mui/system";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 40,
  });

  return (
    <Stack
      component="header"
      direction="row"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        justifyContent: { xs: "center", md: "flex-start" },
        alignItems: "center",
        alignSelf: "stretch",
        bgcolor: scrolled
          ? alpha(theme.palette.background.default, 0.8)
          : "transparent",
        backdropFilter: scrolled ? "saturate(180%) blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid #eef0f2" : "1px solid transparent",
        transition: "all .5s cubic-bezier(.16,1,.3,1)",
        color: theme.palette.text.primary,
        zIndex: 1000,
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          alignSelf: "stretch",
          height: HEADER_HEIGHT,
          justifyContent: "center",
          mx: 5,
        }}
      >
        <Typography
          variant="overline"
          onClick={() => navigate(paths.home)}
          sx={{
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Konstantinos Sahlos
        </Typography>
      </Stack>
    </Stack>
  );
};
