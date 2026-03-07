import type { Movie } from "@/Types";

export type MovieData = Movie & {
    genres?: { id: number; name: string }[];
    runtime?: number;
};