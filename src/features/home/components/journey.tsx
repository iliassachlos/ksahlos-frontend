import { alpha, Box, Stack, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import type { FC } from "react";

import { HEADER_HEIGHT } from "@/data/globals";
import {
  groupExhibitions,
  soloExhibitions,
  type Exhibition,
} from "@/data/exhibitions";
import {
  slideInFromRight,
  staggerContainer,
  viewportOnce,
} from "@/utils/animations";

const revealFromRight = slideInFromRight();
const container = staggerContainer();

export const Journey: FC = () => {
  const theme = useTheme();

  const renderExhibitionList = (title: string, items: Exhibition[]) => (
    <Stack
      component={motion.div}
      direction="column"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce(0.15)}
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
        overflow: "hidden",
      }}
    >
      <Typography
        component={motion.p}
        variants={revealFromRight}
        variant="overline"
        sx={{
          display: "block",
          width: "100%",
          color: theme.palette.text.primary,
          letterSpacing: "0.18em",
          borderBottom: `1px solid ${theme.palette.divider}`,
          fontWeight: 500,
          fontSize: 13,
          pb: 2,
          mb: 1,
        }}
      >
        {title}
      </Typography>

      {items.map((item, index) => (
        <Stack
          key={`${item.title}-${index}`}
          component={motion.div}
          variants={revealFromRight}
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
            borderBottom: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
            py: 2,
            mx: { xs: 2, md: 1 },
          }}
        >
          <Stack
            direction="column"
            sx={{
              justifyContent: "center",
              alignItems: "flex-start",
              alignSelf: "stretch",
              gap: 0.5,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: 500, color: "text.primary" }}
            >
              {item.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.disabled", mt: 0.5 }}
            >
              {item.venue}
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            sx={{ color: "text.disabled", whiteSpace: "nowrap" }}
          >
            {item.date}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <Stack
      id="my-journey"
      direction={{ xs: "column", md: "row" }}
      sx={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignSelf: "stretch",
        py: 16,
        gap: { xs: 6, md: 10 },
        scrollMarginTop: `${HEADER_HEIGHT}px`,
      }}
    >
      <Stack
        direction="column"
        sx={{
          flex: "0 0 38%",
          position: { xs: "inherit", md: "sticky" },
          top: `${HEADER_HEIGHT + 40}px`,
          alignSelf: "flex-start",
          gap: 2,
        }}
      >
        <Box
          component="img"
          src="/images/ksahlos-profile.jpg"
          alt="Konstantinos Sahlos Profile"
          sx={{ width: "100%", borderRadius: 1 }}
        />
        <Typography
          variant="caption"
          sx={{ display: "block", color: "text.disabled" }}
        >
          Konstantinos Sahlos — Eresos, Lesvos
        </Typography>
      </Stack>

      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
          alignSelf: "stretch",
          flex: 1,
          gap: 3.5,
        }}
      >
        <Stack
          component={motion.div}
          direction="column"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce()}
          sx={{
            alignItems: "flex-start",
            alignSelf: "stretch",
            gap: 3.5,
            overflow: "hidden",
          }}
        >
          <Typography
            component={motion.p}
            variants={revealFromRight}
            variant="overline"
            sx={{ display: "block", color: "text.disabled" }}
          >
            My Journey
          </Typography>

          <Typography
            component={motion.h2}
            variants={revealFromRight}
            variant="h2"
          >
            From Skala Eresos
            <br />
            to the gallery wall.
          </Typography>

          <Stack
            component={motion.div}
            direction="column"
            variants={revealFromRight}
            sx={{ gap: 2.5, color: "text.secondary" }}
          >
            <Typography variant="body1">
              Born on the island of Lesvos, Greece, my interest in seascape and
              nature photography began in 1977, when I got my first professional
              camera.
            </Typography>
            <Typography variant="body1">
              In recent years I have been greatly influenced by minimalism,
              abstract and impressionist visual art. Nowadays I mostly do not
              shoot what I see, but what I would like to see.
            </Typography>
            <Typography variant="body1">
              Having returned to live on Lesvos, I am honored to have my work
              displayed in MYTHOS Gallery and several others, while planning
              private exhibitions across different cities.
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction="column"
          sx={{
            justifyContent: "center",
            alignItems: "flex-start",
            alignSelf: "stretch",
            gap: 8,
          }}
        >
          {renderExhibitionList("Solo Exhibitions", soloExhibitions)}
          {renderExhibitionList("Events / Exhibitions", groupExhibitions)}
        </Stack>
      </Stack>
    </Stack>
  );
};
