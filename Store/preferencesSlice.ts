import { createSlice } from '@reduxjs/toolkit';

interface FilterPreferences {
  genre?: string;
  language?: string;
  year?: string;
  rating?: string;
  sortBy?: string;
  minRating?: number;
}

interface UserPreferences {
  filters: FilterPreferences;
  myListCategories: {
    [category: string]: string[]; // genre names as keys, array of IDs
  };
  theme: 'light' | 'dark' | 'auto';
  autoplay: boolean;
  subtitles: boolean;
  quality: 'low' | 'medium' | 'high';
  language: string;
}

interface PreferencesState {
  preferences: UserPreferences;
}

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    preferences: {
      filters: {},
      myListCategories: {},
      theme: 'dark',
      autoplay: true,
      subtitles: false,
      quality: 'high',
      language: 'en'
    }
  },
  reducers: {
    updateFilters: (state, action) => {
      state.preferences.filters = {
        ...state.preferences.filters,
        ...action.payload
      };
    },
    
    updateMyListCategories: (state, action) => {
      const { category, itemIds } = action.payload;
      state.preferences.myListCategories[category] = itemIds;
    },
    
    removeFromMyListCategory: (state, action) => {
      const { category, itemId } = action.payload;
      if (state.preferences.myListCategories[category]) {
        state.preferences.myListCategories[category] = state.preferences.myListCategories[category].filter(
          (id: string) => id !== itemId
        );
        // Remove empty categories
        if (state.preferences.myListCategories[category].length === 0) {
          delete state.preferences.myListCategories[category];
        }
      }
    },
    
    updateTheme: (state, action) => {
      state.preferences.theme = action.payload;
    },
    
    updateAutoplay: (state, action) => {
      state.preferences.autoplay = action.payload;
    },
    
    updateSubtitles: (state, action) => {
      state.preferences.subtitles = action.payload;
    },
    
    updateQuality: (state, action) => {
      state.preferences.quality = action.payload;
    },
    
    updateLanguage: (state, action) => {
      state.preferences.language = action.payload;
    },
    
    resetPreferences: (state) => {
      state.preferences = {
        filters: {},
        myListCategories: {},
        theme: 'dark',
        autoplay: true,
        subtitles: false,
        quality: 'high',
        language: 'en'
      };
    }
  }
});

export const {
  updateFilters,
  updateMyListCategories,
  removeFromMyListCategory,
  updateTheme,
  updateAutoplay,
  updateSubtitles,
  updateQuality,
  updateLanguage,
  resetPreferences
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
