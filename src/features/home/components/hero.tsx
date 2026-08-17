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
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      />

      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          position: "relative",
          zIndex: 1,
          height: "100%",
          maxWidth: 1152,
          mx: "auto",
          pb: 6,
        }}
      >
        <Stack
          direction="column"
          sx={{
            justifyContent: "flex-end",
            alignItems: "flex-start",
            flexGrow: 1,
            maxWidth: 620,
            gap: 3.25,
          }}
        >
          <Typography
            variant="overline"
            sx={{
              color: alpha(textColor, 0.9),
              textTransform: "uppercase",
            }}
          >
            Fine-Art Photography &amp; Digital Painting
          </Typography>

          <Typography
            variant="h1"
            sx={{
              color: textColor,
              fontSize: { xs: 60, md: 82 },
            }}
          >
            Steps beyond reality
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: alpha(textColor, 0.75),
              lineHeight: 1.65,
              maxWidth: "40ch",
            }}
          >
            Abstract, minimal and surreal works — printed by hand on museum
            cotton.
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

                <Stack direction="row" sx={{ alignItems: "flex-end", gap: 1 }}>
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
                        height: index === activeIndex ? 88 : 66,
                        maxWidth: index === activeIndex ? 132 : 96,
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
