import { IconButton } from "@mui/material";
import { useState, type FC } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import type { Collection } from "@/types/collections";

import { CollectionFormDialog } from "./collection-form-dialog";

type EditCollectionProps = {
  collection: Collection;
};

export const EditCollection: FC<EditCollectionProps> = ({ collection }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton size="small" onClick={() => setIsOpen(true)}>
        <EditOutlinedIcon fontSize="small" />
      </IconButton>

      {isOpen && (
        <CollectionFormDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          collection={collection}
        />
      )}
    </>
  );
};
