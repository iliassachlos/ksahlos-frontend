import type { Award } from "@/types/awards";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Dialog, IconButton, Stack } from "@mui/material";
import type { FC } from "react";

interface PhotoCarouselModalProps {
  selected: Award | null;
  onClose: () => void;
}

export const PhotoCarouselModal: FC<PhotoCarouselModalProps> = ({
  selected,
  onClose,
}) => (
  <Dialog
    open={selected !== null}
    onClose={onClose}
    maxWidth={false}
    slotProps={{
      backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.92)" } },
      paper: {
        sx: {
          backgroundColor: "transparent",
          boxShadow: "none",
          overflow: "visible",
        },
      },
    }}
  >
    <Stack
      direction="row"
      sx={{
        justifyContent: "flex-end",
        alignItems: "center",
        alignSelf: "stretch",
        pb: 1,
      }}
    >
      <IconButton
        onClick={onClose}
        aria-label="Close"
        sx={{
          right: 0,
          color: "white",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Stack>

    {selected && (
      <Box
        component="img"
        src={selected.url}
        alt=""
        sx={{
          maxHeight: "85vh",
          maxWidth: "92vw",
          objectFit: "contain",
          display: "block",
          borderRadius: 1,
        }}
      />
    )}
  </Dialog>
);
