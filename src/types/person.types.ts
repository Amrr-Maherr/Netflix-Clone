/**
 * Person Types - Actor, director, crew member data structures
 */

import type { ExternalIds } from './external-ids.types';
import type { ImagesResponse } from './image.types';
import type { Movie } from './movie.types';
import type { TVShow } from './tv.types';
import type { PaginatedResponse, MediaType } from './base.types';

// Basic person from list endpoints
export interface Person {
  id: number;
  name: string;
  original_name: string;
  media_type?: 'person';
  adult: boolean;
  popularity: number;
  gender: number | null;
  known_for_department: string;
  profile_path: string | null;
  known_for?: Array<Movie | TVShow>;
}

// Combined credit (movie or TV)
export interface CombinedCastCredit {
  id: number;
  media_type: MediaType;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  character: string;
  
  // Movie specific
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
  
  // TV specific
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
  episode_count?: number;
}

export interface CombinedCrewCredit {
  id: number;
  media_type: MediaType;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
  
  // Movie specific
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
  
  // TV specific
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
  episode_count?: number;
}

export interface CombinedCredits {
  id?: number;
  cast: CombinedCastCredit[];
  crew: CombinedCrewCredit[];
}

// Movie credits for person
export interface MovieCastCredit {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface MovieCrewCredit {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
}

export interface MovieCredits {
  id?: number;
  cast: MovieCastCredit[];
  crew: MovieCrewCredit[];
}

// TV credits for person
export interface TVCastCredit {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  episode_count: number;
}

export interface TVCrewCredit {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  episode_count: number;
  job: string;
}

export interface TVCredits {
  id?: number;
  cast: TVCastCredit[];
  crew: TVCrewCredit[];
}

// Tagged images
export interface TaggedImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  id: string;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
  image_type: string;
  media: Movie | TVShow;
  media_type: 'movie' | 'tv';
}

export interface TaggedImagesResponse {
  id?: number;
  page: number;
  results: TaggedImage[];
  total_pages: number;
  total_results: number;
}

// Translations
export interface PersonTranslationData {
  biography: string;
}

export interface PersonTranslation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: PersonTranslationData;
}

export interface PersonTranslationsResponse {
  id?: number;
  translations: PersonTranslation[];
}

// Changes
export interface PersonChange {
  key: string;
  items: Array<{
    id: string;
    action: string;
    time: string;
    value?: string | number | boolean;
    original_value?: string | number | boolean;
  }>;
}

export interface PersonChangesResponse {
  changes: PersonChange[];
}

// Detailed person with all append_to_response data
export interface DetailedPerson extends Person {
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  homepage: string | null;
  imdb_id: string | null;
  place_of_birth: string | null;
  
  // Appended responses
  combined_credits?: CombinedCredits;
  movie_credits?: MovieCredits;
  tv_credits?: TVCredits;
  external_ids?: ExternalIds;
  images?: ImagesResponse;
  tagged_images?: TaggedImagesResponse;
  translations?: PersonTranslationsResponse;
  changes?: PersonChangesResponse;
  
  // Custom fields (not from TMDB API)
  awards?: unknown[];
  trivia?: unknown[];
  videos?: { results: unknown[] };
}

// Person list response
export type PersonListResponse = PaginatedResponse<Person>;
