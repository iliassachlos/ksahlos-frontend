import {
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";

import { HEADER_HEIGHT } from "@/data/globals";
import { useGetCollectionsQuery } from "@/store/apis/collections-api";
import type { Collection } from "@/types/collections";

export const Collections = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { data: collections } = useGetCollectionsQuery({ visibility: true });

  const renderCollectionCard = (collection: Collection) => (
    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={collection._id}>
      <Card
        onClick={() => navigate(`/collections/${collection.slug}`)}
        sx={{
          position: "relative",
          aspectRatio: "3/4",
          overflow: "hidden",
          cursor: "pointer",
          bgcolor: theme.palette.background.tinted,
          "&:hover .img": { transform: "scale(1.05)" },
        }}
      >
        {collection.coverPhoto?.url && (
          <CardMedia
            className="img"
            image={collection.coverPhoto.url}
            sx={{
              position: "absolute",
              inset: 0,
              transition: "transform 1.1s cubic-bezier(.16,1,.3,1)",
            }}
          />
        )}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(20,18,15,.55), transparent 70%)",
          }}
        />
        <Stack
          direction="row"
          sx={{
            position: "absolute",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "white",
            left: 26,
            right: 26,
            bottom: 24,
          }}
        >
          <Typography variant="h5">{collection.title}</Typography>
          <IconButton
            sx={{
              border: "1px solid white",
              "&:hover": {
                backgroundColor: "white",
                "& .MuiSvgIcon-root": { color: "black" },
              },
            }}
          >
            <EastIcon sx={{ color: "white", width: 16, height: 16 }} />
          </IconButton>
        </Stack>
      </Card>
    </Grid>
  );

  return (
    <Stack
      id="collections"
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
        py: 16,
        gap: 3.5,
        scrollMarginTop: `${HEADER_HEIGHT}px`,
      }}
    >
      <Typography
        variant="overline"
        sx={{ display: "block", color: theme.palette.text.disabled }}
      >
        Print Collections
      </Typography>

      <Grid container spacing={3.5} sx={{ width: "100%" }}>
        {(collections ?? []).map(renderCollectionCard)}
      </Grid>
    </Stack>
  );
};
