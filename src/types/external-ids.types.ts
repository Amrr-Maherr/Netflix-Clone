/**
 * External IDs Types - Social media and external database IDs
 */

export interface ExternalIds {
  id?: number;
  imdb_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
  tiktok_id?: string | null;
  youtube_id?: string | null;
  wikidata_id: string | null;
  freebase_mid: string | null;
  freebase_id: string | null;
  tvdb_id?: number | null;
  tvrage_id?: number | null;
}
