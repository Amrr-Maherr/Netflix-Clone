/**
 * Person Service
 * Handles actor and crew member information
 */

import { tmdbApi } from '@/services/api/tmdb/tmdb.api';
import { TMDB_ENDPOINTS } from '@/services/api/tmdb/tmdb.endpoints';
import type { DetailedPerson } from '@/types';

export const personService = {
  /**
   * Get detailed person information
   */
  getDetails: async (personId: number, language = 'en-US') => {
    const response = await tmdbApi.get<DetailedPerson>(
      TMDB_ENDPOINTS.PERSON.DETAILS(personId),
      { params: { language } }
    );
    return response.data;
  },

  /**
   * Get person images
   */
  getImages: async (personId: number) => {
    const response = await tmdbApi.get<{ profiles: any[] }>(
      TMDB_ENDPOINTS.PERSON.IMAGES(personId)
    );
    return response.data.profiles;
  },

  /**
   * Get tagged images
   */
  getTaggedImages: async (personId: number, page = 1) => {
    const response = await tmdbApi.get<{ results: any[]; total_pages: number }>(
      TMDB_ENDPOINTS.PERSON.TAGGED_IMAGES(personId),
      { params: { page } }
    );
    return response.data;
  },

  /**
   * Get movie credits
   */
  getMovieCredits: async (personId: number) => {
    const response = await tmdbApi.get<{ cast: any[]; crew: any[] }>(
      TMDB_ENDPOINTS.PERSON.MOVIE_CREDITS(personId)
    );
    return response.data;
  },

  /**
   * Get TV credits
   */
  getTVCredits: async (personId: number) => {
    const response = await tmdbApi.get<{ cast: any[]; crew: any[] }>(
      TMDB_ENDPOINTS.PERSON.TV_CREDITS(personId)
    );
    return response.data;
  },

  /**
   * Get combined credits (movies and TV)
   */
  getCombinedCredits: async (personId: number) => {
    const response = await tmdbApi.get<{ cast: any[]; crew: any[] }>(
      TMDB_ENDPOINTS.PERSON.COMBINED_CREDITS(personId)
    );
    return response.data;
  },

  /**
   * Get external IDs
   */
  getExternalIds: async (personId: number) => {
    const response = await tmdbApi.get<{
      imdb_id: string;
      facebook_id: string;
      twitter_id: string;
      instagram_id: string;
    }>(TMDB_ENDPOINTS.PERSON.EXTERNAL_IDS(personId));
    return response.data;
  },
};

export default personService;
