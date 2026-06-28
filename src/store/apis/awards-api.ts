import type { Award } from "@/types/awards";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/store/base-query";

type AwardsResponse = {
  data: Award[];
};

export const awardsApi = createApi({
  reducerPath: "awardsApi",
  baseQuery,
  endpoints: (builder) => ({
    getAwards: builder.query<Award[], void>({
      query: () => "/awards",
      transformResponse: (response: AwardsResponse) => response.data,
    }),
  }),
});

export const { useGetAwardsQuery } = awardsApi;
