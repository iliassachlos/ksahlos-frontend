import type { Photo } from "@/types/photos";
import { capitalizeFirstLetter } from "@/utils/utils";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import type { FC } from "react";

type PhotoDialogProps = {
  photo: Photo;
  onClose: () => void;
};

export const PhotoDialog: FC<PhotoDialogProps> = ({ photo, onClose }) => {
  const theme = useTheme();

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth={false}
      slotProps={{
        backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.6)" } },
        paper: {
          sx: {
            borderRadius: 2,
            overflow: "hidden",
            width: "90vw",
            maxWidth: 1200,
            maxHeight: "88vh",
            m: 2,
          },
        },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ height: "100%", minHeight: 0 }}
      >
        <Box
          component="img"
          src={photo.url}
          alt={photo.title}
          sx={{
            flex: "0 0 62%",
            position: "relative",
            backgroundColor: theme.palette.grey[200],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            minHeight: { xs: 260, md: "unset" },
            objectFit: "contain",
          }}
        />

        <Stack
          direction="column"
          sx={{
            flex: "1 1 38%",
            backgroundColor: theme.palette.background.default,
            p: { xs: 4, md: 5 },
            gap: 2.5,
            overflowY: "auto",
          }}
        >
          <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
            <IconButton onClick={onClose} aria-label="Close" size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>

          <Stack direction="column" sx={{ gap: 2, flex: 1 }}>
            <Typography
              variant="overline"
              sx={{
                color: theme.palette.text.disabled,
                letterSpacing: "0.22em",
              }}
            >
              {photo.category}
            </Typography>

            <Typography variant="h3">
              {capitalizeFirstLetter(photo.title)}
            </Typography>

            <Typography variant="body1" color="textSecondary">
              {photo.description}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
};
