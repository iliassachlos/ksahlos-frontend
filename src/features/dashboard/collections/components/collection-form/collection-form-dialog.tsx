import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import type { FC } from "react";
import { useForm } from "react-hook-form";

import { DialogCard } from "@/components/ui/dialog-card";
import { RHFSwitch } from "@/components/ui/rhf-inputs/rhf-switch";
import { RHFTextField } from "@/components/ui/rhf-inputs/rhf-text-field";
import {
  collectionDefaultValues,
  collectionSchema,
  mapCollectionToFormValues,
  type CollectionFormValues,
} from "@/features/dashboard/collections/schemas/collection-schema";
import {
  useAddCollectionMutation,
  useUpdateCollectionMutation,
} from "@/store/apis/collections-api";
import type { Collection } from "@/types/collections";

type CollectionFormDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  collection?: Collection;
};

export const CollectionFormDialog: FC<CollectionFormDialogProps> = (props) => {
  const { isOpen, onClose, collection } = props;

  const [addCollection, { isLoading: isAdding }] = useAddCollectionMutation();
  const [updateCollection, { isLoading: isUpdating }] =
    useUpdateCollectionMutation();

  const isLoading = isAdding || isUpdating;

  const { control, handleSubmit } = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionSchema),
    values: collection
      ? mapCollectionToFormValues(collection)
      : collectionDefaultValues,
  });

  const onSubmit = async (data: CollectionFormValues) => {
    if (collection) {
      await updateCollection({ id: collection._id, body: data });
    } else {
      await addCollection({ title: data.title });
    }

    onClose();
  };

  return (
    <DialogCard
      isOpen={isOpen}
      onClose={onClose}
      title={collection ? "Edit Collection" : "Add Collection"}
      showCloseIcon
    >
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        direction="column"
        sx={{ gap: 2, pt: 1 }}
      >
        <RHFTextField name="title" control={control} label="Title" fullWidth />

        {collection && (
          <RHFSwitch
            name="visibility"
            control={control}
            label="Visible on website"
          />
        )}

        <Button
          type="submit"
          variant="contained"
          size="large"
          loading={isLoading}
        >
          {collection ? "Update Collection" : "Add Collection"}
        </Button>
      </Stack>
    </DialogCard>
  );
};
