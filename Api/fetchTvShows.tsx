import axios from "axios";

const fetchTvShows = async ({ url = "/tv/popular" }) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  });

  console.log(response.data.results, "response.data.results");
  return response.data.results;
};

export default fetchTvShows;
