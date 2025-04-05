import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getPopularMovies = async () => {
  const url = process.env.NEXT_PUBLIC_POPULAR_MOVIES_URL;
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  try {
    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data.results;
  } catch (error) {
      return error.response?.data?.status_message || error.message
  }
};

export default function useFetchPopularMovies() {
  const queryResult = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: getPopularMovies,
  });

  return queryResult;
}
