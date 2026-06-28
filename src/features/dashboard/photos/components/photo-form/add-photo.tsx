import { Button } from "@mui/material";
import { useState, type FC } from "react";
import { PhotoFormDialog } from "./photo-form-dialog";
import AddIcon from "@mui/icons-material/Add";

export const AddPhoto: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setIsDialogOpen(true)}
      >
        Add Photo
      </Button>

      {isDialogOpen && (
        <PhotoFormDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
};
