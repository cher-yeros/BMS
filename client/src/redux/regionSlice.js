import { createSlice } from "@reduxjs/toolkit";

export const regionSlice = createSlice({
  name: "region",
  initialState: {
    regions: [],
  },
  reducers: {
    updateRegion: (state, action) => {
      state.regions = action.payload;
    },
  },
});

export const { updateRegion } = regionSlice.actions;
export default regionSlice.reducer;
