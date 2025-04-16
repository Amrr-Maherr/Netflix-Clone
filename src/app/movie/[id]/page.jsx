"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../../Components/Footer/page";
import Loader from "../../Components/Loader/Loader";
import MovieDetailsCard from "@/app/Components/MovieDetailsCard";

export default function Details() {
  const { id } = useParams();
  const apiKey = "406e98e0649d99e1b4a3224dd7d123b7";
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-24">
        Error: {error.message}
      </div>
    );
  }

  if (!data) {
    return <div className="text-center text-white py-24">No data found.</div>;
  }

  return (
    <>
      <div
        className="relative isolate px-6 py-24 sm:py-32 lg:px-8 text-white font-sans"
        style={{ letterSpacing: "0.02em" }}
      >
        <div
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <MovieDetailsCard data={data} />
      </div>
      <Footer />
    </>
  );
}
