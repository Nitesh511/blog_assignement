// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { authApiSlice } from "./authApiSlice";
import { blogApiSlice } from "./blogApiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [blogApiSlice.reducerPath]: blogApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(blogApiSlice.middleware),
});

export default store;
