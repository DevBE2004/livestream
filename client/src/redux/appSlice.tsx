import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isShowModal: false,
    contentModal: null,
  },
  reducers: {
    setModal: (state, action) => {
      state.isShowModal = action.payload.isShowModal;
      state.contentModal = action.payload.contentModal;
    },
  },
});

export const { setModal } = appSlice.actions;

export default appSlice.reducer;
