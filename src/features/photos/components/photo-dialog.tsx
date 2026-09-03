import type { Photo } from "@/types/photos";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, IconButton, Stack } from "@mui/material";
import { type FC } from "react";

type PhotoDialogProps = {
  photo: Photo;
  onClose: () => void;
};

export const PhotoDialog: FC<PhotoDialogProps> = ({ photo, onClose }) => {
  const controlButtonSx = {
    color: "white",
    bgcolor: "rgba(0, 0, 0, 0.45)",
    backdropFilter: "blur(6px)",
    "&:hover": { bgcolor: "rgba(0, 0, 0, 0.65)" },
  };

  const renderToolbar = () => (
    <Stack
      direction="row"
      sx={{
        position: "fixed",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        gap: 2,
      }}
    >
      <IconButton onClick={onClose} aria-label="Close" sx={controlButtonSx}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth={false}
      slotProps={{
        backdrop: { sx: { backgroundColor: "rgba(0, 0, 0, 0.85)" } },
        paper: {
          sx: {
            bgcolor: "transparent",
            boxShadow: "none",
            m: 0,
            overflow: "visible",
            maxWidth: "none",
            maxHeight: "none",
          },
        },
      }}
    >
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <Box
          component="img"
          src={photo.url}
          alt={photo.title}
          sx={{
            display: "block",
            maxWidth: "92vw",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: 2,
          }}
        />
      </Box>

      {renderToolbar()}
    </Dialog>
  );
};
