import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    nearbyProducts: [],
    myProducts: [],
  },
  reducers: {
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    updateNearbyProducts: (state, action) => {
      state.nearbyProducts = action.payload;
    },
    updateMyProduct: (state, action) => {
      state.myProducts = action.payload;
    },
  },
});

export const {
  updateNearbyProducts,
  updateProducts,
  updateMyProduct,
} = productSlice.actions;
export default productSlice.reducer;
