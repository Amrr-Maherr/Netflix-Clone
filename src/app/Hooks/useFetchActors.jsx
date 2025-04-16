import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getPopularActors = async () => {
  const url = "https://api.themoviedb.org/3/person/popular";
  const apiKey = "406e98e0649d99e1b4a3224dd7d123b7";

  try {
    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data.results;
  } catch (error) {
    return error.response?.data?.status_message || error.message;
  }
};

export default function useFetchPopularActors() {
  return useQuery({
    queryKey: ["person", "popular"],
    queryFn: getPopularActors,
  });
}
