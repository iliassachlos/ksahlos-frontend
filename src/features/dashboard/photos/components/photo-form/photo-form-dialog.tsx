import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack } from "@mui/material";
import type { FC } from "react";
import { useForm } from "react-hook-form";

import { DialogCard } from "@/components/ui/dialog-card";
import { RHFAutocomplete } from "@/components/ui/rhf-inputs/rhf-autocomplete";
import { RHFTextField } from "@/components/ui/rhf-inputs/rhf-text-field";
import { RHFUploadInput } from "@/components/ui/rhf-inputs/rhf-upload-input";
import {
  makePhotoSchema,
  mapPhotoToFormValues,
  photoDefaultValues,
  type PhotoFormValues,
  type PhotoSchema,
} from "@/features/dashboard/photos/schemas/photo-schema";
import {
  useAddPhotoMutation,
  useGetPhotosQuery,
  useUpdatePhotoMutation,
} from "@/store/apis/photos-api";
import { capitalizeFirstLetter } from "@/utils/utils";
import type { Photo } from "@/types/photos";

type PhotoFormDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  photo?: Photo;
};

export const PhotoFormDialog: FC<PhotoFormDialogProps> = (props) => {
  const { isOpen, onClose, photo } = props;

  const { data: photos } = useGetPhotosQuery();
  const [addPhoto, { isLoading: isAdding }] = useAddPhotoMutation();
  const [updatePhoto, { isLoading: isUpdating }] = useUpdatePhotoMutation();

  const isLoading = isAdding || isUpdating;

  const categories = [
    ...new Set(
      (photos ?? []).map((photo) => capitalizeFirstLetter(photo.category)),
    ),
  ];

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

    formData.append("title", data.title);
    formData.append("category", data.category);

    if (data.description) formData.append("description", data.description);

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

        <RHFAutocomplete
          name="category"
          control={control}
          options={categories}
          label="Category"
          placeholder="Select or create a category"
          fullWidth
        />

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
