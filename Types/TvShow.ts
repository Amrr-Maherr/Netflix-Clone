import type { TVShow } from "@/Types";

export type TvShowData = TVShow & {
    genres?: { id: number; name: string }[];
    number_of_episodes?: number;
    number_of_seasons?: number;
};