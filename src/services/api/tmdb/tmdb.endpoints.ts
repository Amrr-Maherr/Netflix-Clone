/**
 * TMDB API Endpoints
 * Centralized endpoint definitions
 */

export const TMDB_ENDPOINTS = {
  // Movie endpoints
  MOVIES: {
    TRENDING_WEEK: '/trending/movie/week',
    TRENDING_DAY: '/trending/movie/day',
    POPULAR: '/movie/popular',
    TOP_RATED: '/movie/top_rated',
    UPCOMING: '/movie/upcoming',
    NOW_PLAYING: '/movie/now_playing',
    DETAILS: (id: number) => `/movie/${id}`,
    VIDEOS: (id: number) => `/movie/${id}/videos`,
    CREDITS: (id: number) => `/movie/${id}/credits`,
    KEYWORDS: (id: number) => `/movie/${id}/keywords`,
    SIMILAR: (id: number) => `/movie/${id}/similar`,
    RECOMMENDATIONS: (id: number) => `/movie/${id}/recommendations`,
    REVIEWS: (id: number) => `/movie/${id}/reviews`,
    IMAGES: (id: number) => `/movie/${id}/images`,
    EXTERNAL_IDS: (id: number) => `/movie/${id}/external_ids`,
    RELEASE_DATES: (id: number) => `/movie/${id}/release_dates`,
    TRANSLATIONS: (id: number) => `/movie/${id}/translations`,
    WATCH_PROVIDERS: (id: number) => `/movie/${id}/watch/providers`,
  },

  // TV Show endpoints
  TV: {
    TRENDING_WEEK: '/trending/tv/week',
    TRENDING_DAY: '/trending/tv/day',
    POPULAR: '/tv/popular',
    TOP_RATED: '/tv/top_rated',
    AIRING_TODAY: '/tv/airing_today',
    ON_THE_AIR: '/tv/on_the_air',
    DETAILS: (id: number) => `/tv/${id}`,
    VIDEOS: (id: number) => `/tv/${id}/videos`,
    CREDITS: (id: number) => `/tv/${id}/credits`,
    KEYWORDS: (id: number) => `/tv/${id}/keywords`,
    SIMILAR: (id: number) => `/tv/${id}/similar`,
    RECOMMENDATIONS: (id: number) => `/tv/${id}/recommendations`,
    REVIEWS: (id: number) => `/tv/${id}/reviews`,
    IMAGES: (id: number) => `/tv/${id}/images`,
    EXTERNAL_IDS: (id: number) => `/tv/${id}/external_ids`,
    WATCH_PROVIDERS: (id: number) => `/tv/${id}/watch/providers`,
    CONTENT_RATINGS: (id: number) => `/tv/${id}/content_ratings`,
    SEASON: (tvId: number, seasonNumber: number) => `/tv/${tvId}/season/${seasonNumber}`,
    EPISODE: (tvId: number, seasonNumber: number, episodeNumber: number) =>
      `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`,
  },

  // Person endpoints
  PERSON: {
    DETAILS: (id: number) => `/person/${id}`,
    IMAGES: (id: number) => `/person/${id}/images`,
    TAGGED_IMAGES: (id: number) => `/person/${id}/tagged_images`,
    TV_CREDITS: (id: number) => `/person/${id}/tv_credits`,
    MOVIE_CREDITS: (id: number) => `/person/${id}/movie_credits`,
    COMBINED_CREDITS: (id: number) => `/person/${id}/combined_credits`,
    EXTERNAL_IDS: (id: number) => `/person/${id}/external_ids`,
    TRANSLATIONS: (id: number) => `/person/${id}/translations`,
    LATEST: '/person/latest',
    POPULAR: '/person/popular',
  },

  // Search endpoints
  SEARCH: {
    MULTI: '/search/multi',
    MOVIE: '/search/movie',
    TV: '/search/tv',
    PERSON: '/search/person',
    KEYWORD: '/search/keyword',
    COLLECTION: '/search/collection',
  },

  // Discover endpoints
  DISCOVER: {
    MOVIE: '/discover/movie',
    TV: '/discover/tv',
  },

  // Genre endpoints
  GENRE: {
    MOVIE_LIST: '/genre/movie/list',
    TV_LIST: '/genre/tv/list',
  },

  // Configuration
  CONFIGURATION: '/configuration',
  CERTIFICATION: {
    MOVIE_LIST: '/certification/movie/list',
    TV_LIST: '/certification/tv/list',
  },

  // Collections
  COLLECTION: {
    DETAILS: (id: number) => `/collection/${id}`,
    IMAGES: (id: number) => `/collection/${id}/images`,
    TRANSLATIONS: (id: number) => `/collection/${id}/translations`,
  },

  // Companies
  COMPANY: {
    DETAILS: (id: number) => `/company/${id}`,
    ALTERNATIVE_NAMES: (id: number) => `/company/${id}/alternative_names`,
    IMAGES: (id: number) => `/company/${id}/images`,
    MOVIES: (id: number) => `/company/${id}/movies`,
  },

  // Networks
  NETWORK: {
    DETAILS: (id: number) => `/network/${id}`,
    ALTERNATIVE_NAMES: (id: number) => `/network/${id}/alternative_names`,
    IMAGES: (id: number) => `/network/${id}/images`,
  },

  // Watch Providers
  PROVIDERS: {
    AVAILABLE_REGIONS: '/watch/providers/available_regions',
    MOVIE: '/watch/providers/movie',
    TV: '/watch/providers/tv',
  },

  // Authentication
  AUTH: {
    REQUEST_TOKEN: '/authentication/token/new',
    SESSION: '/authentication/session/new',
    GUEST_SESSION: '/authentication/guest_session/new',
  },
} as const;

// Image base URL
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Image sizes
export const TMDB_IMAGE_SIZES = {
  BACKDROP: {
    ORIGINAL: 'original',
    W300: 'w300',
    W780: 'w780',
    W1280: 'w1280',
  },
  POSTER: {
    ORIGINAL: 'original',
    W92: 'w92',
    W154: 'w154',
    W185: 'w185',
    W342: 'w342',
    W500: 'w500',
    W780: 'w780',
  },
  PROFILE: {
    ORIGINAL: 'original',
    W45: 'w45',
    W185: 'w185',
    H632: 'h632',
  },
  LOGO: {
    ORIGINAL: 'original',
    W45: 'w45',
    W92: 'w92',
    W154: 'w154',
    W185: 'w185',
    W300: 'w300',
    W500: 'w500',
  },
  STILL: {
    ORIGINAL: 'original',
    W92: 'w92',
    W185: 'w185',
    W300: 'w300',
  },
} as const;

// Helper function to build image URL
export const getTmdbImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};
