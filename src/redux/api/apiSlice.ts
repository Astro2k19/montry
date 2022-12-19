import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/firebase/firebase.config";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { setUser } from "@/redux/slices/authSlice";
import { nanoid } from "@reduxjs/toolkit";

const initialSignupUserState = (name: string, email: string) => ({
  name,
  email,
  isSetup: false,
  balance: 0,
  wallets: [],
});

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["wallets", "setup"],
  endpoints: (build) => ({
    signUpNewUser: build.mutation({
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
            })
          );

          return {
            data: {
              uid: userData.user.uid,
            },
          };
        } catch (error) {
          return { error };
        }
      },
    }),
    logInUserWithCredentials: build.mutation({
      async queryFn({ email: passedEmail, password }) {
        try {
          const {
            user: { uid, email },
          } = await signInWithEmailAndPassword(auth, passedEmail, password);

          const userRefDoc = doc(db, "users", uid);
          const userData = await getDoc(userRefDoc);

          return {
            data: uid,
          };
        } catch (error) {
          return { error };
        }
      },
      async onCacheEntryAdded(arg, { cacheDataLoaded, dispatch }) {
        try {
          const { data: uid } = await cacheDataLoaded;

          dispatch(setUser({ uid }));
        } catch (error) {
          alert(error);
        }
      },
      invalidatesTags: ["setup"],
    }),
    getSpecificUserField: build.query({
      async queryFn({ fieldName, uid }) {
        try {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            return { data: data[fieldName] };
          }
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result, error, { fieldName }) => [fieldName],
    }),
  }),
});

export const {
  useSignUpNewUserMutation,
  useLogInUserWithCredentialsMutation,
  useGetSpecificUserFieldQuery,
} = apiSlice;
