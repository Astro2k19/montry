import { apiSlice } from "@/redux/api/apiSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

export const apiDashboard = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardGeneralData: builder.query({
      async queryFn(uid) {
        try {
          const userDoc = doc(db, "users", uid);
          const docSnap = await getDoc(userDoc);

          console.log(docSnap, "snap");
          console.log(docSnap.data());

          if (docSnap.exists()) {
            return { data: docSnap.data() };
          }
        } catch (error) {
          return { error };
        }
      },
    }),
    getSpendingData: builder.query({
      async queryFn({ uid }) {},
    }),
    getTransactions: builder.query({
      async queryFn({ uid }) {},
    }),
  }),
});

export const {
  useGetDashboardGeneralDataQuery,
  useGetSpendingDataQuery,
  useGetTransactionsQuery,
} = apiDashboard;
