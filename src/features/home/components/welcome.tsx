import { Box, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import type { FC } from "react";

import { HEADER_HEIGHT } from "@/data/globals";
import {
  slideInFromRight,
  staggerContainer,
  viewportOnce,
} from "@/utils/animations";

const stats = [
  { value: "1977", label: "Since" },
  { value: "Global", label: "Shipping" },
  { value: "Numbered", label: "Copies" },
];

const revealFromRight = slideInFromRight();
const container = staggerContainer();

export const Welcome: FC = () => {
  const theme = useTheme();

  return (
    <Stack
      id="about"
      direction={{ xs: "column", md: "row" }}
      sx={{
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "stretch",
        py: 16,
        gap: { xs: 4, md: 10 },
        scrollMarginTop: `${HEADER_HEIGHT}px`,
      }}
    >
      <Stack
        direction="column"
        sx={{
          flex: 2,
          justifyContent: "flex-start",
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
          The camera is not used by me just to take photos — it is a tool to create{" "}
          <Box component="em" sx={{ fontStyle: "italic", fontWeight: 500 }}>
            fine art.
          </Box>
        </Typography>
      </Stack>

      <Stack
        component={motion.div}
        direction="column"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce()}
        sx={{
          flex: 3,
          justifyContent: "center",
          alignItems: "flex-start",
          alignSelf: "stretch",
          color: theme.palette.text.secondary,
          overflow: "hidden",
        }}
      >
        <Typography component={motion.p} variants={revealFromRight} variant="body1">
          I specialize in visual artwork influenced by minimalist and surreal styles, created using
          in-camera and post-processing techniques.
        </Typography>

        <Typography
          component={motion.p}
          variants={revealFromRight}
          variant="body1"
          sx={{ mt: 2.5 }}
        >
          Printing is performed personally using pigment-ink printers and deliver the prints on museum-quality
          paper for the highest archival resistance, and canvas signed by the artist. Every print ships with a
          Certificate of Authenticity worldwide.
        </Typography>

        <Stack
          component={motion.div}
          variants={revealFromRight}
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
