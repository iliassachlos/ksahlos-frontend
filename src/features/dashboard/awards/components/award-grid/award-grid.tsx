import { Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState, type FC } from "react";
import ArrangeIcon from "@mui/icons-material/ClearAll";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import {
  useGetAwardsQuery,
  useRearrangeAwardsMutation,
} from "@/store/apis/awards-api";
import type { Award } from "@/types/awards";

import { AwardCard } from "./award-card";
import { SortableAwardCard } from "./sortable-award-card";

const GRID_SIZE = { xs: 6, sm: 4, md: 3 };

export const AwardGrid: FC = () => {
  const { data: awards } = useGetAwardsQuery();
  const [rearrangeAwards, { isLoading: isSaving }] =
    useRearrangeAwardsMutation();

  const [isArranging, setIsArranging] = useState(false);
  const [orderedAwards, setOrderedAwards] = useState<Award[]>([]);

  useEffect(() => {
    if (isArranging) setOrderedAwards(awards ?? []);
  }, [isArranging, awards]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setOrderedAwards((items) => {
      const oldIndex = items.findIndex((a) => a._id === active.id);
      const newIndex = items.findIndex((a) => a._id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleToggleArrange = async () => {
    if (!isArranging) {
      setIsArranging(true);
      return;
    }

    const orderedIds = orderedAwards.map((a) => a._id);
    const originalIds = (awards ?? []).map((a) => a._id);
    const orderChanged = orderedIds.some((id, i) => id !== originalIds[i]);

    if (orderChanged) {
      await rearrangeAwards(orderedIds);
    }

    setIsArranging(false);
  };

  const renderAwards = () => {
    if (!awards?.length) {
      return (
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ p: 4, textAlign: "center" }}
        >
          No awards yet.
        </Typography>
      );
    }

    return (
      <>
        {isArranging ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={orderedAwards.map((a) => a._id)}
              strategy={rectSortingStrategy}
            >
              <Grid container spacing={2} sx={{ width: "100%" }}>
                {orderedAwards.map((award) => (
                  <Grid size={GRID_SIZE} key={award._id}>
                    <SortableAwardCard award={award} />
                  </Grid>
                ))}
              </Grid>
            </SortableContext>
          </DndContext>
        ) : (
          <Grid container spacing={2} sx={{ width: "100%" }}>
            {awards.map((award) => (
              <Grid size={GRID_SIZE} key={award._id}>
                <AwardCard award={award} />
              </Grid>
            ))}
          </Grid>
        )}
      </>
    );
  };

  return (
    <Stack direction="column" sx={{ alignSelf: "stretch", gap: 2 }}>
      <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
        <Button
          variant={isArranging ? "contained" : "outlined"}
          startIcon={<ArrangeIcon />}
          onClick={handleToggleArrange}
          loading={isSaving}
          disabled={!awards?.length}
          sx={{ height: 41 }}
        >
          {isArranging ? "Done" : "Arrange"}
        </Button>
      </Stack>

      {renderAwards()}
    </Stack>
  );
};
