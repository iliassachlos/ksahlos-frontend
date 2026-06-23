import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import type { FC } from "react";

type AddPhotoDialogProps = {
  isOpen: boolean;
  handleCloseDialog: () => void;
};

export const AddPhotoDialog: FC<AddPhotoDialogProps> = (props) => {
  const { isOpen, handleCloseDialog } = props;

  const theme = useTheme();

  return (
    <Dialog open={isOpen} onClose={handleCloseDialog}>
      <DialogTitle>Add Photo</DialogTitle>
      <DialogContent>
        <Typography>Photo content goes here.</Typography>
      </DialogContent>
    </Dialog>
  );
};
