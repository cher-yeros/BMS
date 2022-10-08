import { createSlice } from "@reduxjs/toolkit";

export const attractionSiteSlice = createSlice({
  name: "attractionSite",
  initialState: {
    attractionSites: [],
  },
  reducers: {
    updateAttractionSites: (state, action) => {
      state.attractionSites = action.payload;
    },
  },
});

export const { updateAttractionSites } = attractionSiteSlice.actions;
export default attractionSiteSlice.reducer;
