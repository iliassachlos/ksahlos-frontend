import type { Photo } from "./photos";

export interface Collection {
  _id: string;
  title: string;
  slug: string;
  coverPhotoId: string | null;
  order: number;
  visibility: boolean;
  createdAt: string;
  updatedAt: string;
  coverPhoto: Photo | null;
}

export interface CollectionDetail extends Collection {
  photos: Photo[];
}