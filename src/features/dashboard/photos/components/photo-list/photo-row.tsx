import { Box, Chip, Stack, Typography, useTheme } from "@mui/material";
import type { FC } from "react";

import type { Photo } from "@/types/photos";
import { capitalizeFirstLetter } from "@/utils/utils";
import CircleIcon from "@mui/icons-material/Circle";
import { EditPhoto } from "../photo-form/edit-photo";
import { DeletePhoto } from "../delete-photo/delete-photo";

type PhotoRowProps = {
  photo: Photo;
  index: number;
};

export const PhotoRow: FC<PhotoRowProps> = ({ photo, index }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "stretch",
        px: 3,
        py: 2,
        gap: 2.5,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="body2" color="textDisabled" sx={{ width: 24 }}>
        {String(index + 1).padStart(2, "0")}
      </Typography>

      <Box
        component="img"
        src={photo.url}
        alt={photo.title}
        sx={{
          width: 68,
          height: 72,
          borderRadius: 1,
          objectFit: "cover",
          bgcolor: theme.palette.background.tinted,
        }}
      />

      <Stack sx={{ flexGrow: 1, minWidth: 0, gap: 0.25 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }} noWrap>
          {photo.title}
        </Typography>
        <Typography
          variant="body2"
          color="textDisabled"
          noWrap
          sx={{
            fontStyle: photo.description ? "normal" : "italic",
            fontSize: 14,
          }}
        >
          {photo.description || "No description"}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
          gap: 6,
          minWidth: 240,
        }}
      >
        <Chip
          size="small"
          variant="outlined"
          label={capitalizeFirstLetter(photo.category)}
          icon={<CircleIcon />}
          sx={{
            p: 1,
            "& .MuiChip-icon": { fontSize: 8, mr: 0.2 },
          }}
        />

        <Stack direction="row" sx={{ gap: 1 }}>
          <EditPhoto photo={photo} />
          <DeletePhoto photoId={photo._id} />
        </Stack>
      </Stack>
    </Stack>
  );
};
