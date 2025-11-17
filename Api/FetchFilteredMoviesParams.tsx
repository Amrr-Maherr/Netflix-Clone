import axios from "axios";

interface FetchFilteredMoviesParams {
  page?: number;
  with_genres?: string;
  with_original_language?: string;
  primary_release_year?: number;
  vote_average_gte?: number;
  sort_by?: string;
  lang?:string
}

const FetchFilteredMovies = async ({
  page = 1,
  with_genres,
  with_original_language,
  primary_release_year,
  vote_average_gte,
  sort_by = "popularity.desc",
  lang = "en",
}: FetchFilteredMoviesParams) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
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
  } catch (error: any) {
    console.error(
      "Error fetching filtered movies:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default FetchFilteredMovies;
