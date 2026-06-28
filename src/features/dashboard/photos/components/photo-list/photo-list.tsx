import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Divider,
  InputAdornment,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Fragment,
  useState,
  type ChangeEvent,
  type FC,
  type KeyboardEvent,
} from "react";
import ArrangeIcon from "@mui/icons-material/ClearAll";

import { useGetPhotosQuery, type PhotoFilters } from "@/store/apis/photos-api";
import { capitalizeFirstLetter } from "@/utils/utils";

import { PhotoRow } from "./photo-row";

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

  const theme = useTheme();

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

        <Button
          variant="outlined"
          startIcon={<ArrangeIcon />}
          sx={{ height: 41 }}
        >
          Arrange
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
        {photos?.length ? (
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
