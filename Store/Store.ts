import { configureStore } from "@reduxjs/toolkit";
import myListReducer from "./myListSlice";
import userReducer from "./userSlice";
import type { RootState } from "@/Types";

export const store = configureStore({
  reducer: {
    myList: myListReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

// Type-safe hooks
export type { RootState };
