import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginSchema } from "@/features/login/schemas/login-schema";

type LoginResponse = {
  token: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginSchema>({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
      transformResponse: (response: LoginResponse) => response.token,
    }),
  }),
});

export const { useLoginMutation } = authApi;
