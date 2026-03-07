import axios from "axios";

interface FetchPersonDetailsParams {
  id: string;
}

const FetchPersonDetails = async ({ id }: FetchPersonDetailsParams) => {
  try {
    const extraParams = [
      "combined_credits",
      "external_ids",
      "images",
      "tagged_images",
      "translations",
      "movie_credits",
      "tv_credits",
      "changes",
      "latest",
    ].join(",");

    const url = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/person/${id}?append_to_response=${extraParams}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching person details:",
        error.response?.data || error.message
      );
    } else {
      console.error("Error fetching person details:", error);
    }
    throw error;
  }
};

export default FetchPersonDetails;
