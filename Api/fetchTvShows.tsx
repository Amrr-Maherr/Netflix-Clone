import axios from "axios";

const fetchTvShows = async ({ url = "/tv/popular" }) => {
  const response = await axios.get(`https://api.themoviedb.org/3${url}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  });

  console.log(response.data.results, "response.data.results");
  return response.data.results;
};

export default fetchTvShows;
