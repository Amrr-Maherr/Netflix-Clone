import axios from "axios";
const fetchMovies = async ({ url = "/movie/popular", lang = "en" }) => {
  const response = await axios.get(`https://api.themoviedb.org/3${url}`, {
    params: {
      language: lang,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  });
  console.log(response.data.results, "response.data.results");

  return response.data.results;
};

export default fetchMovies;
