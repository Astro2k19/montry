import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/firebase/firebase.config";
import {arrayUnion, doc, getDoc, increment, setDoc, updateDoc} from "firebase/firestore";
import { setUser } from "@/redux/slices/authSlice";
import {nanoid} from "@reduxjs/toolkit";

const initialSignupUserState = (name: string, email: string) => ({
  name,
  email,
  isSetup: false,
  balance: 0,
  wallets: [],
});

export const apiSlice = createApi({
  baseQuery: fakeBaseQuery(),
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
              email,
              isSetup: false,
            })
          );
        } catch (error) {
          return { error };
        }
      },
    }),
    logInUserWithCredentials: build.mutation({
      async queryFn({ email: passedEmail, password, dispatch }) {
        try {
          console.log(passedEmail)
          const {
            user: { uid, email },
          } = await signInWithEmailAndPassword(auth, passedEmail, password);

          const userRefDoc = doc(db, "users", uid);
          const userData = await getDoc(userRefDoc);
          console.log(userData.data(), 'user data from firebase for isSetup')

          dispatch(
              setUser({
                uid,
                email,
                isSetup: userData.data()?.isSetup ?? false
              })
          );

          return {
            data: ''
          };

        } catch (error) {
          return { error };
        }
      },
    }),
    getSpecificUserField: build.query({
      async queryFn({ fieldName, uid }) {
        debugger
        try {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();

            console.log(data)
            return { data: data[fieldName] };
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
