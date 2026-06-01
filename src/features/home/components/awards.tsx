import { Stack, Typography, useTheme } from "@mui/material";
import type { FC } from "react";

export const Awards: FC = () => {
  const theme = useTheme();

  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "stretch",
        py: 16,
        gap: { xs: 4, md: 10 },
      }}
    >
      <Stack
        direction="column"
        sx={{
          flex: 2,
          justifyContent: "center",
          alignItems: "flex-start",
          alignSelf: "stretch",
          gap: 3.5,
        }}
      >
        <Typography
          variant="overline"
          sx={{ display: "block", color: theme.palette.text.disabled }}
        >
          Achievements
        </Typography>

        <Typography
          variant="h2"
          sx={{
            lineHeight: 1.28,
            letterSpacing: "-0.015em",
          }}
        >
          Recognition & awards
        </Typography>

        <Typography variant="h4" color="textSecondary" sx={{ maxWidth: 620 }}>
          Selected honors from international photography contests and
          publications.
        </Typography>

        {/* Place awards list here */}
      </Stack>
    </Stack>
  );
};
