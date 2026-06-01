import { Stack, Typography } from "@mui/material";
import type { FC } from "react";

import { ScrollIndicator } from "../../../components/ui/scroll-indicator";

export const Hero: FC = () => {
  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "stretch",
        mb: 16,
        gap: { xs: 6, md: 8 },
      }}
    >
      <Stack
        direction="column"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "stretch",
          textAlign: "center",
          gap: 3.25,
        }}
      >
        <Typography
          variant="overline"
          color="textDisabled"
          sx={{
            textTransform: "uppercase",
          }}
        >
          Fine-Art Photography
        </Typography>
        <Typography
          variant="h1"
          color="textPrimary"
          sx={{
            fontSize: { xs: 60, md: 82 },
          }}
        >
          Timeless steps
          <br />
          beyond reality
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          sx={{
            fontStyle: "italic",
            lineHeight: 1.65,
            maxWidth: "40ch",
          }}
        >
          Visual artwork influenced by abstract, minimalist and surreal styles,
          created using in camera and post processing techniques.
        </Typography>
      </Stack>

      <ScrollIndicator />
    </Stack>
  );
};
