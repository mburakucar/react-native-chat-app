import { createSlice } from "@reduxjs/toolkit";
import { setLoading, setProfile } from "./chatActions";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loading: false,
    profile: undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setLoading, (state, action) => {
        state.loading = action.payload;
      })
      .addCase(setProfile, (state, action) => {
        state.profile = action.payload;
      });
  },
});

export default chatSlice.reducer;
