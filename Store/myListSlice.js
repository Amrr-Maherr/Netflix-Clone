import { createSlice } from '@reduxjs/toolkit';

const myListSlice = createSlice({
  name: 'myList',
  initialState: [],
  reducers: {
    addToList: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((i) => i.id === item.id);
      if (!existingItem) {
        state.push(item);
      }
    },
    removeFromList: (state, action) => {
      return state.filter((i) => i.id !== action.payload);
    },
    clearList: () => [],
  },
});

export const { addToList, removeFromList, clearList } = myListSlice.actions;
export default myListSlice.reducer;
