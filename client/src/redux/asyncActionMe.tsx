import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetMe } from "../apis/user";
import { setLoginState } from "./meSlice";

export const getMe = createAsyncThunk(
  "user/me",
  async ({ rejectWithValue,dispatch }: any) => {
    const response = await apiGetMe();
    dispatch(setLoginState({ me: response.data.me, isLogin: true }));
    if (!response.data.success) return rejectWithValue(response);
    return response.data.me;
  }
);
