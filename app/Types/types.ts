// Movie and TV Show Data Types

export type MovieData = {
    id: number;
    title?: string;
    poster_path?: string;
    vote_average?: number | null;
    popularity?: number | null;
    overview?: string;
    release_date?: string;
    backdrop_path?: string;
    original_language?: string;
    video?: string | null;
    original_title?: string;
    vote_count?: number | null;
    adult?: boolean | null;
    genres?: { id: number; name: string }[];
    runtime?: number;
};

export type TvShowData = {
    id: number | null;
    name?: string;
    original_name?: string;
    poster_path?: string;
    still_path?: string;
    vote_average?: number | null;
    vote_count?: number | null;
    popularity?: number | null;
    overview?: string;
    first_air_date?: string;
    original_language?: string;
    adult?: boolean | null;
    video?: boolean | null;
    backdrop_path?: string;
    genres?: { id: number; name: string }[];
    number_of_episodes?: number;
    number_of_seasons?: number;
};

export type DataTypes = MovieData | TvShowData;
