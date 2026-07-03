import { PhotoCarouselModal } from "@/components/photo-carousel/photo-carousel-modal";
import type { Award } from "@/types/awards";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import { Box, IconButton, Skeleton, Stack, useTheme } from "@mui/material";
import { useRef, useState, type FC } from "react";

interface PhotoCarouselProps {
  items: Award[];
  isLoading?: boolean;
}

const CARD_HEIGHT = { xs: 280, md: 420 };
const GAP = 24;

export const PhotoCarousel: FC<PhotoCarouselProps> = ({ items, isLoading }) => {
  const theme = useTheme();
  const railRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Award | null>(null);

  const scroll = (dir: "prev" | "next") => {
    const rail = railRef.current;

    if (!rail) return;

    const cardWidth = rail.firstElementChild?.clientWidth ?? 260;

    rail.scrollBy({
      left: dir === "next" ? cardWidth + GAP : -(cardWidth + GAP),
      behavior: "smooth",
    });
  };

  if (items.length === 0 && !isLoading) {
    return null;
  }

  return (
    <>
      <Stack
        direction="row"
        ref={railRef}
        sx={{
          gap: `${GAP}px`,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          width: "100%",
          pb: 0.5,
        }}
      >
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                sx={{
                  flex: "0 0 260px",
                  height: CARD_HEIGHT,
                  borderRadius: 1,
                  scrollSnapAlign: "start",
                }}
              />
            ))
          : items.map((award) => (
              <Box
                key={award._id}
                onClick={() => setSelected(award)}
                sx={{
                  flex: "0 0 auto",
                  height: CARD_HEIGHT,
                  scrollSnapAlign: "start",
                  borderRadius: 1,
                  overflow: "hidden",
                  cursor: "pointer",
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  "& img": {
                    transition: "transform 1.1s cubic-bezier(.16,1,.3,1)",
                  },
                  "&:hover img": { transform: "scale(1.03)" },
                }}
              >
                <img
                  src={award.url}
                  alt=""
                  style={{
                    height: "100%",
                    width: "auto",
                    maxWidth: "none",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </Box>
            ))}
      </Stack>

      <Stack direction="row" sx={{ gap: 1.5 }}>
        <IconButton
          onClick={() => scroll("prev")}
          aria-label="Previous"
          sx={{
            width: 48,
            height: 48,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "50%",
            transition: "background 0.3s, color 0.3s, border-color 0.3s",
            "&:hover": {
              backgroundColor: theme.palette.text.primary,
              color: theme.palette.background.default,
              borderColor: theme.palette.text.primary,
            },
          }}
        >
          <WestIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={() => scroll("next")}
          aria-label="Next"
          sx={{
            width: 48,
            height: 48,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "50%",
            transition: "background 0.3s, color 0.3s, border-color 0.3s",
            "&:hover": {
              backgroundColor: theme.palette.text.primary,
              color: theme.palette.background.default,
              borderColor: theme.palette.text.primary,
            },
          }}
        >
          <EastIcon fontSize="small" />
        </IconButton>
      </Stack>

      <PhotoCarouselModal
        selected={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
};
