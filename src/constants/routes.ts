/**
 * Application Routes
 */

export const ROUTES = {
  HOME: '/',
  MOVIES: '/movies',
  TV_SHOWS: '/tv',
  SEARCH: '/search',
  MY_LIST: '/watchlist',
  KIDS: '/kids',
  NEW_POPULAR: '/new-and-popular',
  ACCOUNT: '/account',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  OFFLINE: '/offline',
} as const;

export const MOVIE_ROUTES = {
  DETAILS: (id: number) => `/movies/${id}`,
} as const;

export const TV_ROUTES = {
  DETAILS: (id: number) => `/tv/${id}`,
  SEASON: (tvId: number, seasonNumber: number) =>
    `/tv/${tvId}/seasons/${seasonNumber}`,
} as const;

export const PERSON_ROUTES = {
  DETAILS: (id: number) => `/people/actor/${id}`,
} as const;
