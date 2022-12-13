import { apiSlice } from "@/redux/api/apiSlice";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { nanoid } from "@reduxjs/toolkit";
import { IWallet } from "@/redux/interfaces";

export const apiSetup = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveNewWallet: builder.mutation({
      async queryFn({ wallet, uid }) {
        const userRef = doc(db, "users", uid);
        try {
          const wallets: IWallet[] = await updateDoc(userRef, {
            wallets: arrayUnion({
              id: nanoid(),
              name: wallet.name,
              type: wallet.type,
              balance: Number(wallet.balance),
            }),
            balance: increment(Number(wallet.balance)),
          });

          return { data: wallets };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["wallets"],
    }),
    updateUserData: builder.mutation({
      async queryFn({ uid, data, providedTags = [] }) {
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
        // debugger;
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
      providesTags: ["setup"],
    }),
  }),
});

export const {
  useSaveNewWalletMutation,
  useUpdateUserDataMutation,
  useIsUserSetupQuery,
} = apiSetup;
