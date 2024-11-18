import { createSlice } from "@reduxjs/toolkit";

export const meSlice = createSlice({
  name: "me",
  initialState: {
    isLogin: false,
    token: null,
    me: null,
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
  },
});

export const { setToken, setLoginState, logout } = meSlice.actions;

export default meSlice.reducer;
