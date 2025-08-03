import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/crypto";

const baseEndPoint = import.meta.env.VITE_BACKEND_DEV;

export const authApiSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseEndPoint,
    prepareHeaders: (headers) => {
      const token = getToken("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.query({
      query: ({ email, password }) => ({
        url: `register?email=${email}&password=${password}`,
        method: "GET",
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: (token) => ({
        url: "/Auth/logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

// Export the auto-generated hooks
export const { useLazyLoginQuery, useRegisterMutation, useLogoutMutation } =
  authApiSlice;
