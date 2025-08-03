// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginState: {
    email: "",
    password: "",
  },
  registerState: {
    email: "",
    password: "",
    confirmPassword: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //===LoginRegion==//
    setLoginState: (state, action) => {
      const data = action.payload;
      state.loginState = data;
    },
    // === REGISTER REGION ===
    setRegisterState: (state, action) => {
      const data = action.payload;
      state.registerState = data;
    },
  },
});

export const { setLoginState, setRegisterState } = authSlice.actions;

export default authSlice.reducer;

//====Login Region===//
export const selectLoginState = (state) => state.auth.loginState;

//==Register Region ====//
export const selectRegisterState = (state) => state.auth.registerState;
