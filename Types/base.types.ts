/**
 * Base Types - Shared interfaces and types used across the application
 */

// Common TMDB image paths
export interface TMDBImagePaths {
  backdrop_path: string | null;
  poster_path: string | null;
}

// Base media interface shared by movies and TV shows
export interface BaseMedia extends TMDBImagePaths {
  id: number;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  adult: boolean;
  original_language: string;
  genre_ids?: number[];
}

// Paginated response wrapper from TMDB
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// Date range for content
export interface DateRange {
  maximum: string;
  minimum: string;
}

// Spoken language
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// Production country
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// Media type discriminator
export type MediaType = 'movie' | 'tv' | 'person';

// Status types
export type MovieStatus = 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
export type TVStatus = 'Returning Series' | 'Planned' | 'In Production' | 'Ended' | 'Canceled' | 'Pilot';
