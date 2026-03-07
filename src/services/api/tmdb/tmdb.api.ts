/**
 * TMDB API Configuration
 * Axios instance with base URL and authentication headers
 */

import axios from 'axios';

export const tmdbApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
  },
});

// Request interceptor for logging/debugging
tmdbApi.interceptors.request.use(
  (config) => {
    // Add timestamp for cache busting if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('TMDB API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.status_message || error.message,
    });
    return Promise.reject(error);
  }
);

export default tmdbApi;
