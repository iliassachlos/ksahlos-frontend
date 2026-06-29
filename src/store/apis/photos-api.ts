import type { Photo } from "@/types/photos";
import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "@/store/base-query";
import { collectionsApi } from "./collections-api";

type PhotosResponse = {
  data: Photo[];
};

export type PhotoFilters = {
  title?: string;
  collection?: string;
};

// Photo changes affect collection contents and the resolved cover photo, which
// live in a separate API slice — cross-invalidate Collections after success.
const invalidateCollections = async (
  _arg: unknown,
  {
    dispatch,
    queryFulfilled,
  }: {
    dispatch: (action: unknown) => unknown;
    queryFulfilled: Promise<unknown>;
  },
) => {
  await queryFulfilled;
  dispatch(collectionsApi.util.invalidateTags(["Collections"]));
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
        if (filters?.collection) params.collection = filters.collection;

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
      onQueryStarted: invalidateCollections,
    }),
    updatePhoto: builder.mutation<Photo, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/photos/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: (response: { data: Photo }) => response.data,
      invalidatesTags: ["Photos"],
      onQueryStarted: invalidateCollections,
    }),
    deletePhoto: builder.mutation<void, string>({
      query: (id) => ({
        url: `/photos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Photos"],
      onQueryStarted: invalidateCollections,
    }),
    rearrangePhotos: builder.mutation<void, string[]>({
      query: (orderedIds) => ({
        url: "/photos/rearrange",
        method: "PATCH",
        body: { orderedIds },
      }),
      invalidatesTags: ["Photos"],
      onQueryStarted: invalidateCollections,
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
