import { PhotoCarousel } from "@/components/photo-carousel/photo-carousel";
import { useGetAwardsQuery } from "@/store/apis/awards-api";
import { Stack, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import type { FC } from "react";

import { slideUp, staggerContainer, viewportOnce } from "@/utils/animations";

const revealUp = slideUp();
const container = staggerContainer();

export const Awards: FC = () => {
  const { data, isLoading } = useGetAwardsQuery();
  const theme = useTheme();

  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignSelf: "stretch",
        py: 16,
        gap: { xs: 4, md: 6 },
      }}
    >
      <Stack
        component={motion.div}
        direction="column"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce()}
        sx={{ gap: 3.5 }}
      >
        <Typography
          component={motion.p}
          variants={revealUp}
          variant="overline"
          sx={{ display: "block", color: theme.palette.text.disabled }}
        >
          Achievements
        </Typography>
        <Typography
          component={motion.h2}
          variants={revealUp}
          variant="h2"
          sx={{ lineHeight: 1.28, letterSpacing: "-0.015em" }}
        >
          Recognition & awards
        </Typography>
        <Typography
          component={motion.p}
          variants={revealUp}
          variant="h4"
          color="textSecondary"
          sx={{ maxWidth: 620 }}
        >
          Selected honors from international photography contests and
          publications.
        </Typography>
      </Stack>

      <Stack
        component={motion.div}
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce(0.15)}
        sx={{ alignSelf: "stretch" }}
      >
        <PhotoCarousel items={data ?? []} isLoading={isLoading} />
      </Stack>
    </Stack>
  );
};
