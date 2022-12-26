import { apiSlice } from "@/redux/api/apiSlice";

export const apiDashboard = apiSlice.injectEndpoints({
  endpoint: (builder) => ({
    getDashboardGeneralData: builder.query({
      async queryFn({ uid }) {},
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
