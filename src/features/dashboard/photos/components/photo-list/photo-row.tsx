import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import type { FC } from "react";

import type { Photo } from "@/types/photos";
import { capitalizeFirstLetter } from "@/utils/utils";
import CircleIcon from "@mui/icons-material/Circle";

type PhotoRowProps = {
  photo: Photo;
  index: number;
  onEdit?: (photo: Photo) => void;
  onDelete?: (photo: Photo) => void;
};

export const PhotoRow: FC<PhotoRowProps> = ({
  photo,
  index,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        alignSelf: "stretch",
        px: 3,
        py: 2,
        gap: 2.5,
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
          justfyContent: "flex-start",
          alignItems: "center",
          alignSelf: "stretch",
          gap: 6,
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
          <IconButton size="small" onClick={() => onEdit?.(photo)}>
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete?.(photo)}>
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
