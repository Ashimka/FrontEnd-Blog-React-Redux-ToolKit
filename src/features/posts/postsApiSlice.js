import { apiSlice } from "../../app/api/apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/",
    }),
    getFullPost: builder.query({
      query: (id) => `/post/${id}`,
    }),
    uploadImage: builder.mutation({
      query: (file) => ({
        url: "/upload",
        method: "POST",
        body: file,
      }),
    }),
    createNewPost: builder.mutation({
      query: (formData) => ({
        url: "/post",
        method: "POST",
        body: { ...formData },
      }),
    }),
    updatePost: builder.mutation({
      query: (formUpdata) => ({
        url: `/post/${formUpdata.id}/edit`,
        method: "PATCH",
        body: { ...formUpdata },
      }),
    }),
    removePost: builder.mutation({
      query: (id) => ({
        url: `post/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetFullPostQuery,
  useUploadImageMutation,
  useCreateNewPostMutation,
  useUpdatePostMutation,
  useRemovePostMutation,
} = postsApiSlice;
