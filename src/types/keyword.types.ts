/**
 * Keyword Types
 */

export interface Keyword {
  id: number;
  name: string;
}

export interface KeywordsResponse {
  id?: number;
  keywords?: Keyword[];
  results?: Keyword[];
}
