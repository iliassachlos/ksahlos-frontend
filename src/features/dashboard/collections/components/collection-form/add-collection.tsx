import { Button } from "@mui/material";
import { useState, type FC } from "react";
import AddIcon from "@mui/icons-material/Add";

import { CollectionFormDialog } from "./collection-form-dialog";

export const AddCollection: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setIsOpen(true)}
      >
        Add Collection
      </Button>

      {isOpen && (
        <CollectionFormDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
