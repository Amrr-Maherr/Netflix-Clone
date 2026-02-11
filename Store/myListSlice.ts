import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MyListState, MyListItem } from '@/Types';

const myListSlice = createSlice({
  name: 'myList',
  initialState: [] as MyListState,
  reducers: {
    addToList: (state, action: PayloadAction<MyListItem>) => {
      const item = action.payload;
      const existingItem = state.find((i) => i.id === item.id);
      if (!existingItem) {
        state.push(item);
      }
    },
    removeFromList: (state, action: PayloadAction<number>) => {
      return state.filter((i) => i.id !== action.payload);
    },
    clearList: () => [],
  },
});

export const { addToList, removeFromList, clearList } = myListSlice.actions;
export default myListSlice.reducer;
