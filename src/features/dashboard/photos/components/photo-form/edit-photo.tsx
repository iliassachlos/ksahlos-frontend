import type { Photo } from "@/types/photos";
import { IconButton } from "@mui/material";
import { useState, type FC } from "react";
import { PhotoFormDialog } from "./photo-form-dialog";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type EditPhotoProps = {
  photo: Photo;
};

export const EditPhoto: FC<EditPhotoProps> = ({ photo }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton size="small" onClick={() => setIsOpen(true)}>
        <EditOutlinedIcon fontSize="small" />
      </IconButton>

      {isOpen && (
        <PhotoFormDialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          photo={photo}
        />
      )}
    </>
  );
};
