/**
 * React Query Types - Query keys and options
 */

import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import type { DetailedMovie } from './movie.types';
import type { DetailedTVShow } from './tv.types';
import type { DetailedPerson } from './person.types';
import type { DetailedSeason } from './tv.types';
import type { AllMoviesResponse, AllTVShowsResponse, FilteredMoviesResponse } from './api.types';
import type { SearchResult } from './search.types';

// Query keys
export const queryKeys = {
  movies: {
    all: ['movies'] as const,
    lists: () => [...queryKeys.movies.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.movies.lists(), { filters }] as const,
    details: () => [...queryKeys.movies.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.movies.details(), id] as const,
    filtered: (page: number) => [...queryKeys.movies.all, 'filtered', page] as const,
    hero: () => [...queryKeys.movies.all, 'hero'] as const,
  },
  tv: {
    all: ['tv'] as const,
    lists: () => [...queryKeys.tv.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.tv.lists(), { filters }] as const,
    details: () => [...queryKeys.tv.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.tv.details(), id] as const,
    season: (tvId: string, seasonNumber: number) => 
      [...queryKeys.tv.all, 'season', tvId, seasonNumber] as const,
  },
  person: {
    all: ['person'] as const,
    details: () => [...queryKeys.person.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.person.details(), id] as const,
  },
  search: {
    all: ['search'] as const,
    multi: (query: string) => [...queryKeys.search.all, 'multi', query] as const,
  },
} as const;

// Query options types
export type MovieDetailsQueryOptions = UseQueryOptions<DetailedMovie, Error>;
export type TVDetailsQueryOptions = UseQueryOptions<DetailedTVShow, Error>;
export type PersonDetailsQueryOptions = UseQueryOptions<DetailedPerson, Error>;
export type SeasonDetailsQueryOptions = UseQueryOptions<DetailedSeason, Error>;
export type AllMoviesQueryOptions = UseQueryOptions<AllMoviesResponse, Error>;
export type AllTVShowsQueryOptions = UseQueryOptions<AllTVShowsResponse, Error>;
export type FilteredMoviesQueryOptions = UseQueryOptions<FilteredMoviesResponse, Error>;
export type MultiSearchQueryOptions = UseQueryOptions<SearchResult[], Error>;

// Mutation options types
export type AddToListMutationOptions = UseMutationOptions<void, Error, { id: number }>;
export type RemoveFromListMutationOptions = UseMutationOptions<void, Error, { id: number }>;
