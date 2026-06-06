import type { Award } from "@/types/awards";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AwardsResponse {
  data: Award[];
}

export const awardsApi = createApi({
  reducerPath: "awardsApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getAwards: builder.query<Award[], void>({
      query: () => "/awards",
      transformResponse: (response: AwardsResponse) => response.data,
    }),
  }),
});

export const { useGetAwardsQuery } = awardsApi;
