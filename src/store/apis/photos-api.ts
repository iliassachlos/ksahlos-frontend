import type { Photo } from "@/types/photos";
import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "@/store/base-query";

type PhotosResponse = {
  data: Photo[];
};

export type PhotoFilters = {
  title?: string;
  category?: string;
};

export const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery,
  tagTypes: ["Photos"],
  endpoints: (builder) => ({
    getPhotos: builder.query<Photo[], PhotoFilters | void>({
      query: (filters) => {
        const params: Record<string, string> = {};
        if (filters?.title) params.title = filters.title;
        if (filters?.category) params.category = filters.category;

        return { url: "/photos", params };
      },
      transformResponse: (response: PhotosResponse) => response.data,
      providesTags: ["Photos"],
    }),
    addPhoto: builder.mutation<Photo, FormData>({
      query: (body) => ({
        url: "/photos/create",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: Photo }) => response.data,
      invalidatesTags: ["Photos"],
    }),
    updatePhoto: builder.mutation<Photo, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/photos/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: (response: { data: Photo }) => response.data,
      invalidatesTags: ["Photos"],
    }),
    deletePhoto: builder.mutation<void, string>({
      query: (id) => ({
        url: `/photos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Photos"],
    }),
    rearrangePhotos: builder.mutation<void, string[]>({
      query: (orderedIds) => ({
        url: "/photos/rearrange",
        method: "PATCH",
        body: { orderedIds },
      }),
      invalidatesTags: ["Photos"],
    }),
  }),
});

export const {
  useGetPhotosQuery,
  useAddPhotoMutation,
  useUpdatePhotoMutation,
  useDeletePhotoMutation,
  useRearrangePhotosMutation,
} = photosApi;
