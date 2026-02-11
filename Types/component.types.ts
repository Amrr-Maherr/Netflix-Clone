/**
 * Component Props Types - Shared component prop interfaces
 */

import type { 
  CastMember, 
  CrewMember, 
  Creator, 
  Network, 
  Keyword, 
  ProductionCountry,
  ContentRating,
  Season,
  Episode,
  TMDBImage,
  Video,
  WatchProvider,
  ExternalIds,
  DetailedMovie,
  DetailedTVShow,
  DetailedPerson,
  Movie,
  TVShow,
  CombinedCastCredit,
  CombinedCrewCredit,
} from './index';

// Cast and Crew Section Props
export interface CastSectionProps {
  cast: CastMember[];
}

export interface CrewSectionProps {
  crew: CrewMember[];
}

export interface CastCardProps {
  actor: CastMember;
}

export interface CrewCardProps {
  crew: CrewMember;
}

// TV Show Specific Props
export interface CreatedBySectionProps {
  creators: Creator[];
}

export interface NetworksSectionProps {
  networks: Network[];
}

export interface KeywordsSectionProps {
  keywords: Keyword[];
}

export interface ProductionCountriesSectionProps {
  countries: ProductionCountry[];
}

export interface ContentRatingSectionProps {
  ratings: ContentRating[];
}

export interface SeasonsSectionProps {
  seasons: Season[];
  tvId: string;
}

export interface SeasonCardProps {
  season: Season;
  tvId: string;
}

export interface EpisodeDetailsSectionProps {
  episode: Episode;
}

export interface ShowMetadataSectionProps {
  tv: DetailedTVShow;
}

// Images Section Props
export interface ImagesSectionProps {
  backdrops: TMDBImage[];
  logos: TMDBImage[];
  posters: TMDBImage[];
  images: TMDBImage[];
}

// Videos Section Props
export interface VideosSectionProps {
  videos: Video[];
}

// Similar/Recommendations Props
export interface SimilarMoviesSectionProps {
  movies: Movie[];
  shows: TVShow[];
  title: string;
}

// Watch Providers Props
export interface ProvidersSectionProps {
  providers: Record<string, {
    link?: string;
    flatrate?: WatchProvider[];
    rent?: WatchProvider[];
    buy?: WatchProvider[];
  }>;
}

// Hero Section Props
export interface HeroSectionProps {
  movie?: DetailedMovie;
  tv?: DetailedTVShow;
  backdropUrl: string | null;
  posterUrl: string;
  trailer: Video | null;
}

// Person/Actor/Crew Details Props
export interface PersonHeroSectionProps {
  person: DetailedPerson;
}

export interface SocialLinksSectionProps {
  ids: ExternalIds;
}

export interface KnownForSectionProps {
  items: Array<Movie | TVShow>;
}

export interface MovieCreditsSectionProps {
  movies: Movie[];
}

export interface TvCreditsSectionProps {
  shows: TVShow[];
}

export interface CombinedCreditsSectionProps {
  credits: Array<CombinedCastCredit | CombinedCrewCredit>;
}

// Slider Props
export interface SliderProps {
  children: React.ReactNode;
  slidesPerView?: number;
  slidesPerViewMobile?: number;
  spaceBetween?: number;
  className?: string;
  swiperOptions?: unknown;
  modules?: unknown[];
  useFadeEffect?: boolean;
}
