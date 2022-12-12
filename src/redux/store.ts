import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import setupReducer from "./slices/setupSlice";
import { apiSlice } from "@/redux/api/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    setup: setupReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false
    }).concat(apiSlice.middleware)
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
