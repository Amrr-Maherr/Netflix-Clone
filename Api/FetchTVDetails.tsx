import axios from "axios";

interface FetchTVDetailsParams {
  id: string;
}

const FetchTVDetails = async ({ id }: FetchTVDetailsParams) => {
  try {
    const extraParams = [
      "videos",
      "images",
      "credits",
      "recommendations",
      "similar",
      "reviews",
      "release_dates",
      "external_ids",
      "keywords",
      "translations",
      "alternative_titles",
      "watch/providers",
      "account_states",
      "lists",
      "changes",
    ].join(",");

    const url = `https://api.themoviedb.org/3/tv/${id}?append_to_response=${extraParams}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    });

    console.log(response.data, "Full TV Show Details");
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching TV show details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default FetchTVDetails;
