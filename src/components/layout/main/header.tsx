import { HEADER_HEIGHT, HERO_OVERLAY_COLOR } from "@/data/globals";
import { paths } from "@/routes/paths";
import { isLightColor } from "@/utils/utils";
import { Link, Typography, useScrollTrigger } from "@mui/material";
import { alpha, Stack, useTheme } from "@mui/system";
import type { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const menuMap = [
  { title: "Home", href: paths.home },
  { title: "About", href: "#about" },
  { title: "Collections", href: "#collections" },
  { title: "My Journey", href: "#my-journey" },
  { title: "Contact", href: "#contact" },
];

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
        justifyContent: { xs: "center", md: "space-between" },
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
          justifyContent: { xs: "center", md: "space-between" },
          alignItems: "center",
          alignSelf: "stretch",
          width: "100%",
          height: HEADER_HEIGHT,
          mx: 6,
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

        <Stack
          direction="row"
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 4,
            textDecoration: "none",
          }}
        >
          {menuMap.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              underline="none"
              onClick={
                item.href.startsWith("#")
                  ? undefined
                  : (e) => {
                      e.preventDefault();
                      if (item.href === paths.home) {
                        if (location.pathname === paths.home) {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        } else {
                          navigate(paths.home);
                        }
                      } else {
                        navigate(item.href);
                      }
                    }
              }
              sx={{
                position: "relative",
                color: alpha(textColor, 0.7),
                transition: "color .3s ease",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: -4,
                  width: 0,
                  height: "1px",
                  bgcolor: textColor,
                  transition: "width .3s ease",
                },
                "&:hover": {
                  color: textColor,
                },
                "&:hover::after": {
                  width: "100%",
                },
              }}
            >
              {item.title}
            </Link>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
