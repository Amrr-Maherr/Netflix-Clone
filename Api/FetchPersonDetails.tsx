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

    const url = `https://api.themoviedb.org/3/person/${id}?append_to_response=${extraParams}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    });

    console.log(response.data, "Full Person Details");
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching person details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default FetchPersonDetails;
