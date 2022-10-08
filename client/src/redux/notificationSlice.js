import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    nots: [],
    unsynced: [],
  },
  reducers: {
    updateNotifications: (state, action) => {
      //  console.log(action.payload);
      state.nots = action.payload;
    },
    notificationSeen: (state, action) => {
      const i = state.nots.findIndex((not) => not.id == action.payload);
      state.nots[i].seen = true;
    },
    seenAll: (state) => {
      let newNots = [];
      state.nots.forEach((n) => {
        n.seen = true;
        newNots.push(n);
      });

      state.nots = newNots;
    },
    deleteNotification: (state) => {
      state.nots = [];
    },
  },
});

export const {
  updateNotifications,
  notificationSeen,
  seenAll,
  deleteNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
