import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user/all",
      keepUnusedDataFor: 5, //60
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
