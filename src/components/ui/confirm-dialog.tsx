import type { FC } from "react";
import { DialogCard } from "./dialog-card";
import { Button, DialogActions, Typography } from "@mui/material";

type ConfirmDialogProps = {
  title: string;
  message: string;
  type?: "info" | "error";
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
  const {
    title,
    message,
    type = "info",
    isLoading = false,
    onConfirm,
    onCancel,
  } = props;

  return (
    <DialogCard isOpen onClose={onCancel} title={title}>
      <Typography>{message}</Typography>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          loading={isLoading}
          color={type === "error" ? "error" : "primary"}
        >
          Confirm
        </Button>
      </DialogActions>
    </DialogCard>
  );
};
