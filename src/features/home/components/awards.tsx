import { PhotoCarousel } from "@/components/photo-carousel/photo-carousel";
import { useGetAwardsQuery } from "@/store/apis/awards-api";
import { Stack, Typography, useTheme } from "@mui/material";
import type { FC } from "react";

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
      <Stack direction="column" sx={{ gap: 3.5 }}>
        <Typography
          variant="overline"
          sx={{ display: "block", color: theme.palette.text.disabled }}
        >
          Achievements
        </Typography>
        <Typography
          variant="h2"
          sx={{ lineHeight: 1.28, letterSpacing: "-0.015em" }}
        >
          Recognition & awards
        </Typography>
        <Typography variant="h4" color="textSecondary" sx={{ maxWidth: 620 }}>
          Selected honors from international photography contests and
          publications.
        </Typography>
      </Stack>

      <PhotoCarousel items={data ?? []} isLoading={isLoading} />
    </Stack>
  );
};
