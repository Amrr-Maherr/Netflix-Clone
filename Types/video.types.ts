/**
 * Video Types - YouTube trailers, teasers, clips, etc.
 */

export type VideoType = 
  | 'Trailer' 
  | 'Teaser' 
  | 'Clip' 
  | 'Featurette' 
  | 'Behind the Scenes' 
  | 'Bloopers'
  | 'Opening Credits';

export type VideoSite = 'YouTube' | 'Vimeo';

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: VideoSite;
  size: number;
  type: VideoType;
  official: boolean;
  published_at: string;
}

export interface VideosResponse {
  id?: number;
  results: Video[];
}
