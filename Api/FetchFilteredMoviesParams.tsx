import axios, { AxiosError } from "axios";
import type { FilteredMoviesResponse, DiscoverMovieParams } from "@/Types";

interface FetchFilteredMoviesParams extends Partial<DiscoverMovieParams> {
  lang?: string;
  vote_average_gte?: number;
}

const FetchFilteredMovies = async ({
  page = 1,
  with_genres,
  with_original_language,
  primary_release_year,
  vote_average_gte,
  sort_by = "popularity.desc",
  lang = "en",
}: FetchFilteredMoviesParams): Promise<FilteredMoviesResponse> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/movie`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        },
        params: {
          language: lang,
          page,
          sort_by,
          include_adult: false,
          with_genres,
          with_original_language,
          primary_release_year,
          "vote_average.gte": vote_average_gte,
        },
      }
    );

    return {
      movies: response.data.results,
      currentPage: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error fetching filtered movies:",
      axiosError.response?.data || axiosError.message
    );
    throw error;
  }
};

export default FetchFilteredMovies;
