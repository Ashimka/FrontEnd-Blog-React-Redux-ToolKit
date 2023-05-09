import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "user/registerUser",

  async (params, { dispatch }) => {
    try {
      const response = await fetch("http://localhost:5006/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      dispatch(newUser(data));

      return data;
    } catch (error) {
      return error;
    }
  }
);

const registerSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    status: null,
    error: null,
  },
  reducers: {
    newUser(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "error";
      });
  },
});

const { newUser } = registerSlice.actions;

export default registerSlice.reducer;
