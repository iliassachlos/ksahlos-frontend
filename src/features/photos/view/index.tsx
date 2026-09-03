import { useGetCollectionsQuery } from "@/store/apis/collections-api";
import { useGetPhotosQuery } from "@/store/apis/photos-api";
import type { Photo } from "@/types/photos";
import WestIcon from "@mui/icons-material/West";
import Masonry from "@mui/lab/Masonry";
import { Box, IconButton, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { useState, type FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PhotoDialog } from "../components/photo-dialog";

const SKELETON_HEIGHTS = [280, 380, 320, 420, 300, 360, 440, 290, 350, 410, 270, 390];

export const PhotosView: FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const [searchParams] = useSearchParams();
  const collectionSlug = searchParams.get("collection");

  const { data: collections } = useGetCollectionsQuery();
  const { data: photos, isLoading } = useGetPhotosQuery(
    collectionSlug ? { collection: collectionSlug } : undefined,
  );

  const theme = useTheme();
  const navigate = useNavigate();

  const collectionTitle = collections?.find(
    (collection) => collection.slug === collectionSlug,
  )?.title;

  return (
    <>
      <Stack
        direction="column"
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
          alignSelf: "stretch",
          gap: 2,
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            alignSelf: "stretch",
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => navigate("/")}
            aria-label="Back to home"
            sx={{
              width: 34,
              height: 34,
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

          <Typography variant="h3">{collectionTitle ?? ""}</Typography>
        </Stack>

        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={2}
          sx={{ width: "100%", m: 0 }}
        >
          {isLoading
            ? SKELETON_HEIGHTS.map((h, i) => (
                <Skeleton key={i} variant="rectangular" sx={{ height: h, borderRadius: 1 }} />
              ))
            : (photos ?? []).map((photo) => (
                <Box
                  key={photo._id}
                  onClick={() => setSelectedPhoto(photo)}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 1,
                    cursor: "pointer",
                    "& img": {
                      transition: "transform 1.1s cubic-bezier(.16,1,.3,1)",
                    },
                    "&:hover img": { transform: "scale(1.04)" },
                    "&:hover .overlay": { opacity: 1 },
                    "&:hover .overlay-title": {
                      transform: "translateY(0)",
                    },
                  }}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    style={{ width: "100%", display: "block" }}
                  />

                  <Stack
                    className="overlay"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                      px: 3,
                      opacity: 0,
                      transition: "opacity .45s cubic-bezier(.16,1,.3,1)",
                      bgcolor: "rgba(255, 255, 255, 0.55)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                  >
                    <Typography
                      className="overlay-title"
                      variant="h6"
                      sx={{
                        color: "#16171a",
                        fontWeight: 400,
                        letterSpacing: "-0.01em",
                        transform: "translateY(6px)",
                        transition: "transform .45s cubic-bezier(.16,1,.3,1)",
                      }}
                    >
                      {photo.title}
                    </Typography>
                  </Stack>
                </Box>
              ))}
        </Masonry>
      </Stack>

      {selectedPhoto && (
        <PhotoDialog photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
      )}
    </>
  );
};
