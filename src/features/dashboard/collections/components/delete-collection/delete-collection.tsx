import { IconButton } from "@mui/material";
import { useState, type FC } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useDeleteCollectionMutation } from "@/store/apis/collections-api";

type DeleteCollectionProps = {
  collectionId: string;
};

export const DeleteCollection: FC<DeleteCollectionProps> = (props) => {
  const { collectionId } = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteCollection, { isLoading }] = useDeleteCollectionMutation();

  const handleDelete = async () => {
    await deleteCollection(collectionId).unwrap();
    setIsDialogOpen(false);
  };

  return (
    <>
      <IconButton size="small" onClick={() => setIsDialogOpen(true)}>
        <DeleteOutlineOutlinedIcon fontSize="small" />
      </IconButton>

      {isDialogOpen && (
        <ConfirmDialog
          type="error"
          title="Delete Collection"
          message="Are you sure you want to delete this collection? Collections with photos cannot be deleted"
          isLoading={isLoading}
          onCancel={() => setIsDialogOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};