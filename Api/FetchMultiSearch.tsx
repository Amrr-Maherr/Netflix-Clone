import axios from "axios";

const FetchMultiSearch = async ({ query = "" }) => {
  // if no search query stop the function
  if (!query) {
    return;
  }
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/multi`,
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

  return response.data.results;
};

export default FetchMultiSearch;
