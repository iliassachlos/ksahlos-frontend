import type { Photo } from "@/types/photos";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type PhotosResponse = {
  data: Photo[];
};

export type PhotoFilters = {
  title?: string;
  category?: string;
};

export const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getPhotos: builder.query<Photo[], PhotoFilters | void>({
      query: (filters) => {
        const params: Record<string, string> = {};
        if (filters?.title) params.title = filters.title;
        if (filters?.category) params.category = filters.category;

        return { url: "/photos", params };
      },
      transformResponse: (response: PhotosResponse) => response.data,
    }),
  }),
});

export const { useGetPhotosQuery } = photosApi;
