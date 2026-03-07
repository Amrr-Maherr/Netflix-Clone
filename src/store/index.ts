import { configureStore } from '@reduxjs/toolkit';
import myListReducer from './slices/myListSlice';
import userReducer from './slices/userSlice';
import type { RootState } from '@/types';

export const store = configureStore({
  reducer: {
    myList: myListReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

// Type-safe hooks
export type { RootState };
