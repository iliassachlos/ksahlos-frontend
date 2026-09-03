import { alpha, Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useState, type FC } from "react";
import { useGetPhotosQuery } from "@/store/apis/photos-api";
import { isLightColor } from "@/utils/utils";
import { HERO_OVERLAY_COLOR, HOME_TOP_OFFSET } from "@/data/globals";

export const Hero: FC = () => {
  const { data: heroPhotos } = useGetPhotosQuery({ hero: true });

  const [activeIndex, setActiveIndex] = useState(0);

  const theme = useTheme();

  const photos = heroPhotos ?? [];
  const activePhoto = photos[activeIndex];

  const textColor = isLightColor(HERO_OVERLAY_COLOR)
    ? theme.palette.text.primary
    : theme.palette.common.white;

  return (
    <Box
      sx={{
        position: "relative",
        left: "50%",
        ml: "-50vw",
        mr: "-50vw",
        width: "100vw",
        height: "100dvh",
        mt: `-${HOME_TOP_OFFSET}px`,
        overflow: "hidden",
        bgcolor: "white",
      }}
    >
      {photos.map((photo, index) => (
        <Box
          key={photo._id}
          component="img"
          src={photo.url}
          alt={photo.title}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: index === activeIndex ? 1 : 0,
            transition: "opacity 1.2s ease",
          }}
        />
      ))}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: HERO_OVERLAY_COLOR,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />

      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          justifyContent: { xs: "flex-end", md: "space-between" },
          position: "relative",
          zIndex: 1,
          height: "100%",
          mx: { xs: 3, sm: 4, md: 7 },
          pb: { xs: 5, md: 6 },
          gap: { xs: 5, md: 0 },
        }}
      >
        <Stack
          direction="column"
          sx={{
            justifyContent: "flex-end",
            alignItems: "flex-start",
            flexGrow: 1,
            maxWidth: { xs: "100%", md: 720 },
            gap: { xs: 2.5, md: 3.25 },
          }}
        >
          <Stack
            direction="column"
            sx={{
              justifyContent: "center",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: alpha(textColor, 0.9),
                textTransform: "uppercase",
              }}
            >
              Fine-Art Photography &amp; Digital Creations
            </Typography>

            <Typography
              variant="h1"
              sx={{
                color: textColor,
                fontSize: { xs: 42, sm: 56, md: 91 },
              }}
            >
              Beyond Reality
            </Typography>
          </Stack>

          <Typography
            variant="subtitle1"
            sx={{
              color: alpha(textColor, 0.75),
              lineHeight: 1.65,
              maxWidth: "40ch",
            }}
          >
           Minimalist and surreal artworks on cotton paper and canvas
          </Typography>

          <Button
            component="a"
            href="#collections"
            variant="contained"
            sx={{
              mt: 1,
              bgcolor: "white",
              color: theme.palette.primary.main,
              borderRadius: 100,
              px: 3.25,
              py: 1.5,
              "&:hover": { bgcolor: alpha(theme.palette.common.white, 0.85) },
            }}
          >
            View the collections →
          </Button>
        </Stack>

        {activePhoto && (
          <Stack
            direction="row"
            sx={{
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "flex-end",
              gap: 2,
            }}
          >
            <Typography
              sx={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                color: alpha(textColor, 0.55),
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {activePhoto.title}
            </Typography>

            {photos.length > 1 && (
              <Stack direction="column" sx={{ alignItems: "flex-end", gap: 1 }}>
                <Typography
                  sx={{
                    color: alpha(textColor, 0.55),
                    fontSize: 11,
                    letterSpacing: "0.1em",
                  }}
                >
                  {String(activeIndex + 1).padStart(2, "0")}
                </Typography>

                <Stack
                  direction="row"
                  sx={{ alignItems: "flex-end", gap: { xs: 0.75, md: 1 } }}
                >
                  {photos.map((photo, index) => (
                    <Box
                      key={photo._id}
                      component="button"
                      onClick={() => setActiveIndex(index)}
                      sx={{
                        p: 0,
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid",
                        borderColor:
                          index === activeIndex
                            ? textColor
                            : alpha(textColor, 0.25),
                        borderRadius: 1,
                        overflow: "hidden",
                        cursor: "pointer",
                        height:
                          index === activeIndex
                            ? { xs: 64, md: 88 }
                            : { xs: 46, md: 66 },
                        maxWidth:
                          index === activeIndex
                            ? { xs: 88, md: 132 }
                            : { xs: 60, md: 96 },
                        transition:
                          "height .35s ease, max-width .35s ease, border-color .35s ease",
                      }}
                    >
                      <Box
                        component="img"
                        src={photo.url}
                        alt={photo.title}
                        sx={{
                          height: "100%",
                          width: "auto",
                          opacity: index === activeIndex ? 1 : 0.6,
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
