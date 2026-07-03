import { Box } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FC } from "react";

import type { Photo } from "@/types/photos";

import { PhotoRow } from "./photo-row";

type SortablePhotoRowProps = {
  photo: Photo;
  index: number;
};

export const SortablePhotoRow: FC<SortablePhotoRowProps> = ({
  photo,
  index,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: photo._id });

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        alignSelf: "stretch",
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        cursor: "grab",
        touchAction: "none",
        "&:active": { cursor: "grabbing" },
      }}
    >
      <PhotoRow photo={photo} index={index} isArranging />
    </Box>
  );
};
