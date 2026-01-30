import { configureStore } from "@reduxjs/toolkit";
import myListReducer from "./myListSlice";
import viewingHistoryReducer from "./viewingHistorySlice";
import preferencesReducer from "./preferencesSlice";

export const store = configureStore({
  reducer: {
    myList: myListReducer,
    viewingHistory: viewingHistoryReducer,
    preferences: preferencesReducer,
  },
});
