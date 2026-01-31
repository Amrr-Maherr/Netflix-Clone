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