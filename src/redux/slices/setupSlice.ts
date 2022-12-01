import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

interface IInitialSetupState {
  isSetupAccount: false;
  balance: number | string;
  status: string;
}

const initialState: IInitialSetupState = {
  isSetupAccount: false,
  balance: 0,
  status: "",
};

export const updateUserSetup = createAsyncThunk(
  "auth/updateUserSetup",
  async ({ uid, data }) => {
    debugger;
    const userRefDoc = doc(db, "users", uid);
    try {
      await updateDoc(userRefDoc, {
        ...data,
      });

      console.log(data);

      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const setupSlice = createSlice({
  name: "setup",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateUserSetup.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUserSetup.fulfilled, (state, action) => {
        state.status = "success";
        state.isSetupAccount = action.payload.isSetup;
      })
      .addCase(updateUserSetup.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export default setupSlice.reducer;
