import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "@/store/base-query";
import type { Collection, CollectionDetail } from "@/types/collections";

export type CollectionFilters = {
  visibility?: boolean;
};

export const collectionsApi = createApi({
  reducerPath: "collectionsApi",
  baseQuery,
  tagTypes: ["Collections"],
  endpoints: (builder) => ({
    getCollections: builder.query<Collection[], CollectionFilters | void>({
      query: (filters) => {
        const params: Record<string, string> = {};
        if (filters?.visibility) params.visibility = "true";

        return { url: "/collections", params };
      },
      transformResponse: (response: { data: Collection[] }) => response.data,
      providesTags: ["Collections"],
    }),
    getCollection: builder.query<CollectionDetail, string>({
      query: (slug) => `/collections/${slug}`,
      transformResponse: (response: { data: CollectionDetail }) =>
        response.data,
      providesTags: ["Collections"],
    }),
    addCollection: builder.mutation<Collection, { title: string }>({
      query: (body) => ({ url: "/collections", method: "POST", body }),
      transformResponse: (response: { data: Collection }) => response.data,
      invalidatesTags: ["Collections"],
    }),
    updateCollection: builder.mutation<
      Collection,
      { id: string; body: { title?: string; visibility?: boolean } }
    >({
      query: ({ id, body }) => ({
        url: `/collections/${id}`,
        method: "PATCH",
        body,
      }),
      transformResponse: (response: { data: Collection }) => response.data,
      invalidatesTags: ["Collections"],
    }),
    setCollectionCover: builder.mutation<
      Collection,
      { id: string; coverPhotoId: string }
    >({
      query: ({ id, coverPhotoId }) => ({
        url: `/collections/${id}/cover`,
        method: "PATCH",
        body: { coverPhotoId },
      }),
      transformResponse: (response: { data: Collection }) => response.data,
      invalidatesTags: ["Collections"],
    }),
    rearrangeCollections: builder.mutation<void, string[]>({
      query: (orderedIds) => ({
        url: "/collections/rearrange",
        method: "PATCH",
        body: { orderedIds },
      }),
      invalidatesTags: ["Collections"],
    }),
    deleteCollection: builder.mutation<void, string>({
      query: (id) => ({ url: `/collections/${id}`, method: "DELETE" }),
      invalidatesTags: ["Collections"],
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetCollectionQuery,
  useAddCollectionMutation,
  useUpdateCollectionMutation,
  useSetCollectionCoverMutation,
  useRearrangeCollectionsMutation,
  useDeleteCollectionMutation,
} = collectionsApi;
