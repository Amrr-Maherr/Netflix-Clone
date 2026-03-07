/**
 * Movie Types - Complete movie data structures
 */

import type { BaseMedia, PaginatedResponse, SpokenLanguage, ProductionCountry, MovieStatus } from './base.types';
import type { Genre } from './genre.types';
import type { ProductionCompany } from './company.types';
import type { Credits } from './credits.types';
import type { VideosResponse } from './video.types';
import type { ImagesResponse } from './image.types';
import type { ReviewsResponse } from './review.types';
import type { KeywordsResponse } from './keyword.types';
import type { ExternalIds } from './external-ids.types';
import type { WatchProvidersResponse } from './watch-providers.types';

// Basic movie from list endpoints
export interface Movie extends BaseMedia {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
  media_type?: 'movie';
}

// Collection info
export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

// Release dates
export interface ReleaseDate {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}

export interface ReleaseDateResult {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDatesResponse {
  id?: number;
  results: ReleaseDateResult[];
}

// Alternative titles
export interface AlternativeTitle {
  iso_3166_1: string;
  title: string;
  type: string;
}

export interface AlternativeTitlesResponse {
  id?: number;
  titles: AlternativeTitle[];
}

// Translations
export interface TranslationData {
  homepage: string;
  overview: string;
  runtime: number;
  tagline: string;
  title: string;
}

export interface Translation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: TranslationData;
}

export interface TranslationsResponse {
  id?: number;
  translations: Translation[];
}

// Account states
export interface AccountStates {
  id?: number;
  favorite: boolean;
  rated: boolean | { value: number };
  watchlist: boolean;
}

// Lists
export interface ListItem {
  description: string;
  favorite_count: number;
  id: number;
  item_count: number;
  iso_639_1: string;
  list_type: string;
  name: string;
  poster_path: string | null;
}

export interface ListsResponse {
  id?: number;
  page: number;
  results: ListItem[];
  total_pages: number;
  total_results: number;
}

// Changes
export interface Change {
  key: string;
  items: Array<{
    id: string;
    action: string;
    time: string;
    iso_639_1?: string;
    iso_3166_1?: string;
    value?: string | number | boolean;
    original_value?: string | number | boolean;
  }>;
}

export interface ChangesResponse {
  changes: Change[];
}

// Detailed movie with all append_to_response data
export interface DetailedMovie extends Movie {
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  imdb_id: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: MovieStatus;
  tagline: string | null;
  
  // Appended responses
  videos?: VideosResponse;
  images?: ImagesResponse;
  credits?: Credits;
  recommendations?: PaginatedResponse<Movie>;
  similar?: PaginatedResponse<Movie>;
  reviews?: ReviewsResponse;
  release_dates?: ReleaseDatesResponse;
  external_ids?: ExternalIds;
  keywords?: KeywordsResponse;
  translations?: TranslationsResponse;
  alternative_titles?: AlternativeTitlesResponse;
  'watch/providers'?: WatchProvidersResponse;
  account_states?: AccountStates;
  lists?: ListsResponse;
  changes?: ChangesResponse;
}

// Movie list response
export type MovieListResponse = PaginatedResponse<Movie>;
