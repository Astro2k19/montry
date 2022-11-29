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
    const userRefDoc = doc(db, "users", uid);
    try {
      await updateDoc(userRefDoc, {
        ...data,
      });

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
        return {
          ...state,
          ...action.payload,
        };
      })
      .addCase(updateUserSetup.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export default setupSlice.reducer;
