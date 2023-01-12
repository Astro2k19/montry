import { apiSlice } from "@/redux/api/apiSlice";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, uploadImage } from "@/firebase/firebase.config";
import { nanoid } from "@reduxjs/toolkit";

export const apiSetup = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveNewWallet: builder.mutation({
      async queryFn({ wallet, uid }) {
        const walletsRef = doc(db, "wallets", uid);
        const userRef = doc(db, "users", uid);

        try {
          const docSnap = await setDoc(
            walletsRef,
            {
              [nanoid()]: {
                value: wallet.name,
                type: wallet.type,
                balance: Number(wallet.balance),
              },
            },
            { merge: true }
          );

          await updateDoc(userRef, {
            balance: increment(Number(wallet.balance)),
          });

          return { data: docSnap };
        } catch (error) {
          console.log(error);
          return { error };
        }
      },
      invalidatesTags: ["wallets"],
    }),
    updateUserData: builder.mutation({
      async queryFn({ uid, data, providedTags = [], test }) {
        const userRefDoc = doc(db, "users", uid);
        try {
          await updateDoc(userRefDoc, {
            ...data,
          });

          return { data };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: (result, error, { providedTags }) => providedTags,
    }),
    isUserSetup: builder.query({
      async queryFn({ uid }) {
        if (uid === null || uid === undefined) return { data: false };

        try {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            return { data: data["isSetup"] };
          }

          return { data: false };
        } catch (error) {
          return { error };
        }
      },
      // providesTags: ["setup"],
    }),
    finishSetup: builder.mutation({
      async queryFn({ uid, avatarPreview }) {
        const userRefDoc = doc(db, "users", uid);
        try {
          const bucket = await uploadImage(avatarPreview, uid);

          const data = await updateDoc(userRefDoc, {
            isSetup: true,
            imageUrl: bucket,
          });

          return { data };
        } catch (error) {
          return { error };
        }
      },
      async onQueryStarted(
        { uid, avatarPreview },
        { dispatch, queryFulfilled }
      ) {
        const pathResult = dispatch(
          apiSetup.util.updateQueryData("isUserSetup", { uid }, (draft) => {
            return true;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          pathResult.undo();
        }
      },
    }),
  }),
});

export const {
  useSaveNewWalletMutation,
  useUpdateUserDataMutation,
  useIsUserSetupQuery,
  useFinishSetupMutation,
} = apiSetup;
