import { apiSlice } from "@/redux/api/apiSlice";
import { arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";
import { nanoid } from "@reduxjs/toolkit";

export const apiSetup = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveNewWallet: builder.mutation({
      async queryFn({ wallet, uid }) {
        const userRef = doc(db, "users", uid);
        try {
          await updateDoc(userRef, {
            wallets: arrayUnion({
              id: nanoid(),
              name: wallet.name,
              type: wallet.type,
              balance: Number(wallet.balance),
            }),
            balance: increment(Number(wallet.balance)),
          });
          return {data: ''};
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useSaveNewWalletMutation } = apiSetup;
