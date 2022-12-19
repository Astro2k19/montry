import { createSlice } from "@reduxjs/toolkit";

export interface IInitialSetupState {
  avatarPreview: string;
}

const initialState: IInitialSetupState = {
  avatarPreview: "",
};

const setupSlice = createSlice({
  name: "setup",
  initialState,
  reducers: {
    setPreviewAvatar(state, { payload }) {
      state.avatarPreview = payload;
    },
  },
});

export default setupSlice.reducer;
export const { setPreviewAvatar } = setupSlice.actions;
