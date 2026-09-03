import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TOKEN_STORAGE_KEY } from "@/utils/auth";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (token) headers.set("Authorization", `Bearer ${token}`);
    
    return headers;
  },
});
