import { createSlice, current } from "@reduxjs/toolkit";
import { IInitialUserState, INewUser } from "@/redux/interfaces";
import { apiSlice } from "@/redux/api/apiSlice";

const initialState: IInitialUserState = {
  authUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUser(state) {
      state.authUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      apiSlice.endpoints.signUpNewUser.matchFulfilled,
      authHandler
    );

    builder.addMatcher(
      apiSlice.endpoints.logInUserWithCredentials.matchFulfilled,
      authHandler
    );
  },
});

const authHandler = (state, { payload }) => {
  Object.entries(payload).forEach(([key, value]) => {
    if (state.authUser === null) {
      state.authUser = {};
    }

    console.log(payload);

    state.authUser[key] = value;

    console.log(current(state));
  });
};

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
