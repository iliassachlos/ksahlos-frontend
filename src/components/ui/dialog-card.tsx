import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import type { FC, PropsWithChildren } from "react";
import CloseIcon from "@mui/icons-material/Close";

type DialogCardProps = {
  isOpen: boolean;
  showCloseIcon?: boolean;
  onClose: () => void;
  title: string;
} & PropsWithChildren;

export const DialogCard: FC<DialogCardProps> = (props) => {
  const { isOpen, showCloseIcon, children, title, onClose } = props;

  const theme = useTheme();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(15, 16, 18, 0.5)",
            backdropFilter: "blur(4px)",
          },
        },
        paper: {
          elevation: 0,
          sx: {
            borderRadius: 4,
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: "0 24px 60px -12px rgba(15, 16, 18, 0.25)",
            p: 1,
          },
        },
      }}
    >
      <DialogTitle>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: 24 }}>{title}</Typography>

          {showCloseIcon && (
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Stack>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
