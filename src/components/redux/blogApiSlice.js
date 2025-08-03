import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "../utils/crypto";

const baseEndPoint = import.meta.env.VITE_BACKEND_DEV;

export const blogApiSlice = createApi({
  reducerPath: "blogApi",
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

  tagTypes: ["Blog"],

  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: (credentials) => ({
        url: "blog",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Blog"],
    }),
    getAllBlogs: builder.query({
      query: () => "blog",
      providesTags: ["Blog"],
    }),
    deletePosts: builder.mutation({
      query: (id) => ({
        url: `blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `blog/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useAddBlogMutation,
  useGetAllBlogsQuery,
  useDeletePostsMutation,
  useUpdateBlogMutation,
} = blogApiSlice;
