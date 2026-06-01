import {
  collectionCategories,
  type CollectionCategory,
} from "@/data/collection-categories";
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
import React from "react";
import EastIcon from "@mui/icons-material/East";

export const Collections = () => {
  const theme = useTheme();

  const renderCollectionCard = (collection: CollectionCategory) => (
    <Grid size={{ xs: 6, md: 4 }}>
      <Card
        key={collection.title}
        sx={{
          position: "relative",
          aspectRatio: "3/4",
          overflow: "hidden",
          cursor: "pointer",
          "&:hover .img": { transform: "scale(1.05)" },
        }}
      >
        <CardMedia
          className="img"
          image={collection.image}
          sx={{
            position: "absolute",
            inset: 0,
            transition: "transform 1.1s cubic-bezier(.16,1,.3,1)",
          }}
        />
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
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
        py: 16,
        gap: 3.5,
      }}
    >
      <Typography
        variant="overline"
        sx={{ display: "block", color: theme.palette.text.disabled }}
      >
        Print Collections
      </Typography>

      <Typography variant="h2">Where the work finds a wall</Typography>

      <Grid container spacing={3.5} sx={{ width: "100%" }}>
        {collectionCategories.map((category, index) => (
          <React.Fragment key={`${category.title}-${index}`}>
            {renderCollectionCard(category)}
          </React.Fragment>
        ))}
      </Grid>
    </Stack>
  );
};
