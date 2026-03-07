/**
 * Search Service
 * Handles multi-search and filtered search
 */

import { tmdbApi } from '@/services/api/tmdb/tmdb.api';
import { TMDB_ENDPOINTS } from '@/services/api/tmdb/tmdb.endpoints';
import type { SearchResult, MultiSearchResponse } from '@/types';

export interface SearchParams {
  query: string;
  page?: number;
  language?: string;
  includeAdult?: boolean;
}

export const searchService = {
  /**
   * Multi-search across movies, TV shows, and people
   */
  multiSearch: async (params: SearchParams): Promise<MultiSearchResponse> => {
    const { query, page = 1, language = 'en-US', includeAdult = false } = params;

    if (!query.trim()) {
      return { results: [], page: 1, total_pages: 0, total_results: 0 };
    }

    const response = await tmdbApi.get<MultiSearchResponse>(
      TMDB_ENDPOINTS.SEARCH.MULTI,
      {
        params: {
          query,
          page,
          language,
          include_adult: includeAdult,
        },
      }
    );

    return response.data;
  },

  /**
   * Search movies only
   */
  searchMovies: async (params: SearchParams) => {
    const { query, page = 1, language = 'en-US', includeAdult = false } = params;

    if (!query.trim()) {
      return { results: [], page: 1, total_pages: 0, total_results: 0 };
    }

    const response = await tmdbApi.get<{
      results: any[];
      page: number;
      total_pages: number;
      total_results: number;
    }>(TMDB_ENDPOINTS.SEARCH.MOVIE, {
      params: {
        query,
        page,
        language,
        include_adult: includeAdult,
      },
    });

    return response.data;
  },

  /**
   * Search TV shows only
   */
  searchTV: async (params: SearchParams) => {
    const { query, page = 1, language = 'en-US', includeAdult = false } = params;

    if (!query.trim()) {
      return { results: [], page: 1, total_pages: 0, total_results: 0 };
    }

    const response = await tmdbApi.get<{
      results: any[];
      page: number;
      total_pages: number;
      total_results: number;
    }>(TMDB_ENDPOINTS.SEARCH.TV, {
      params: {
        query,
        page,
        language,
        include_adult: includeAdult,
      },
    });

    return response.data;
  },

  /**
   * Search people only
   */
  searchPeople: async (params: SearchParams) => {
    const { query, page = 1, language = 'en-US', includeAdult = false } = params;

    if (!query.trim()) {
      return { results: [], page: 1, total_pages: 0, total_results: 0 };
    }

    const response = await tmdbApi.get<{
      results: any[];
      page: number;
      total_pages: number;
      total_results: number;
    }>(TMDB_ENDPOINTS.SEARCH.PERSON, {
      params: {
        query,
        page,
        language,
        include_adult: includeAdult,
      },
    });

    return response.data;
  },
};

export default searchService;
