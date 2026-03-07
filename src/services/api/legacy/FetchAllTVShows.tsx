import axios from "axios";

const fetchTVShowsAPI = async (url: string, lang = "en") => {
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

export const fetchAllTVShows = async (lang = "en") => {
  const urls = [
    "/trending/tv/week",
    "/trending/tv/day",
    "/tv/popular",
    "/tv/top_rated",
    "/tv/airing_today",
    "/tv/on_the_air",
  ];

  const promises = urls.map(url => fetchTVShowsAPI(url, lang));
  const results = await Promise.all(promises);

  return {
    trendingTVWeek: results[0],
    trendingTVDay: results[1],
    popularTV: results[2],
    topRatedTV: results[3],
    airingTodayTV: results[4],
    onTheAirTV: results[5],
  };
};
