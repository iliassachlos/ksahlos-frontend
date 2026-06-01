import { Box, Stack, Typography, useTheme } from "@mui/material";
import type { FC } from "react";

const stats = [
  { value: "1977", label: "Since" },
  { value: "100%", label: "Cotton paper" },
  { value: "Global", label: "Shipping" },
];

export const Welcome: FC = () => {
  const theme = useTheme();

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
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
          Welcome to my world
        </Typography>

        <Typography
          variant="h3"
          sx={{
            lineHeight: 1.28,
            letterSpacing: "-0.015em",
          }}
        >
          My camera is not used to take photos — it is a tool to create{" "}
          <Box component="em" sx={{ fontStyle: "italic", fontWeight: 500 }}>
            fine art.
          </Box>
        </Typography>
      </Stack>

      <Stack
        direction="column"
        sx={{
          flex: 3,
          justifyContent: "center",
          alignItems: "flex-start",
          alignSelf: "stretch",
          color: theme.palette.text.secondary,
        }}
      >
        <Typography variant="body1">
          I specialize in visual artwork influenced by abstract, minimalist and
          surreal styles, created using in-camera and post-processing
          techniques.
        </Typography>

        <Typography variant="body1" sx={{ mt: 2.5 }}>
          Printing is performed personally using pigment-ink printers on 100%
          cotton, museum-quality paper for the highest archival resistance.
          Every print ships with a Certificate of Authenticity.
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "center",
            alignSelf: "stretch",
            gap: 7,
            mt: 5,
            pt: 4,
            borderTop: "1px solid",
            borderColor: theme.palette.divider,
            flexWrap: "wrap",
          }}
        >
          {stats.map(({ value, label }) => (
            <Stack
              key={label}
              direction="column"
              sx={{
                justifyContent: "center",
                alignItems: { xs: "center", md: "flex-start" },
                gap: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: 40,
                  fontWeight: 200,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  color: theme.palette.text.primary,
                }}
              >
                {value}
              </Typography>
              <Typography
                variant="overline"
                sx={{
                  mt: 0.75,
                  display: "block",
                  color: theme.palette.text.disabled,
                }}
              >
                {label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
