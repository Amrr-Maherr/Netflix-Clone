import axios from "axios";
const fetchMovies = async ({ url = "/movie/popular", lang = "en" }) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_TMDB_BASE_URL}${url}`, {
    params: {
      language: lang,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
  });

  return response.data.results;
};

export default fetchMovies;
