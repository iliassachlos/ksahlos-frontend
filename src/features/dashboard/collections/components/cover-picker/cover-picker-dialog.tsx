import { Box, CircularProgress, Grid, Stack, Typography, useTheme } from "@mui/material";
import type { FC } from "react";

import { DialogCard } from "@/components/ui/dialog-card";
import {
  useGetCollectionQuery,
  useSetCollectionCoverMutation,
} from "@/store/apis/collections-api";
import type { Collection } from "@/types/collections";

type CoverPickerDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  collection: Collection;
};

export const CoverPickerDialog: FC<CoverPickerDialogProps> = (props) => {
  const { isOpen, onClose, collection } = props;

  const theme = useTheme();

  const { data: detail, isLoading } = useGetCollectionQuery(collection.slug);
  const [setCover, { isLoading: isSaving }] = useSetCollectionCoverMutation();

  const photos = detail?.photos ?? [];

  const handlePick = async (coverPhotoId: string) => {
    await setCover({ id: collection._id, coverPhotoId });
    onClose();
  };

  return (
    <DialogCard
      isOpen={isOpen}
      onClose={onClose}
      title="Set Cover Photo"
      showCloseIcon
    >
      {isLoading ? (
        <Stack sx={{ alignItems: "center", py: 6 }}>
          <CircularProgress />
        </Stack>
      ) : photos.length ? (
        <Grid container spacing={1.5} sx={{ pt: 1 }}>
          {photos.map((photo) => {
            const isCurrent = photo._id === collection.coverPhotoId;

            return (
              <Grid size={4} key={photo._id}>
                <Box
                  component="img"
                  src={photo.url}
                  alt={photo.title}
                  onClick={() => !isSaving && handlePick(photo._id)}
                  sx={{
                    width: "100%",
                    aspectRatio: "3/4",
                    objectFit: "cover",
                    borderRadius: 1,
                    cursor: "pointer",
                    border: `2px solid ${
                      isCurrent ? theme.palette.primary.main : "transparent"
                    }`,
                    transition: "border-color 0.2s, opacity 0.2s",
                    "&:hover": { opacity: 0.85 },
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography variant="body2" color="textSecondary" sx={{ py: 4 }}>
          This collection has no photos yet. Add photos to it first
        </Typography>
      )}
    </DialogCard>
  );
};
