// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addBlog: {
    title: "",
    category: "",
    tags: "",
    blogcontent: "",
  },
};

const authSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    //===Blog Region==//
    setBlogState: (state, action) => {
      const data = action.payload;
      state.addBlog = data;
    },
  },
});

export const { setBlogState } = authSlice.actions;

export default authSlice.reducer;

//====Login Region===//
export const selectBlogState = (state) => state.auth.loginState;
