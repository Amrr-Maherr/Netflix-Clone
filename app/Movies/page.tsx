"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FetchFilteredMovies from "@/Api/FetchFilteredMoviesParams";
import CardMovie from "../Components/CardMovie/CardMovie";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaginationButtons from "./components/PaginationButtons";

export default function FilterMoviesPage() {
    const [page,setPage] = useState(1)
    const [allData, setAllData] = useState<any[]>([]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["filtered-movies",page],
    queryFn: () => FetchFilteredMovies({ page: page }),
  });
    const LoadMore = () => {
        setPage((prev) => prev + 1)
        console.log(page);
    }
    const LoadLess = () => {
        setPage((prev) => prev - 1)
        console.log(page);
    }
    useEffect(() => {
      if (data?.movies) {
        setAllData((prev) => [...prev, ...data.movies]);
      }
    }, [data]);
    useEffect(() => {
      console.log(allData, "AllData");
    }, [allData]);
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-8 pt-24 pb-6 bg-gradient-to-b from-zinc-900 to-black">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-wide flex items-center gap-2">
            <SlidersHorizontal size={24} className="text-red-600" />
            Explore Movies
          </h1>
          <button className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md font-semibold transition">
            Apply Filters
          </button>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4">
          {/* Sort */}
          <select className="bg-zinc-800 text-sm border border-zinc-700 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600">
            <option>Sort: Popularity ↓</option>
            <option>Sort: Rating ↓</option>
            <option>Sort: Newest ↓</option>
          </select>

          {/* Genre */}
          <select className="bg-zinc-800 text-sm border border-zinc-700 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600">
            <option>All Genres</option>
            <option>Action</option>
            <option>Comedy</option>
            <option>Drama</option>
            <option>Horror</option>
            <option>Romance</option>
            <option>Science Fiction</option>
          </select>

          {/* Language */}
          <select className="bg-zinc-800 text-sm border border-zinc-700 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600">
            <option>All Languages</option>
            <option>English</option>
            <option>French</option>
            <option>Spanish</option>
            <option>Japanese</option>
            <option>Korean</option>
          </select>

          {/* Year */}
          <input
            type="number"
            placeholder="Year"
            className="bg-zinc-800 text-sm border border-zinc-700 px-3 py-2 rounded-md w-28 focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-500"
          />

          {/* Rating */}
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            placeholder="Min Rating"
            className="bg-zinc-800 text-sm border border-zinc-700 px-3 py-2 rounded-md w-32 focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-500"
          />
        </div>
      </section>
      <section className="px-8 py-8">
        <h2 className="text-2xl font-semibold mb-5">Top Picks For You</h2>

        {isLoading && (
          <p className="text-gray-400 text-center text-lg">Loading movies...</p>
        )}
        {isError && (
          <p className="text-red-500 text-center text-lg">
            Failed to load movies.
          </p>
        )}

        {/* Netflix-style Grid */}
        <div
          className="
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            lg:grid-cols-5 
            xl:grid-cols-6 
            gap-3
          "
        >
          {allData?.map((movie, index) => (
            <CardMovie movie={movie} key={`${movie.id}-${index}`} />
          ))}
        </div>
        <PaginationButtons
          LoadMore={LoadMore}
          LoadLess={LoadLess}
          isLoading={isLoading}
          page={page}
        />
      </section>
    </main>
  );
}
