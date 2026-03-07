/**
 * TV Show Types - Complete TV show data structures
 */

import type { BaseMedia, PaginatedResponse, SpokenLanguage, ProductionCountry, TVStatus } from './base.types';
import type { Genre } from './genre.types';
import type { ProductionCompany } from './company.types';
import type { Network } from './network.types';
import type { Credits } from './credits.types';
import type { VideosResponse } from './video.types';
import type { ImagesResponse } from './image.types';
import type { ReviewsResponse } from './review.types';
import type { KeywordsResponse } from './keyword.types';
import type { ExternalIds } from './external-ids.types';
import type { WatchProvidersResponse } from './watch-providers.types';

// Basic TV show from list endpoints
export interface TVShow extends BaseMedia {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
  media_type?: 'tv';
}

// Creator
export interface Creator {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

// Episode
export interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
  crew?: Array<{
    id: number;
    credit_id: string;
    name: string;
    department: string;
    job: string;
    profile_path: string | null;
  }>;
  guest_stars?: Array<{
    id: number;
    name: string;
    credit_id: string;
    character: string;
    order: number;
    profile_path: string | null;
  }>;
}

// Season
export interface Season {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

// Detailed season
export interface DetailedSeason extends Season {
  _id: string;
  episodes: Episode[];
  credits?: Credits;
  external_ids?: ExternalIds;
  images?: ImagesResponse;
  videos?: VideosResponse;
}

// Content rating
export interface ContentRating {
  descriptors: string[];
  iso_3166_1: string;
  rating: string;
}

export interface ContentRatingsResponse {
  id?: number;
  results: ContentRating[];
}

// Episode groups
export interface EpisodeGroup {
  description: string;
  episode_count: number;
  group_count: number;
  id: string;
  name: string;
  network: Network | null;
  type: number;
}

export interface EpisodeGroupsResponse {
  id?: number;
  results: EpisodeGroup[];
}

// Alternative titles
export interface AlternativeTVTitle {
  iso_3166_1: string;
  title: string;
  type: string;
}

export interface AlternativeTVTitlesResponse {
  id?: number;
  results: AlternativeTVTitle[];
}

// Translations
export interface TVTranslationData {
  name: string;
  overview: string;
  homepage: string;
  tagline: string;
}

export interface TVTranslation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: TVTranslationData;
}

export interface TVTranslationsResponse {
  id?: number;
  translations: TVTranslation[];
}

// Detailed TV show with all append_to_response data
export interface DetailedTVShow extends TVShow {
  created_by: Creator[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string | null;
  last_episode_to_air: Episode | null;
  next_episode_to_air: Episode | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: TVStatus;
  tagline: string;
  type: string;
  
  // Appended responses
  videos?: VideosResponse;
  images?: ImagesResponse;
  credits?: Credits;
  recommendations?: PaginatedResponse<TVShow>;
  similar?: PaginatedResponse<TVShow>;
  reviews?: ReviewsResponse;
  external_ids?: ExternalIds;
  keywords?: KeywordsResponse;
  translations?: TVTranslationsResponse;
  alternative_titles?: AlternativeTVTitlesResponse;
  'watch/providers'?: WatchProvidersResponse;
  content_ratings?: ContentRatingsResponse;
  episode_groups?: EpisodeGroupsResponse;
  aggregate_credits?: Credits;
  screened_theatrically?: {
    id?: number;
    results: Array<{
      id: number;
      episode_number: number;
      season_number: number;
    }>;
  };
}

// TV show list response
export type TVShowListResponse = PaginatedResponse<TVShow>;
