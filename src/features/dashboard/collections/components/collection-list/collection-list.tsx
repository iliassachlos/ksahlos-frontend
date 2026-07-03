import { Button, Stack, Typography, useTheme } from "@mui/material";
import { Fragment, useEffect, useState, type FC } from "react";
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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  useGetCollectionsQuery,
  useRearrangeCollectionsMutation,
} from "@/store/apis/collections-api";
import type { Collection } from "@/types/collections";

import { CollectionRow } from "./collection-row";
import { SortableCollectionRow } from "./sortable-collection-row";

export const CollectionList: FC = () => {
  const theme = useTheme();

  const { data: collections } = useGetCollectionsQuery();
  const [rearrangeCollections, { isLoading: isSaving }] =
    useRearrangeCollectionsMutation();

  const [isArranging, setIsArranging] = useState(false);
  const [orderedCollections, setOrderedCollections] = useState<Collection[]>(
    [],
  );

  useEffect(() => {
    if (isArranging) setOrderedCollections(collections ?? []);
  }, [isArranging, collections]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrderedCollections((items) => {
      const oldIndex = items.findIndex((c) => c._id === active.id);
      const newIndex = items.findIndex((c) => c._id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleToggleArrange = async () => {
    if (!isArranging) {
      setIsArranging(true);
      return;
    }

    const orderedIds = orderedCollections.map((c) => c._id);
    const originalIds = (collections ?? []).map((c) => c._id);
    const orderChanged = orderedIds.some((id, i) => id !== originalIds[i]);

    if (orderChanged) await rearrangeCollections(orderedIds);
    setIsArranging(false);
  };

  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
        gap: 2,
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          alignSelf: "stretch",
        }}
      >
        <Button
          variant={isArranging ? "contained" : "outlined"}
          startIcon={<ArrangeIcon />}
          onClick={handleToggleArrange}
          loading={isSaving}
          sx={{ height: 41 }}
        >
          {isArranging ? "Done" : "Arrange"}
        </Button>
      </Stack>

      <Stack
        direction="column"
        sx={{
          justifyContent: "center",
          alignItems: "flex-start",
          alignSelf: "stretch",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
        }}
      >
        {isArranging ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={orderedCollections.map((c) => c._id)}
              strategy={verticalListSortingStrategy}
            >
              {orderedCollections.map((collection, index) => (
                <SortableCollectionRow
                  key={collection._id}
                  collection={collection}
                  index={index}
                />
              ))}
            </SortableContext>
          </DndContext>
        ) : collections?.length ? (
          collections.map((collection, index) => (
            <Fragment key={collection._id}>
              <CollectionRow collection={collection} index={index} />
            </Fragment>
          ))
        ) : (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ p: 4, textAlign: "center" }}
          >
            No collections yet
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
