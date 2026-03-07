import axios from "axios";

const fetchMoviesAPI = async (url: string, lang = "en") => {
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

export const fetchAllMovies = async (lang = "en") => {
  const urls = [
    "/trending/movie/week",
    "/trending/movie/day",
    "/movie/popular",
    "/movie/top_rated",
    "/movie/upcoming",
    "/movie/now_playing",
  ];

  const promises = urls.map(url => fetchMoviesAPI(url, lang));
  const results = await Promise.all(promises);

  return {
    trendingMoviesWeek: results[0],
    trendingMoviesDay: results[1],
    popularMovies: results[2],
    topRatedMovies: results[3],
    upcomingMovies: results[4],
    nowPlayingMovies: results[5],
  };
};
