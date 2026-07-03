import { Box } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FC } from "react";

import type { Award } from "@/types/awards";

import { AwardCard } from "./award-card";

type SortableAwardCardProps = {
  award: Award;
};

export const SortableAwardCard: FC<SortableAwardCardProps> = ({ award }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: award._id });

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        cursor: "grab",
        touchAction: "none",
        "&:active": { cursor: "grabbing" },
      }}
    >
      <AwardCard award={award} isArranging />
    </Box>
  );
};
