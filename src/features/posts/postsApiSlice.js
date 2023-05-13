import { apiSlice } from "../../app/api/apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/",
      keepUnusedDataFor: 5, //60
    }),
    getFullPost: builder.query({
      query: (id) => `/post/${id}`,
      keepUnusedDataFor: 5, //60
    }),
  }),
});
export const { useGetPostsQuery, useGetFullPostQuery } = postsApiSlice;
