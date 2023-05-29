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
      query: (formData) => ({
        url: "/post",
        method: "POST",
        body: formData,
      }),
    }),
    updatePost: builder.mutation({
      query: (formUpdata) => ({
        url: `/post/${formUpdata.id}/edit`,
        method: "PATCH",
        body: { ...formUpdata },
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
