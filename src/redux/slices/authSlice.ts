import { createSlice } from "@reduxjs/toolkit";
import { IInitialUserState, INewUser } from "@/redux/interfaces";

const initialState: IInitialUserState = {
  authUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      Object.entries(action.payload).forEach(([key, value]) => {
        if (state.authUser === null) {
          state.authUser = {};
        }

        state.authUser[key] = value;
      });
    },
    clearUser(state) {
      state.authUser = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
