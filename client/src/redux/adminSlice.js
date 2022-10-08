import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    counts: [],
  },
  reducers: {
    updateCounts: (state, action) => {
      state.counts = action.payload;
    },
  },
});

export const { updateCounts } = adminSlice.actions;
export default adminSlice.reducer;
