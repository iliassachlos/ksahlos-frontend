import { Button } from "@mui/material";
import { useState, type FC } from "react";
import { AddPhotoDialog } from "./add-photo-dialog";
import AddIcon from "@mui/icons-material/Add";

export const AddPhoto: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenDialog}
      >
        Add Photo
      </Button>

      {isDialogOpen && (
        <AddPhotoDialog
          isOpen={isDialogOpen}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </>
  );
};
