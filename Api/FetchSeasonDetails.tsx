import axios from "axios";

const FetchSeasonDetails = async (id: string, seasonNumber: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/tv/${id}/season/${seasonNumber}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      },
    });

    console.log(response.data, "✅ Season Details (with Episodes)");
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("❌ Axios error:", error.response?.data || error.message);
    } else {
      console.error("❌ Unexpected error:", error);
    }
    throw error;
  }
};

export default FetchSeasonDetails;
