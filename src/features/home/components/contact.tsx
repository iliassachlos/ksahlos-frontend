import { Button, Stack, Typography, useTheme } from "@mui/material";
import type { FC } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";

import { HEADER_HEIGHT } from "@/data/globals";

const socialMedias = [
  {
    label: "Facebook",
    icon: <FacebookIcon sx={{ fontSize: 20 }} />,
    href: "https://www.facebook.com/KSahlosPhoto/",
  },
];

export const Contact: FC = () => {
  const theme = useTheme();

  return (
    <Stack
      id="contact"
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        py: 16,
        gap: 3.5,
        scrollMarginTop: `${HEADER_HEIGHT}px`,
      }}
    >
      <Typography
        variant="overline"
        sx={{ display: "block", color: theme.palette.text.disabled }}
      >
        Get in touch
      </Typography>

      <Typography variant="h2" sx={{ fontSize: { xs: 44, md: 52 } }}>
        k.sahlos@gmail.com
      </Typography>

      <Stack
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch",
          gap: 10,
        }}
      >
        <Typography variant="body2" color={theme.palette.text.secondary}>
          Eresos, Lesvos — Greece
        </Typography>
        <Typography variant="body2" color={theme.palette.text.secondary}>
          +30 693 700 0041
        </Typography>
      </Stack>

      <Stack direction="row" sx={{ justifyContent: "center", gap: 2, mt: 1 }}>
        {socialMedias.map(({ label, icon, href }) => (
          <Button
            key={label}
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={icon}
            sx={{
              borderRadius: 100,
              border: `1px solid ${theme.palette.divider}`,
              color: theme.palette.text.secondary,
              px: 2.75,
              py: 1.25,
              fontSize: 14,
              letterSpacing: "0.02em",
              transition: "background .35s, color .35s, border-color .35s",

              "&:hover": {
                bgcolor: theme.palette.text.primary,
                color: theme.palette.background.default,
                borderColor: theme.palette.text.primary,
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};
