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

    const url = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/tv/${id}?append_to_response=${extraParams}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching TV show details:",
        error.response?.data || error.message
      );
    } else {
      console.error("Error fetching TV show details:", error);
    }
    throw error;
  }
};

export default FetchTVDetails;
