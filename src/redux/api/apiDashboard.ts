import { apiSlice } from "@/redux/api/apiSlice";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/firebase.config";
import { ref, getDownloadURL } from "firebase/storage";

export const apiDashboard = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardGeneralData: builder.query({
      async queryFn(uid) {
        try {
          const userDoc = doc(db, "users", uid);
          const docSnap = await getDoc(userDoc);

          if (docSnap.exists()) {
            return { data: docSnap.data() };
          }
        } catch (error) {
          return { error };
        }
      },
    }),
    getSpendingData: builder.query({
      async queryFn(uid: string) {},
    }),
    getTransactions: builder.query({
      async queryFn(uid: string) {},
    }),
    getAvatar: builder.query({
      async queryFn(uid: string) {
        try {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const avatarUrl = docSnap.get("imageUrl");
            const gsReference = ref(storage, avatarUrl);
            const url = await getDownloadURL(gsReference);

            return { data: url };
          }
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const {
  useGetDashboardGeneralDataQuery,
  useGetSpendingDataQuery,
  useGetTransactionsQuery,
  useGetAvatarQuery,
} = apiDashboard;
