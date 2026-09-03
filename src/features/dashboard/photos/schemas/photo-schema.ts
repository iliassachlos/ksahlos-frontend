import { z } from "zod";

import type { Photo } from "@/types/photos";

const basePhotoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  collectionId: z.string().min(1, "Collection is required"),
  hero: z.boolean(),
});

// Additional validation for the image field based on whether it's an edit or a new photo
const requiredImage = z
  .instanceof(File, { message: "Please select an image" })
  .nullable()
  .refine((file): file is File => file !== null, {
    message: "Please select an image",
  });

const optionalImage = z.instanceof(File).nullable();

export const makePhotoSchema = (isEdit: boolean) =>
  basePhotoSchema.extend({ image: isEdit ? optionalImage : requiredImage });

export const photoSchema = makePhotoSchema(false);

export type PhotoFormValues = z.input<typeof photoSchema>;
export type PhotoSchema = z.output<typeof photoSchema>;

export const photoDefaultValues: PhotoFormValues = {
  image: null,
  title: "",
  description: "",
  collectionId: "",
  hero: false,
};

/**
 *  Maps a Photo object to the corresponding form values for the photo form
 *
 * @param photo - The Photo object to be mapped
 * @returns The corresponding form values for the photo form
 */
export const mapPhotoToFormValues = (photo: Photo): PhotoFormValues => ({
  image: null,
  title: photo.title,
  description: photo.description,
  collectionId: photo.collectionId,
  hero: photo.hero,
});
