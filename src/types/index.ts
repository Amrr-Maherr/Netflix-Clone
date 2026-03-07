/**
 * Central barrel export for all types
 * Import from this file to access any type in the application
 */

// Base types
export type {
  TMDBImagePaths,
  BaseMedia,
  PaginatedResponse,
  DateRange,
  SpokenLanguage,
  ProductionCountry,
  MediaType,
  MovieStatus,
  TVStatus,
} from './base.types';

// Movie types
export type {
  Movie,
  DetailedMovie,
  MovieListResponse,
  BelongsToCollection,
  ReleaseDate,
  ReleaseDateResult,
  ReleaseDatesResponse,
  AlternativeTitle,
  AlternativeTitlesResponse,
  Translation,
  TranslationData,
  TranslationsResponse,
  AccountStates,
  ListItem,
  ListsResponse,
  Change,
  ChangesResponse,
} from './movie.types';

// TV types
export type {
  TVShow,
  DetailedTVShow,
  TVShowListResponse,
  Creator,
  Episode,
  Season,
  DetailedSeason,
  ContentRating,
  ContentRatingsResponse,
  EpisodeGroup,
  EpisodeGroupsResponse,
  AlternativeTVTitle,
  AlternativeTVTitlesResponse,
  TVTranslation,
  TVTranslationData,
  TVTranslationsResponse,
} from './tv.types';

// Person types
export type {
  Person,
  DetailedPerson,
  PersonListResponse,
  CombinedCastCredit,
  CombinedCrewCredit,
  CombinedCredits,
  MovieCastCredit,
  MovieCrewCredit,
  MovieCredits,
  TVCastCredit,
  TVCrewCredit,
  TVCredits,
  TaggedImage,
  TaggedImagesResponse,
  PersonTranslation,
  PersonTranslationData,
  PersonTranslationsResponse,
  PersonChange,
  PersonChangesResponse,
} from './person.types';

// Credits types
export type {
  CastMember,
  CrewMember,
  Credits,
} from './credits.types';

// Genre types
export type {
  Genre,
  GenreResponse,
} from './genre.types';

// Video types
export type {
  Video,
  VideosResponse,
  VideoType,
  VideoSite,
} from './video.types';

// Image types
export type {
  TMDBImage,
  ImagesResponse,
} from './image.types';

// Review types
export type {
  Review,
  ReviewAuthorDetails,
  ReviewsResponse,
} from './review.types';

// Keyword types
export type {
  Keyword,
  KeywordsResponse,
} from './keyword.types';

// Company types
export type {
  ProductionCompany,
} from './company.types';

// Network types
export type {
  Network,
} from './network.types';

// External IDs types
export type {
  ExternalIds,
} from './external-ids.types';

// Watch providers types
export type {
  WatchProvider,
  CountryWatchProviders,
  WatchProvidersResponse,
} from './watch-providers.types';

// Search types
export type {
  SearchResult,
  MultiSearchResponse,
} from './search.types';

export {
  isMovieResult,
  isTVResult,
  isPersonResult,
} from './search.types';

// API types
export type {
  LanguageCode,
  SortBy,
  DiscoverMovieParams,
  DiscoverTVParams,
  FilteredMoviesResponse,
  FilteredTVShowsResponse,
  AllMoviesResponse,
  AllTVShowsResponse,
  TMDBError,
  APIResponse,
} from './api.types';

// Auth types
export type {
  UserState,
  AppUser,
  LoginInputs,
  RegisterInputs,
  ForgotPasswordInputs,
  AuthResponse,
  AuthError,
} from './auth.types';

// Redux types
export type {
  MyListItem,
  MyListState,
  RootState,
  AddToListPayload,
  RemoveFromListPayload,
  SetUserPayload,
  MyListActionType,
  UserActionType,
} from './redux.types';

// React Query types
export type {
  MovieDetailsQueryOptions,
  TVDetailsQueryOptions,
  PersonDetailsQueryOptions,
  SeasonDetailsQueryOptions,
  AllMoviesQueryOptions,
  AllTVShowsQueryOptions,
  FilteredMoviesQueryOptions,
  MultiSearchQueryOptions,
  AddToListMutationOptions,
  RemoveFromListMutationOptions,
} from './react-query.types';

export { queryKeys } from './react-query.types';

// Component types
export type {
  CastSectionProps,
  CrewSectionProps,
  CastCardProps,
  CrewCardProps,
  CreatedBySectionProps,
  NetworksSectionProps,
  KeywordsSectionProps,
  ProductionCountriesSectionProps,
  ContentRatingSectionProps,
  SeasonsSectionProps,
  SeasonCardProps,
  EpisodeDetailsSectionProps,
  ShowMetadataSectionProps,
  ImagesSectionProps,
  VideosSectionProps,
  SimilarMoviesSectionProps,
  ProvidersSectionProps,
  HeroSectionProps,
  PersonHeroSectionProps,
  SocialLinksSectionProps,
  KnownForSectionProps,
  MovieCreditsSectionProps,
  TvCreditsSectionProps,
  CombinedCreditsSectionProps,
  SliderProps,
} from './component.types';
