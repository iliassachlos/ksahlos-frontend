import { HEADER_HEIGHT, HERO_OVERLAY_COLOR } from "@/data/globals";
import { paths } from "@/routes/paths";
import { isLightColor } from "@/utils/utils";
import { Typography, useScrollTrigger } from "@mui/material";
import { alpha, Stack, useTheme } from "@mui/system";
import type { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 40,
  });

  // Unscrolled on the home page, the header floats over the Hero's dark
  // overlay instead of the page background — check that color too.
  const isOverHero = !scrolled && location.pathname === paths.home;

  const effectiveBackground = isOverHero
    ? HERO_OVERLAY_COLOR
    : theme.palette.background.default;

  const textColor = isLightColor(effectiveBackground)
    ? theme.palette.text.primary
    : theme.palette.common.white;

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
        color: textColor,
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
