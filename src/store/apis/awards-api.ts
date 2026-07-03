import type { Award } from "@/types/awards";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/store/base-query";

type AwardsResponse = {
  data: Award[];
};

export const awardsApi = createApi({
  reducerPath: "awardsApi",
  baseQuery,
  tagTypes: ["Awards"],
  endpoints: (builder) => ({
    getAwards: builder.query<Award[], void>({
      query: () => "/awards",
      transformResponse: (response: AwardsResponse) => response.data,
      providesTags: ["Awards"],
    }),
    addAward: builder.mutation<Award, FormData>({
      query: (body) => ({
        url: "/awards",
        method: "POST",
        body,
      }),
      transformResponse: (response: { data: Award }) => response.data,
      invalidatesTags: ["Awards"],
    }),
    rearrangeAwards: builder.mutation<void, string[]>({
      query: (orderedIds) => ({
        url: "/awards/rearrange",
        method: "PATCH",
        body: { orderedIds },
      }),
      invalidatesTags: ["Awards"],
    }),
    deleteAward: builder.mutation<void, string>({
      query: (id) => ({
        url: `/awards/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Awards"],
    }),
  }),
});

export const {
  useGetAwardsQuery,
  useAddAwardMutation,
  useRearrangeAwardsMutation,
  useDeleteAwardMutation,
} = awardsApi;
