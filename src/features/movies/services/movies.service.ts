/**
 * Movies Service
 * Handles all movie-related API calls
 */

import { tmdbApi } from '@/services/api/tmdb/tmdb.api';
import { TMDB_ENDPOINTS } from '@/services/api/tmdb/tmdb.endpoints';
import type {
  Movie,
  DetailedMovie,
  FilteredMoviesResponse,
  DiscoverMovieParams,
} from '@/types';

export const moviesService = {
  /**
   * Get trending movies for the week
   */
  getTrendingWeek: async (language = 'en-US') => {
    const response = await tmdbApi.get<{ results: Movie[] }>(
      TMDB_ENDPOINTS.MOVIES.TRENDING_WEEK,
      { params: { language } }
    );
    return response.data.results;
  },

  /**
   * Get trending movies for the day
   */
  getTrendingDay: async (language = 'en-US') => {
    const response = await tmdbApi.get<{ results: Movie[] }>(
      TMDB_ENDPOINTS.MOVIES.TRENDING_DAY,
      { params: { language } }
    );
    return response.data.results;
  },

  /**
   * Get popular movies
   */
  getPopular: async (page = 1, language = 'en-US') => {
    const response = await tmdbApi.get<{ results: Movie[] }>(
      TMDB_ENDPOINTS.MOVIES.POPULAR,
      { params: { page, language } }
    );
    return response.data.results;
  },

  /**
   * Get top rated movies
   */
  getTopRated: async (page = 1, language = 'en-US') => {
    const response = await tmdbApi.get<{ results: Movie[] }>(
      TMDB_ENDPOINTS.MOVIES.TOP_RATED,
      { params: { page, language } }
    );
    return response.data.results;
  },

  /**
   * Get upcoming movies
   */
  getUpcoming: async (page = 1, language = 'en-US') => {
    const response = await tmdbApi.get<{ results: Movie[] }>(
      TMDB_ENDPOINTS.MOVIES.UPCOMING,
      { params: { page, language } }
    );
    return response.data.results;
  },

  /**
   * Get now playing movies
   */
  getNowPlaying: async (page = 1, language = 'en-US') => {
    const response = await tmdbApi.get<{ results: Movie[] }>(
      TMDB_ENDPOINTS.MOVIES.NOW_PLAYING,
      { params: { page, language } }
    );
    return response.data.results;
  },

  /**
   * Get detailed movie information
   */
  getDetails: async (movieId: number, language = 'en-US') => {
    const response = await tmdbApi.get<DetailedMovie>(
      TMDB_ENDPOINTS.MOVIES.DETAILS(movieId),
      { params: { language } }
    );
    return response.data;
  },

  /**
   * Get movie videos (trailers, teasers, etc.)
   */
  getVideos: async (movieId: number) => {
    const response = await tmdbApi.get<{ results: any[] }>(
      TMDB_ENDPOINTS.MOVIES.VIDEOS(movieId)
    );
    return response.data.results;
  },

  /**
   * Get movie credits (cast and crew)
   */
  getCredits: async (movieId: number) => {
    const response = await tmdbApi.get<{ cast: any[]; crew: any[] }>(
      TMDB_ENDPOINTS.MOVIES.CREDITS(movieId)
    );
    return response.data;
  },

  /**
   * Get movie keywords
   */
  getKeywords: async (movieId: number) => {
    const response = await tmdbApi.get<{ keywords: any[] }>(
      TMDB_ENDPOINTS.MOVIES.KEYWORDS(movieId)
    );
    return response.data.keywords;
  },

  /**
   * Get similar movies
   */
  getSimilar: async (movieId: number, page = 1) => {
    const response = await tmdbApi.get<{ results: Movie[] }>(
      TMDB_ENDPOINTS.MOVIES.SIMILAR(movieId),
      { params: { page } }
    );
    return response.data.results;
  },

  /**
   * Get movie recommendations
   */
  getRecommendations: async (movieId: number, page = 1) => {
    const response = await tmdbApi.get<{ results: Movie[] }>(
      TMDB_ENDPOINTS.MOVIES.RECOMMENDATIONS(movieId),
      { params: { page } }
    );
    return response.data.results;
  },

  /**
   * Get movie reviews
   */
  getReviews: async (movieId: number, page = 1) => {
    const response = await tmdbApi.get<{ results: any[]; total_pages: number }>(
      TMDB_ENDPOINTS.MOVIES.REVIEWS(movieId),
      { params: { page } }
    );
    return response.data;
  },

  /**
   * Get movie images
   */
  getImages: async (movieId: number) => {
    const response = await tmdbApi.get<{ backdrops: any[]; posters: any[] }>(
      TMDB_ENDPOINTS.MOVIES.IMAGES(movieId)
    );
    return response.data;
  },

  /**
   * Get external IDs for a movie
   */
  getExternalIds: async (movieId: number) => {
    const response = await tmdbApi.get<{ imdb_id: string; facebook_id: string; twitter_id: string; instagram_id: string }>(
      TMDB_ENDPOINTS.MOVIES.EXTERNAL_IDS(movieId)
    );
    return response.data;
  },

  /**
   * Get movie release dates
   */
  getReleaseDates: async (movieId: number) => {
    const response = await tmdbApi.get<{ results: any[] }>(
      TMDB_ENDPOINTS.MOVIES.RELEASE_DATES(movieId)
    );
    return response.data.results;
  },

  /**
   * Get movie watch providers
   */
  getWatchProviders: async (movieId: number) => {
    const response = await tmdbApi.get<{ results: any }>(
      TMDB_ENDPOINTS.MOVIES.WATCH_PROVIDERS(movieId)
    );
    return response.data.results;
  },

  /**
   * Discover movies with filters
   */
  discover: async (params: DiscoverMovieParams) => {
    const response = await tmdbApi.get<{
      results: Movie[];
      page: number;
      total_pages: number;
      total_results: number;
    }>(TMDB_ENDPOINTS.DISCOVER.MOVIE, { params });

    const data = response.data;
    return {
      movies: data.results,
      currentPage: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
    } as FilteredMoviesResponse;
  },
};

export default moviesService;
