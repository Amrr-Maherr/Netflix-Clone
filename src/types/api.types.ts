/**
 * API Types - Request parameters and response wrappers
 */

import type { Movie } from './movie.types';
import type { TVShow } from './tv.types';

// Language codes (ISO 639-1)
export type LanguageCode = 
  | 'en' 
  | 'es' 
  | 'fr' 
  | 'de' 
  | 'it' 
  | 'pt' 
  | 'ja' 
  | 'ko' 
  | 'zh' 
  | 'ar' 
  | 'hi' 
  | 'ru'
  | string; // Allow other codes

// Sort options for discover endpoints
export type SortBy = 
  | 'popularity.asc'
  | 'popularity.desc'
  | 'release_date.asc'
  | 'release_date.desc'
  | 'revenue.asc'
  | 'revenue.desc'
  | 'primary_release_date.asc'
  | 'primary_release_date.desc'
  | 'original_title.asc'
  | 'original_title.desc'
  | 'vote_average.asc'
  | 'vote_average.desc'
  | 'vote_count.asc'
  | 'vote_count.desc'
  | 'first_air_date.asc'
  | 'first_air_date.desc';

// Discover movie parameters
export interface DiscoverMovieParams {
  page?: number;
  language?: LanguageCode;
  region?: string;
  sort_by?: SortBy;
  certification_country?: string;
  certification?: string;
  'certification.lte'?: string;
  'certification.gte'?: string;
  include_adult?: boolean;
  include_video?: boolean;
  primary_release_year?: number;
  'primary_release_date.gte'?: string;
  'primary_release_date.lte'?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  with_release_type?: number;
  year?: number;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  with_cast?: string;
  with_crew?: string;
  with_people?: string;
  with_companies?: string;
  with_genres?: string;
  without_genres?: string;
  with_keywords?: string;
  without_keywords?: string;
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;
  with_original_language?: string;
  with_watch_providers?: string;
  watch_region?: string;
  with_watch_monetization_types?: string;
  without_companies?: string;
}

// Discover TV parameters
export interface DiscoverTVParams {
  page?: number;
  language?: LanguageCode;
  sort_by?: SortBy;
  'air_date.gte'?: string;
  'air_date.lte'?: string;
  'first_air_date.gte'?: string;
  'first_air_date.lte'?: string;
  first_air_date_year?: number;
  timezone?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  with_genres?: string;
  with_networks?: string;
  without_genres?: string;
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;
  include_null_first_air_dates?: boolean;
  with_original_language?: string;
  without_keywords?: string;
  screened_theatrically?: boolean;
  with_companies?: string;
  with_keywords?: string;
  with_watch_providers?: string;
  watch_region?: string;
  with_watch_monetization_types?: string;
  with_status?: string;
  with_type?: string;
  without_companies?: string;
}

// Filtered movies response (custom wrapper)
export interface FilteredMoviesResponse {
  movies: Movie[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

// Filtered TV shows response (custom wrapper)
export interface FilteredTVShowsResponse {
  shows: TVShow[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

// All movies response (custom aggregated response)
export interface AllMoviesResponse {
  trendingMoviesWeek: Movie[];
  trendingMoviesDay: Movie[];
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  upcomingMovies: Movie[];
  nowPlayingMovies: Movie[];
}

// All TV shows response (custom aggregated response)
export interface AllTVShowsResponse {
  trendingTVWeek: TVShow[];
  trendingTVDay: TVShow[];
  popularTV: TVShow[];
  topRatedTV: TVShow[];
  airingTodayTV: TVShow[];
  onTheAirTV: TVShow[];
}

// API error response
export interface TMDBError {
  status_code: number;
  status_message: string;
  success: boolean;
}

// Generic API response wrapper
export interface APIResponse<T> {
  data?: T;
  error?: TMDBError;
}
