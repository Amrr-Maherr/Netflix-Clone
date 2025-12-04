import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import myListReducer from "./myListSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    myList: myListReducer,
  },
});
