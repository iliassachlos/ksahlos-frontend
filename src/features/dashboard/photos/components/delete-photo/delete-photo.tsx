import { IconButton } from "@mui/material";
import { useState, type FC } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useDeletePhotoMutation } from "@/store/apis/photos-api";

type DeletePhotoProps = {
  photoId: string;
};

export const DeletePhoto: FC<DeletePhotoProps> = (props) => {
  const { photoId } = props;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [deletePhoto, { isLoading }] = useDeletePhotoMutation();

  const handleDelete = async () => {
    await deletePhoto(photoId);
    
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
          title="Delete Photo"
          message="Are you sure you want to delete photo?"
          isLoading={isLoading}
          onCancel={() => setIsDialogOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};
