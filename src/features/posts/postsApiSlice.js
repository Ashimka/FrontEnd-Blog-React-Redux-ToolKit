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
    updatePost: builder.mutation({
      query: (id, body) => ({
        url: `/post/${id}/edit`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetFullPostQuery,
  useCreateNewPostMutation,
  useUpdatePostMutation,
} = postsApiSlice;
