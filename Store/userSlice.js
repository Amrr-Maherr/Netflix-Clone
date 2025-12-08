import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('netflix_user');
    return storedUser ? JSON.parse(storedUser) : { name: null, email: null, image: null };
  }
  return { name: null, email: null, image: null };
};

const saveUserToStorage = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('netflix_user', JSON.stringify(user));
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: loadUserFromStorage(),
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.image = action.payload.image;
      saveUserToStorage(state);
    },
    clearUser: (state) => {
      state.name = null;
      state.email = null;
      state.image = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('netflix_user');
      }
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
