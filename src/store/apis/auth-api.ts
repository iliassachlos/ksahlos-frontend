import { createApi } from "@reduxjs/toolkit/query/react";
import type { LoginSchema } from "@/features/login/schemas/login-schema";
import { baseQuery } from "@/store/base-query";

type LoginResponse = {
  token: string;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
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
