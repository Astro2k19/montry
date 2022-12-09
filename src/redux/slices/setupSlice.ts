import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";

interface IInitialSetupState {
  isSetup: false;
  balance: number | string;
  status: string;
}

const initialState: IInitialSetupState = {
  isSetup: false,
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

      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const getUserSetup = createAsyncThunk(
  "auth/getUserSetup",
  async ({ uid }) => {
    const userRefDoc = doc(db, "users", uid);
    try {
      const userData = await getDoc(userRefDoc);

      return userData.data();
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
        state.isSetup = action.payload.isSetup;
      })
      .addCase(updateUserSetup.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(getUserSetup.fulfilled, (state, action) => {
        Object.entries(action.payload).forEach(([key, value]) => {
          if (state.hasOwnProperty(key)) {
            state[key] = value;
          }
        });
      });
  },
});

export default setupSlice.reducer;
