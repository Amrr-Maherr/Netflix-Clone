import axios from "axios";

const FetchSeasonDetails = async (id: string, seasonNumber: number) => {
  try {
    const url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    });

    console.log(response.data, "Season Details (with Episodes)");
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching season details:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default FetchSeasonDetails;