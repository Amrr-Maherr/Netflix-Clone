/**
 * Watch Provider Types - Streaming platforms, rent, buy options
 */

export interface WatchProvider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}

export interface CountryWatchProviders {
  link: string;
  flatrate?: WatchProvider[];
  rent?: WatchProvider[];
  buy?: WatchProvider[];
  ads?: WatchProvider[];
}

export interface WatchProvidersResponse {
  id?: number;
  results: {
    [countryCode: string]: CountryWatchProviders;
  };
}
