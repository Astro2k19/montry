import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore";

type SignInStatus = "loading" | "success" | "error" | "initial";

interface IInitialUserState {
  authUser: IAuthUser | null;
  status: SignInStatus;
  isSetup: boolean;
  error: string;
}

interface IAuthUser {
  email: string;
  uid: string;
}

interface INewUser {
  email: string;
  name: string;
  password: string;
}

export const signUpNewUser = createAsyncThunk(
  "auth/newuser",
  async ({ email, password, name }: INewUser, thunkAPI) => {
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const usersCollectionRef = doc(db, "users", userData.user.uid);
      await setDoc(usersCollectionRef, {
        name,
        email,
        isSetup: false,
        balance: 0,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState: IInitialUserState = {
  authUser: {
    email: "",
    uid: "",
  },
  isSetup: false,
  status: "initial",
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.authUser = action.payload;
    },
    clearUser(state) {
      state.authUser = null;
    },
    updateUser() {},
    setStatus(state, action) {
      // state.loading = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUpNewUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signUpNewUser.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.error = "";
        state.authUser = {
          uid: payload?.user.uid,
          email: payload?.user.email,
        };
      })
      .addCase(signUpNewUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser, updateUser, setStatus } = authSlice.actions;
export default authSlice.reducer;
