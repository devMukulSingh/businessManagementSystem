import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./slice";

export const store = configureStore({
  reducer: {
    adminSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
