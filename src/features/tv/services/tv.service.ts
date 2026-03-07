/**
 * TV Shows Service
 * Handles all TV show-related API calls
 */

import { tmdbApi } from '@/services/api/tmdb/tmdb.api';
import { TMDB_ENDPOINTS } from '@/services/api/tmdb/tmdb.endpoints';
import type { TVShow, DetailedTVShow, FilteredTVShowsResponse } from '@/types';

export const tvService = {
  /**
   * Get trending TV shows for the week
   */
  getTrendingWeek: async (language = 'en-US') => {
    const response = await tmdbApi.get<{ results: TVShow[] }>(
      TMDB_ENDPOINTS.TV.TRENDING_WEEK,
      { params: { language } }
    );
    return response.data.results;
  },

  /**
   * Get trending TV shows for the day
   */
  getTrendingDay: async (language = 'en-US') => {
    const response = await tmdbApi.get<{ results: TVShow[] }>(
      TMDB_ENDPOINTS.TV.TRENDING_DAY,
      { params: { language } }
    );
    return response.data.results;
  },

  /**
   * Get popular TV shows
   */
  getPopular: async (page = 1, language = 'en-US') => {
    const response = await tmdbApi.get<{ results: TVShow[] }>(
      TMDB_ENDPOINTS.TV.POPULAR,
      { params: { page, language } }
    );
    return response.data.results;
  },

  /**
   * Get top rated TV shows
   */
  getTopRated: async (page = 1, language = 'en-US') => {
    const response = await tmdbApi.get<{ results: TVShow[] }>(
      TMDB_ENDPOINTS.TV.TOP_RATED,
      { params: { page, language } }
    );
    return response.data.results;
  },

  /**
   * Get TV shows airing today
   */
  getAiringToday: async (page = 1, language = 'en-US') => {
    const response = await tmdbApi.get<{ results: TVShow[] }>(
      TMDB_ENDPOINTS.TV.AIRING_TODAY,
      { params: { page, language } }
    );
    return response.data.results;
  },

  /**
   * Get TV shows on the air
   */
  getOnTheAir: async (page = 1, language = 'en-US') => {
    const response = await tmdbApi.get<{ results: TVShow[] }>(
      TMDB_ENDPOINTS.TV.ON_THE_AIR,
      { params: { page, language } }
    );
    return response.data.results;
  },

  /**
   * Get detailed TV show information
   */
  getDetails: async (tvId: number, language = 'en-US') => {
    const response = await tmdbApi.get<DetailedTVShow>(
      TMDB_ENDPOINTS.TV.DETAILS(tvId),
      { params: { language } }
    );
    return response.data;
  },

  /**
   * Get TV show videos (trailers, teasers, etc.)
   */
  getVideos: async (tvId: number) => {
    const response = await tmdbApi.get<{ results: any[] }>(
      TMDB_ENDPOINTS.TV.VIDEOS(tvId)
    );
    return response.data.results;
  },

  /**
   * Get TV show credits (cast and crew)
   */
  getCredits: async (tvId: number) => {
    const response = await tmdbApi.get<{ cast: any[]; crew: any[] }>(
      TMDB_ENDPOINTS.TV.CREDITS(tvId)
    );
    return response.data;
  },

  /**
   * Get TV show keywords
   */
  getKeywords: async (tvId: number) => {
    const response = await tmdbApi.get<{ results: any[] }>(
      TMDB_ENDPOINTS.TV.KEYWORDS(tvId)
    );
    return response.data.results;
  },

  /**
   * Get similar TV shows
   */
  getSimilar: async (tvId: number, page = 1) => {
    const response = await tmdbApi.get<{ results: TVShow[] }>(
      TMDB_ENDPOINTS.TV.SIMILAR(tvId),
      { params: { page } }
    );
    return response.data.results;
  },

  /**
   * Get TV show recommendations
   */
  getRecommendations: async (tvId: number, page = 1) => {
    const response = await tmdbApi.get<{ results: TVShow[] }>(
      TMDB_ENDPOINTS.TV.RECOMMENDATIONS(tvId),
      { params: { page } }
    );
    return response.data.results;
  },

  /**
   * Get TV show reviews
   */
  getReviews: async (tvId: number, page = 1) => {
    const response = await tmdbApi.get<{ results: any[]; total_pages: number }>(
      TMDB_ENDPOINTS.TV.REVIEWS(tvId),
      { params: { page } }
    );
    return response.data;
  },

  /**
   * Get TV show images
   */
  getImages: async (tvId: number) => {
    const response = await tmdbApi.get<{ backdrops: any[]; posters: any[] }>(
      TMDB_ENDPOINTS.TV.IMAGES(tvId)
    );
    return response.data;
  },

  /**
   * Get external IDs for a TV show
   */
  getExternalIds: async (tvId: number) => {
    const response = await tmdbApi.get<{
      imdb_id: string;
      tvdb_id: number;
      facebook_id: string;
      twitter_id: string;
      instagram_id: string;
    }>(TMDB_ENDPOINTS.TV.EXTERNAL_IDS(tvId));
    return response.data;
  },

  /**
   * Get TV show watch providers
   */
  getWatchProviders: async (tvId: number) => {
    const response = await tmdbApi.get<{ results: any }>(
      TMDB_ENDPOINTS.TV.WATCH_PROVIDERS(tvId)
    );
    return response.data.results;
  },

  /**
   * Get TV show content ratings
   */
  getContentRatings: async (tvId: number) => {
    const response = await tmdbApi.get<{ results: any[] }>(
      TMDB_ENDPOINTS.TV.CONTENT_RATINGS(tvId)
    );
    return response.data.results;
  },

  /**
   * Get season details
   */
  getSeason: async (tvId: number, seasonNumber: number, language = 'en-US') => {
    const response = await tmdbApi.get<any>(
      TMDB_ENDPOINTS.TV.SEASON(tvId, seasonNumber),
      { params: { language } }
    );
    return response.data;
  },

  /**
   * Get episode details
   */
  getEpisode: async (
    tvId: number,
    seasonNumber: number,
    episodeNumber: number,
    language = 'en-US'
  ) => {
    const response = await tmdbApi.get<any>(
      TMDB_ENDPOINTS.TV.EPISODE(tvId, seasonNumber, episodeNumber),
      { params: { language } }
    );
    return response.data;
  },
};

export default tvService;
