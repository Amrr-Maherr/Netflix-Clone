/**
 * Search Types - Multi-search and discriminated unions
 */

import type { Movie } from './movie.types';
import type { TVShow } from './tv.types';
import type { Person } from './person.types';
import type { PaginatedResponse } from './base.types';

// Discriminated union for multi-search results
export type SearchResult = 
  | (Movie & { media_type: 'movie' })
  | (TVShow & { media_type: 'tv' })
  | (Person & { media_type: 'person' });

// Multi-search response
export type MultiSearchResponse = PaginatedResponse<SearchResult>;

// Type guards for search results
export function isMovieResult(result: SearchResult): result is Movie & { media_type: 'movie' } {
  return result.media_type === 'movie';
}

export function isTVResult(result: SearchResult): result is TVShow & { media_type: 'tv' } {
  return result.media_type === 'tv';
}

export function isPersonResult(result: SearchResult): result is Person & { media_type: 'person' } {
  return result.media_type === 'person';
}
