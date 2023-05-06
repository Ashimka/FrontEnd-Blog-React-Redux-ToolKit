import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5006",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().persistedReducer.auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");
    // send refresh token to get new access token
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    if (refreshResult?.data) {
      const email = api.getState().persistedReducer.auth.email;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, email }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    }

    if (!refreshResult.data) {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
