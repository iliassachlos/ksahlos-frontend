import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Fragment,
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
  type KeyboardEvent,
} from "react";
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
  useGetPhotosQuery,
  useRearrangePhotosMutation,
  type PhotoFilters,
} from "@/store/apis/photos-api";
import { capitalizeFirstLetter } from "@/utils/utils";
import type { Photo } from "@/types/photos";

import { PhotoRow } from "./photo-row";
import { SortablePhotoRow } from "./sortable-photo-row";
import InfoIcon from "@mui/icons-material/Info";

const defaultFilters: PhotoFilters = {
  title: "",
  category: "",
};

export const PhotoList: FC = () => {
  const [filters, setFilters] = useState<PhotoFilters>(defaultFilters);
  const [appliedFilters, setAppliedFilters] =
    useState<PhotoFilters>(defaultFilters);

  const { data: allPhotos } = useGetPhotosQuery();
  const { data: photos } = useGetPhotosQuery(appliedFilters);
  const [rearrangePhotos, { isLoading: isSaving }] =
    useRearrangePhotosMutation();

  const [isArranging, setIsArranging] = useState(false);
  const [orderedPhotos, setOrderedPhotos] = useState<Photo[]>([]);

  // Keep the draft order in sync with fetched photos while arranging
  useEffect(() => {
    if (isArranging) setOrderedPhotos(photos ?? []);
  }, [isArranging, photos]);

  const theme = useTheme();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrderedPhotos((items) => {
      const oldIndex = items.findIndex((photo) => photo._id === active.id);
      const newIndex = items.findIndex((photo) => photo._id === over.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleToggleArrange = async () => {
    if (!isArranging) {
      setIsArranging(true);
      return;
    }

    const orderedIds = orderedPhotos.map((photo) => photo._id);
    const originalIds = (photos ?? []).map((photo) => photo._id);
    const orderChanged = orderedIds.some((id, i) => id !== originalIds[i]);

    if (orderChanged) await rearrangePhotos(orderedIds);
    setIsArranging(false);
  };

  const hasActiveFilters = Boolean(
    appliedFilters.title || appliedFilters.category,
  );

  const categories = [
    ...new Set((allPhotos ?? []).map((photo) => photo.category)),
  ];

  const handleTitleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFilters((prevFilters) => ({ ...prevFilters, title: e.target.value }));
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    const category = e.target.value;

    setFilters((prevFilters) => ({ ...prevFilters, category }));
    setAppliedFilters((prev) => ({ ...prev, category }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setAppliedFilters((prev) => ({ ...prev, title: filters.title }));
    }
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
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
          gap: 1,
        }}
      >
        <Stack
          direction="row"
          sx={{ justifyContent: " flex-start", alignItems: "center", gap: 2 }}
        >
          <TextField
            size="small"
            placeholder="Search by title..."
            name="title"
            value={filters.title}
            onChange={handleTitleChange}
            onKeyDown={handleKeyDown}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Select
            size="small"
            name="category"
            value={filters.category}
            onChange={handleCategoryChange}
            displayEmpty
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="">All categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {capitalizeFirstLetter(category)}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        <Stack
          direction="row"
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            alignSelf: "stretch",
            gap: 2,
          }}
        >
          {hasActiveFilters && (
            <Tooltip
              title={
                hasActiveFilters
                  ? "Cannot arrange photos while filters are active"
                  : ""
              }
              placement="left"
              arrow
            >
              <InfoIcon color="info" />
            </Tooltip>
          )}

          <Button
            variant={isArranging ? "contained" : "outlined"}
            startIcon={<ArrangeIcon />}
            onClick={handleToggleArrange}
            loading={isSaving}
            disabled={hasActiveFilters}
            sx={{ height: 41 }}
          >
            {isArranging ? "Done" : "Arrange"}
          </Button>
        </Stack>
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
              items={orderedPhotos.map((p) => p._id)}
              strategy={verticalListSortingStrategy}
            >
              {orderedPhotos.map((photo, index) => (
                <Fragment key={photo._id}>
                  {index > 0 && <Divider />}
                  <SortablePhotoRow photo={photo} index={index} />
                </Fragment>
              ))}
            </SortableContext>
          </DndContext>
        ) : photos?.length ? (
          photos.map((photo, index) => (
            <Fragment key={photo._id}>
              {index > 0 && <Divider />}
              <PhotoRow photo={photo} index={index} />
            </Fragment>
          ))
        ) : (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ p: 4, textAlign: "center" }}
          >
            No photos found.
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
