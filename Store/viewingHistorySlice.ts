import { createSlice } from '@reduxjs/toolkit';

interface ViewingHistoryItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  media_type: 'movie' | 'tv';
  watched_at: string;
  progress?: number; // For movies, 0-100; For TV shows, episode/season progress
}

interface ViewingHistoryState {
  items: ViewingHistoryItem[];
  lastViewed: ViewingHistoryItem[];
}

const viewingHistorySlice = createSlice({
  name: 'viewingHistory',
  initialState: {
    items: [],
    lastViewed: []
  },
  reducers: {
    addToViewingHistory: (state, action) => {
      const item = action.payload;
      
      // Remove existing item with same ID if it exists
      const existingIndex = state.items.findIndex((i) => i.id === item.id);
      if (existingIndex !== -1) {
        state.items.splice(existingIndex, 1);
      }
      
      // Add new item to beginning
      state.items.unshift({
        ...item,
        watched_at: new Date().toISOString()
      });
      
      // Keep only last 50 items
      if (state.items.length > 50) {
        state.items = state.items.slice(0, 50);
      }
      
      // Update last viewed (keep only last 10)
      const existingLastIndex = state.lastViewed.findIndex((i) => i.id === item.id);
      if (existingLastIndex !== -1) {
        state.lastViewed.splice(existingLastIndex, 1);
      }
      state.lastViewed.unshift({
        ...item,
        watched_at: new Date().toISOString()
      });
      
      if (state.lastViewed.length > 10) {
        state.lastViewed = state.lastViewed.slice(0, 10);
      }
    },
    
    updateProgress: (state, action) => {
      const { id, progress } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.progress = progress;
      }
      
      const lastViewItem = state.lastViewed.find((i) => i.id === id);
      if (lastViewItem) {
        lastViewItem.progress = progress;
      }
    },
    
    clearViewingHistory: (state) => {
      state.items = [];
      state.lastViewed = [];
    },
    
    removeFromViewingHistory: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      state.lastViewed = state.lastViewed.filter((i) => i.id !== id);
    }
  }
});

export const { addToViewingHistory, updateProgress, clearViewingHistory, removeFromViewingHistory } = viewingHistorySlice.actions;
export default viewingHistorySlice.reducer;
