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

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery(),
  tagTypes: ["wallets", "setup"],
  endpoints: (build) => ({
    signUpNewUser: build.mutation({
      async queryFn({ email, name, password }) {
        try {
          const userData = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          const usersCollectionRef = doc(db, "users", userData.user.uid);
          const walletsCollectionRef = doc(db, "wallets", userData.user.uid);
          const transactions = doc(db, "transactions", userData.user.uid);

          await setDoc(usersCollectionRef, {
            name,
            email,
            isSetup: false,
            balance: 0,
            expenses: 0,
            income: 0,
          });

          await setDoc(walletsCollectionRef, {});
          await setDoc(transactions, {});

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
            user: { uid },
          } = await signInWithEmailAndPassword(auth, passedEmail, password);

          const userRefDoc = doc(db, "users", uid);
          const userData = await getDoc(userRefDoc);

          return {
            data: {
              uid,
            },
          };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["setup"],
    }),
    getSpecificDocField: build.query({
      async queryFn({ fieldName, pathSegment, path }) {
        try {
          const docRef = doc(db, path, pathSegment);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.get(fieldName);
            return { data };
          }
        } catch (error) {
          return { error };
        }
      },
      providesTags: (result, error, { fieldName }) => [fieldName],
    }),
    getSpecificDoc: build.query({
      async queryFn({ path, pathSegment, transformData }) {
        try {
          const docRef = doc(db, path, pathSegment);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            return {
              data: transformData
                ? transformData(docSnap.data())
                : docSnap.data(),
            };
          }
        } catch (e) {
          alert(e);
        }
      },
      providesTags: (result, error, { path }) => [path],
    }),
  }),
});

export const {
  useSignUpNewUserMutation,
  useLogInUserWithCredentialsMutation,
  useGetSpecificDocFieldQuery,
  useGetSpecificDocQuery,
} = apiSlice;
