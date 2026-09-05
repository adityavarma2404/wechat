import { configureStore } from "@reduxjs/toolkit";

import { conversationsApi } from "../services/conversationsApi";
import { chatReducer } from "./chatSlice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    [conversationsApi.reducerPath]: conversationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(conversationsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
