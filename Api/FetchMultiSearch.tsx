import axios from "axios";

const FetchMultiSearch = async ({ query = "" }) => {
  // if no search query stop the function
  if (!query) {
    return;
  }
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/multi`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
      params: {
        query: query,
        language: "en-US",
      },
    }
  );

  console.log(response, "results");
  return response.data.results;
};

export default FetchMultiSearch;
