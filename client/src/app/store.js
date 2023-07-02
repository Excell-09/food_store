import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/authentication/authSlice";
import queryReducer from "@/features/query/querySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    query: queryReducer,
  },
});
