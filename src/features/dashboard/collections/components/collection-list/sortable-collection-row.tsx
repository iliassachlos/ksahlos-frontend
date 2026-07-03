import { Box } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FC } from "react";

import type { Collection } from "@/types/collections";

import { CollectionRow } from "./collection-row";

type SortableCollectionRowProps = {
  collection: Collection;
  index: number;
};

export const SortableCollectionRow: FC<SortableCollectionRowProps> = ({
  collection,
  index,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: collection._id });

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
      <CollectionRow collection={collection} index={index} isArranging />
    </Box>
  );
};
