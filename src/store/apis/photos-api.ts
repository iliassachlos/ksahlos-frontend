import type { Photo } from "@/types/photos";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type PhotosResponse = {
  data: Photo[];
}

export const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getPhotos: builder.query<Photo[], string | null>({
      query: (category) => ({
        url: "/photos",
        params: category ? { category } : undefined,
      }),
      transformResponse: (response: PhotosResponse) => response.data,
    }),
  }),
});

export const { useGetPhotosQuery } = photosApi;
