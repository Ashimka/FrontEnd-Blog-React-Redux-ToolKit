import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user/all",
    }),
    getOneUser: builder.query({
      query: () => `/user/me`,
    }),
    getUserPosts: builder.query({
      query: () => "/user/posts",
    }),
  }),
});

export const { useGetUsersQuery, useGetOneUserQuery, useGetUserPostsQuery } =
  usersApiSlice;
