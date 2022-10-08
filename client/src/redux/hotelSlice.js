import { createSlice } from "@reduxjs/toolkit";

export const hotelSlice = createSlice({
  name: "hotel",
  initialState: {
    hotels: [],
    myHotels: [],
  },
  reducers: {
    updateHotel: (state, action) => {
      state.hotels = action.payload;
    },
    updateMyHotel: (state, action) => {
      state.myHotels = action.payload;
    },
  },
});

export const { updateHotel, updateMyHotel } = hotelSlice.actions;
export default hotelSlice.reducer;
