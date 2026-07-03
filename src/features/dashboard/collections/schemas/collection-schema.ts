import { z } from "zod";

import type { Collection } from "@/types/collections";

export const collectionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  visibility: z.boolean(),
});

export type CollectionFormValues = z.infer<typeof collectionSchema>;

export const collectionDefaultValues: CollectionFormValues = {
  title: "",
  visibility: true,
};

export const mapCollectionToFormValues = (
  collection: Collection,
): CollectionFormValues => ({
  title: collection.title,
  visibility: collection.visibility,
});
