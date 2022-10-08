import { configureStore, createStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

const store = createStore(authReducer);
export default store;
