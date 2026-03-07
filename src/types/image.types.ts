/**
 * Image Types - Backdrops, posters, logos, profiles
 */

export interface TMDBImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface ImagesResponse {
  id?: number;
  backdrops: TMDBImage[];
  logos: TMDBImage[];
  posters: TMDBImage[];
  profiles?: TMDBImage[];
}
