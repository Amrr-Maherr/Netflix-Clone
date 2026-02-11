import axios, { AxiosError } from "axios";
import type { FilteredTVShowsResponse, DiscoverTVParams } from "@/Types";

interface FetchFilteredTVParams extends Partial<DiscoverTVParams> {
  lang?: string;
  vote_average_gte?: number;
}

const FetchFilteredTV = async ({
  page = 1,
  with_genres,
  with_original_language,
  first_air_date_year,
  vote_average_gte,
  sort_by = "popularity.desc",
  lang = "en",
}: FetchFilteredTVParams): Promise<FilteredTVShowsResponse> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/tv`,
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
          first_air_date_year,
          "vote_average.gte": vote_average_gte,
        },
      }
    );

    return {
      shows: response.data.results,
      currentPage: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error fetching filtered TV shows:",
      axiosError.response?.data || axiosError.message
    );
    throw error;
  }
};

export default FetchFilteredTV;
