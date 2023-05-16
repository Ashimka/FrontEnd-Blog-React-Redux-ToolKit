import { apiSlice } from "../../app/api/apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/",
    }),
    getFullPost: builder.query({
      query: (id) => `/post/${id}`,
    }),
    createNewPost: builder.mutation({
      query: (body) => ({
        url: "/post",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetFullPostQuery,
  useCreateNewPostMutation,
} = postsApiSlice;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const postsApiSlice = createApi({
//   reducerPath: "postsApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5006/",
//   }),
//   endpoints: (builder) => ({
//     getPosts: builder.query({
//       query: () => "/",
//     }),
//     getFullPost: builder.query({
//       query: (id) => `/post/${id}`,
//     }),
//     createNewPost: builder.mutation({
//       query: (body) => ({
//         url: "/post",
//         method: "POST",
//         body,
//       }),
//     }),
//   }),
// });
// export const {
//   useGetPostsQuery,
//   useGetFullPostQuery,
//   useCreateNewPostMutation,
// } = postsApiSlice;
