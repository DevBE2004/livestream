import { createSlice } from "@reduxjs/toolkit";

export const meSlice = createSlice({
  name: "me",
  initialState: {
    isLogin: false,
    token: null,
    me: null,
    emailForgotPassword: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setLoginState: (state, action) => {
      state.isLogin = action.payload.isLogin;
      state.me = action.payload.me;
    },
    logout: (state) => {
      state.isLogin = false;
      state.token = null;
      state.me = null;
    },
    setEmailForgotPassword: (state, action) => {
      state.emailForgotPassword = action.payload.emailForgotPassword;
    },
  },
});

export const { setToken, setLoginState, logout, setEmailForgotPassword } =
  meSlice.actions;

export default meSlice.reducer;
