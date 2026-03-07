/**
 * Media Details Service
 * Combined service for getting detailed information about movies and TV shows
 */

import { moviesService } from '@/features/movies/services/movies.service';
import { tvService } from '@/features/tv/services/tv.service';
import type { DetailedMovie, DetailedTVShow } from '@/types';

export type MediaType = 'movie' | 'tv';

export const mediaDetailsService = {
  /**
   * Get detailed information for a movie or TV show
   */
  getDetails: async (id: number, mediaType: MediaType, language = 'en-US') => {
    if (mediaType === 'movie') {
      return moviesService.getDetails(id, language) as Promise<DetailedMovie>;
    }
    return tvService.getDetails(id, language) as Promise<DetailedTVShow>;
  },

  /**
   * Get videos (trailers, teasers) for a movie or TV show
   */
  getVideos: async (id: number, mediaType: MediaType) => {
    if (mediaType === 'movie') {
      return moviesService.getVideos(id);
    }
    return tvService.getVideos(id);
  },

  /**
   * Get credits (cast and crew) for a movie or TV show
   */
  getCredits: async (id: number, mediaType: MediaType) => {
    if (mediaType === 'movie') {
      return moviesService.getCredits(id);
    }
    return tvService.getCredits(id);
  },

  /**
   * Get keywords for a movie or TV show
   */
  getKeywords: async (id: number, mediaType: MediaType) => {
    if (mediaType === 'movie') {
      return moviesService.getKeywords(id);
    }
    return tvService.getKeywords(id);
  },

  /**
   * Get similar media
   */
  getSimilar: async (id: number, mediaType: MediaType, page = 1) => {
    if (mediaType === 'movie') {
      return moviesService.getSimilar(id, page);
    }
    return tvService.getSimilar(id, page);
  },

  /**
   * Get recommendations
   */
  getRecommendations: async (id: number, mediaType: MediaType, page = 1) => {
    if (mediaType === 'movie') {
      return moviesService.getRecommendations(id, page);
    }
    return tvService.getRecommendations(id, page);
  },

  /**
   * Get reviews
   */
  getReviews: async (id: number, mediaType: MediaType, page = 1) => {
    if (mediaType === 'movie') {
      return moviesService.getReviews(id, page);
    }
    return tvService.getReviews(id, page);
  },

  /**
   * Get images
   */
  getImages: async (id: number, mediaType: MediaType) => {
    if (mediaType === 'movie') {
      return moviesService.getImages(id);
    }
    return tvService.getImages(id);
  },

  /**
   * Get external IDs
   */
  getExternalIds: async (id: number, mediaType: MediaType) => {
    if (mediaType === 'movie') {
      return moviesService.getExternalIds(id);
    }
    return tvService.getExternalIds(id);
  },

  /**
   * Get watch providers
   */
  getWatchProviders: async (id: number, mediaType: MediaType) => {
    if (mediaType === 'movie') {
      return moviesService.getWatchProviders(id);
    }
    return tvService.getWatchProviders(id);
  },
};

export default mediaDetailsService;
