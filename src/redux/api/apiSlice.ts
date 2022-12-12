import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/firebase/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { setUser } from "@/redux/slices/authSlice";

const initialSignupUserState = (name: string, email: string) => ({
  name,
  email,
  isSetup: false,
  balance: 0,
  wallets: [],
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    signUpNewUser: builder.mutation({
      async queryFn({ email, name, password, dispatch }) {
        try {
          const userData = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const usersCollectionRef = doc(db, "users", userData.user.uid);
          await setDoc(usersCollectionRef, initialSignupUserState(name, email));

          dispatch(
            setUser({
              uid: userData.user.uid,
              email,
              isSetup: false,
            })
          );
        } catch (error) {
          return { error };
        }
      },
    }),
    logInUserWithCredentials: builder.mutation({
      async queryFn({ passedEmail, password }) {
        try {
          const {
            user: { uid, email },
          } = await signInWithEmailAndPassword(auth, passedEmail, password);

          return { uid, email };
        } catch (error) {
          return { error };
        }
      },
    }),
    getSpecificUserField: builder.query({
      async queryFn({ fieldName, uid }) {
        try {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log(data);
            return { data };
          }
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useSignUpNewUserMutation,
  useLogInUserWithCredentialsMutation,
  useGetSpecificUserFieldQuery,
} = apiSlice;
