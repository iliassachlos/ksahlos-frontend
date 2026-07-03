import Masonry from "@mui/lab/Masonry";
import {
  Box,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";

import { PhotoDialog } from "@/features/photos/components/photo-dialog";
import { useGetCollectionQuery } from "@/store/apis/collections-api";
import type { Photo } from "@/types/photos";

const SKELETON_HEIGHTS = [
  280, 380, 320, 420, 300, 360, 440, 290, 350, 410, 270, 390,
];

export const CollectionView: FC = () => {
  const { slug = "" } = useParams();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const { data: collection, isLoading } = useGetCollectionQuery(slug);

  const theme = useTheme();
  const navigate = useNavigate();

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

          <Typography variant="h3">{collection?.title ?? ""}</Typography>
        </Stack>

        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          spacing={2}
          sx={{ width: "100%", m: 0 }}
        >
          {isLoading
            ? SKELETON_HEIGHTS.map((h, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  sx={{ height: h, borderRadius: 1 }}
                />
              ))
            : (collection?.photos ?? []).map((photo) => (
                <Box
                  key={photo._id}
                  onClick={() => setSelectedPhoto(photo)}
                  sx={{
                    overflow: "hidden",
                    borderRadius: 1,
                    cursor: "pointer",
                    "& img": {
                      transition: "transform 1.1s cubic-bezier(.16,1,.3,1)",
                    },
                    "&:hover img": { transform: "scale(1.04)" },
                  }}
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    style={{ width: "100%", display: "block" }}
                  />
                </Box>
              ))}
        </Masonry>
      </Stack>

      {selectedPhoto && (
        <PhotoDialog
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </>
  );
};
