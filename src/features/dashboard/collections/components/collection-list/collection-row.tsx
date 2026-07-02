import { Box, Button, Chip, Stack, Typography, useTheme } from "@mui/material";
import { useState, type FC } from "react";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import type { Collection } from "@/types/collections";

import { EditCollection } from "../collection-form/edit-collection";
import { DeleteCollection } from "../delete-collection/delete-collection";
import { CoverPickerDialog } from "../cover-picker/cover-picker-dialog";

type CollectionRowProps = {
  collection: Collection;
  index: number;
  isArranging?: boolean;
};

export const CollectionRow: FC<CollectionRowProps> = ({
  collection,
  index,
  isArranging,
}) => {
  const theme = useTheme();
  const [isCoverOpen, setIsCoverOpen] = useState(false);

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "stretch",
        px: 3,
        py: 2,
        gap: 2.5,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="body2" color="textDisabled" sx={{ width: 24 }}>
        {String(index + 1).padStart(2, "0")}
      </Typography>

      <Box
        component="img"
        src={collection.coverPhoto?.url}
        alt={collection.title}
        sx={{
          width: 68,
          height: 72,
          borderRadius: 1,
          objectFit: "cover",
          bgcolor: theme.palette.background.tinted,
        }}
      />

      <Stack sx={{ flexGrow: 1, minWidth: 0, gap: 0.25 }}>
        <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }} noWrap>
            {collection.title}
          </Typography>

          {!collection.visibility && (
            <Chip
              size="small"
              variant="outlined"
              label="Hidden"
              icon={<VisibilityOffOutlinedIcon />}
              sx={{ px: 1, "& .MuiChip-icon": { fontSize: 14 } }}
            />
          )}
        </Stack>

        <Typography variant="body2" color="textDisabled" sx={{ fontSize: 14 }}>
          /{collection.slug}
        </Typography>
      </Stack>

      {isArranging ? (
        <DragIndicatorIcon
          fontSize="small"
          sx={{ color: theme.palette.text.disabled }}
        />
      ) : (
        <Stack direction="row" sx={{ alignItems: "center", gap: 4 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<ImageOutlinedIcon />}
            onClick={() => setIsCoverOpen(true)}
          >
            Cover
          </Button>

          <Stack
            direction="row"
            sx={{ justifyContent: "flex-start", alignItems: "center", gap: 1 }}
          >
            <EditCollection collection={collection} />
            <DeleteCollection collectionId={collection._id} />
          </Stack>
        </Stack>
      )}

      {isCoverOpen && (
        <CoverPickerDialog
          isOpen={isCoverOpen}
          onClose={() => setIsCoverOpen(false)}
          collection={collection}
        />
      )}
    </Stack>
  );
};
