"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import FetchProductDetails from "@/Api/FetchProductDetails";
import React from "react";

export default function Page() {
  const { id } = useParams();

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => FetchProductDetails({ id: id as string }),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Loading movie details...
      </div>
    );

  if (isError || !movie)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        ❌ Error loading movie data
      </div>
    );

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="min-h-screen bg-black text-white">
      {backdropUrl && (
        <div
          className="relative w-full h-[80vh] bg-cover bg-center opacity-70"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      )}
    </div>
  );
}
