import axios from "axios";
const fetchMovies = async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/movie/popular",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    }
  );
  return response.data.results;
};

export default fetchMovies;
