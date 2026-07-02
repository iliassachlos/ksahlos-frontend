import type { Photo } from "@/types/photos";
import { capitalizeFirstLetter } from "@/utils/utils";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Box, Dialog, IconButton, Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";

type PhotoDialogProps = {
  photo: Photo;
  onClose: () => void;
};

export const PhotoDialog: FC<PhotoDialogProps> = ({ photo, onClose }) => {
  const [showInfo, setShowInfo] = useState(false);

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
      <IconButton
        onClick={() => setShowInfo((prev) => !prev)}
        aria-label="Toggle info"
        sx={controlButtonSx}
      >
        <InfoOutlinedIcon />
      </IconButton>

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

        {showInfo && (
          <Stack
            direction="column"
            sx={{
              position: "absolute",
              inset: 0,
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: 2,
              p: { xs: 4, md: 8 },
              borderRadius: 2,
              bgcolor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(16px)",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 500, maxWidth: 640 }}>
              {capitalizeFirstLetter(photo.title)}
            </Typography>

            {photo.description && (
              <Typography
                variant="h5"
                color="textSecondary"
                sx={{ maxWidth: 640 }}
              >
                {photo.description}
              </Typography>
            )}
          </Stack>
        )}
      </Box>

      {renderToolbar()}
    </Dialog>
  );
};
