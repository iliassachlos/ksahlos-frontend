import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import type { FC } from "react";
import { useForm } from "react-hook-form";

import { DialogCard } from "@/components/ui/dialog-card";
import { RHFSelect } from "@/components/ui/rhf-inputs/rhf-select";
import { RHFSwitch } from "@/components/ui/rhf-inputs/rhf-switch";
import { RHFTextField } from "@/components/ui/rhf-inputs/rhf-text-field";
import { RHFUploadInput } from "@/components/ui/rhf-inputs/rhf-upload-input";
import {
  makePhotoSchema,
  mapPhotoToFormValues,
  photoDefaultValues,
  type PhotoFormValues,
  type PhotoSchema,
} from "@/features/dashboard/photos/schemas/photo-schema";
import { useGetCollectionsQuery } from "@/store/apis/collections-api";
import {
  useAddPhotoMutation,
  useUpdatePhotoMutation,
} from "@/store/apis/photos-api";
import type { Photo } from "@/types/photos";

type PhotoFormDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  photo?: Photo;
};

export const PhotoFormDialog: FC<PhotoFormDialogProps> = (props) => {
  const { isOpen, onClose, photo } = props;

  const { data: collections } = useGetCollectionsQuery();
  const [addPhoto, { isLoading: isAdding }] = useAddPhotoMutation();
  const [updatePhoto, { isLoading: isUpdating }] = useUpdatePhotoMutation();

  const isLoading = isAdding || isUpdating;

  const collectionOptions = (collections ?? []).map((collection) => ({
    value: collection._id,
    label: collection.title,
  }));

  const { control, handleSubmit } = useForm<
    PhotoFormValues,
    unknown,
    PhotoSchema
  >({
    resolver: zodResolver(makePhotoSchema(Boolean(photo))),
    values: photo ? mapPhotoToFormValues(photo) : photoDefaultValues,
  });

  const onSubmit = async (data: PhotoSchema) => {
    const formData = new FormData();

    if (data.image) formData.append("image", data.image);

    formData.append("title", data.title ?? "");
    formData.append("description", data.description ?? "");
    formData.append("collectionId", data.collectionId);
    formData.append("hero", String(data.hero));

    if (photo) {
      await updatePhoto({ id: photo._id, body: formData });
    } else {
      await addPhoto(formData);
    }

    onClose();
  };

  return (
    <DialogCard
      isOpen={isOpen}
      onClose={onClose}
      title={photo ? "Edit Photo" : "Add Photo"}
      showCloseIcon
    >
      <Stack
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        direction="column"
        sx={{ gap: 2, pt: 1 }}
      >
        <RHFUploadInput
          name="image"
          control={control}
          hint="JPG or PNG, Uploaded to Cloudinary"
          previewUrl={photo?.url}
        />

        <RHFTextField name="title" control={control} label="Title" fullWidth />

        <RHFTextField
          name="description"
          control={control}
          label="Description"
          fullWidth
          multiline
          minRows={2}
          maxRows={4}
        />

        <RHFSelect
          name="collectionId"
          control={control}
          options={collectionOptions}
          label="Collection"
          fullWidth
        />

        <RHFSwitch name="hero" control={control} label="Show on hero" />

        <Button
          type="submit"
          variant="contained"
          size="large"
          loading={isLoading}
        >
          {photo ? "Update Photo" : "Add Photo"}
        </Button>
      </Stack>
    </DialogCard>
  );
};
