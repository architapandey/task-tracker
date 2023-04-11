import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterReducer";
import { sampleApi } from "./api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [sampleApi.reducerPath]: sampleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sampleApi.middleware),
});
