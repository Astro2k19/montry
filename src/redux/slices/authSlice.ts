import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../firebase/firebase.config";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

type SignInStatus = "loading" | "success" | "error" | "initial";

interface IInitialUserState {
  authUser: IAuthUser | null;
  status: SignInStatus;
  error: string;
}

interface IAuthUser {
  email: string;
  uid: string;
}

interface INewUser {
  email: string;
  name?: string;
  password: string;
}

export const signUpNewUser = createAsyncThunk(
  "auth/newUser",
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
        wallets: [],
      });

      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const LogInUserWithGoogle = createAsyncThunk("auth/logUser", async () => {});

export const LogInUserWithCredentials = createAsyncThunk(
  "auth/logUser",
  async ({ passedEmail, password }: INewUser, thunkAPI) => {
    try {
      const {
        user: { uid, email },
      } = await signInWithEmailAndPassword(auth, passedEmail, password);
      const userData = await getDoc(doc(db, "users", uid));

      return { uid, email, isSetup: userData.data().isSetup };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState: IInitialUserState = {
  authUser: null,
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
      .addCase(signUpNewUser.fulfilled, (state, action) => {
        state.status = "success";
        state.error = "";
        state.authUser = action.payload;
      })
      .addCase(signUpNewUser.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string;
      })

      .addCase(LogInUserWithCredentials.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(LogInUserWithCredentials.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.error = "";
        state.authUser = {
          uid: payload.uid,
          email: payload.email,
        };
      })
      .addCase(LogInUserWithCredentials.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser, updateUser, setStatus } = authSlice.actions;
export default authSlice.reducer;
