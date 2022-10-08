import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    hotelAdmins: [],
  },
  reducers: {
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
    updateHotelAdmins: (state, action) => {
      state.hotelAdmins = action.payload;
    },
  },
});

export const { updateUsers } = userSlice.actions;
export default userSlice.reducer;
