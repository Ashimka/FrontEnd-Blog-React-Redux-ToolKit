import { apiSlice } from "../../app/api/apiSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/",
      keepUnusedDataFor: 0.1,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Posts", id })),
              { type: "Posts", id: "LIST" },
            ]
          : [{ type: "Posts", id: "LIST" }],
    }),
    getFullPost: builder.query({
      query: (id) => `/post/${id}`,
      keepUnusedDataFor: 0.1,
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    uploadImage: builder.mutation({
      query: (file) => ({
        url: "/upload",
        method: "POST",
        body: file,
      }),
      keepUnusedDataFor: 0.1,
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    createNewPost: builder.mutation({
      query: (formData) => ({
        url: "/post",
        method: "POST",
        body: { ...formData },
      }),
      keepUnusedDataFor: 0.1,
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    updatePost: builder.mutation({
      query: (formUpdata) => ({
        url: `/post/${formUpdata.id}/edit`,
        method: "PATCH",
        body: { ...formUpdata },
      }),
      keepUnusedDataFor: 0.1,
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    removePost: builder.mutation({
      query: (id) => ({
        url: `/post/${id}`,
        method: "DELETE",
      }),
      keepUnusedDataFor: 0.1,
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),
    createTags: builder.mutation({
      query: (tag) => ({
        url: "/post/tags",
        method: "POST",
        body: { ...tag },
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
  useCreateTagsMutation,
} = postsApiSlice;
