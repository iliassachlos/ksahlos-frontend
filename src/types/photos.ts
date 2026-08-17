export interface Photo {
  _id: string;
  title: string;
  description: string;
  url: string;
  collectionId: string;
  number: number;
  visibility: boolean;
  hero: boolean;
  cloudinaryId: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
