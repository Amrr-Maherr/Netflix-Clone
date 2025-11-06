"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FetchFilteredMovies from "@/Api/FetchFilteredMoviesParams";
import CardMovie from "../Components/CardMovie/CardMovie";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaginationButtons from "./components/PaginationButtons";

export default function FilterMoviesPage() {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const [filters, setFilters] = useState({
    sort: "",
    genre: "",
    language: "",
    year: "",
    rating: "",
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["filtered-movies", page],
    queryFn: () =>
      FetchFilteredMovies({
        page,
        sort_by:
          filters.sort === "rating"
            ? "vote_average.desc"
            : filters.sort === "newest"
            ? "release_date.desc"
            : "popularity.desc",
        with_genres: filters.genre || undefined,
        with_original_language: filters.language || undefined,
        primary_release_year: filters.year ? Number(filters.year) : undefined,
        vote_average_gte: filters.rating ? Number(filters.rating) : undefined,
      }),
  });

  const handleApplyFilters = () => {
    refetch();
  };

  const ClearFilter = () => {
    setFilters({
      sort: "",
      genre: "",
      language: "",
      year: "",
      rating: "",
    });
    refetch();
  };

  const LoadMore = () => setPage((prev) => prev + 1);
  const LoadLess = () => setPage((prev) => prev - 1);

  useEffect(() => {
    if (data?.movies) {
      if (!filteredData) {
        setAllData((prev) => [...prev, ...data.movies]);
      } else {
        setAllData(data.movies);
      }
    }
  }, [data, filteredData]);

  return (
    <main className="min-h-screen bg-black text-white container">
      <section className="pt-24 pb-6">
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          {/* Title */}
          <h1 className="text-3xl font-bold tracking-wide flex items-center gap-2">
            <SlidersHorizontal size={24} className="text-red-600" />
            Explore Movies
          </h1>

          {/* Buttons container */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleApplyFilters}
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer px-5 py-2 rounded-md font-semibold transition"
            >
              {isLoading ? "Loading..." : "Apply Filters"}
            </Button>
            <Button
              onClick={ClearFilter}
              variant="outline"
              className="border border-red-600 cursor-pointer text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-md font-semibold transition"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4">
          {/* Sort */}
          <select
            value={filters.sort}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sort: e.target.value }))
            }
            className="bg-zinc-800 text-sm border border-zinc-700 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
          >
            <option value="">Sort: Popularity ↓</option>
            <option value="rating">Sort: Rating ↓</option>
            <option value="newest">Sort: Newest ↓</option>
          </select>

          {/* Genre */}
          <select
            value={filters.genre}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, genre: e.target.value }))
            }
            className="bg-zinc-800 text-sm border border-zinc-700 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
          >
            <option value="">All Genres</option>
            <option value="28">Action</option>
            <option value="35">Comedy</option>
            <option value="18">Drama</option>
            <option value="27">Horror</option>
            <option value="10749">Romance</option>
            <option value="878">Science Fiction</option>
          </select>

          {/* Language */}
          <select
            value={filters.language}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                language: e.target.value,
              }))
            }
            className="bg-zinc-800 text-sm border border-zinc-700 px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
          >
            <option value="">All Languages</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
          </select>

          {/* Year */}
          <input
            type="number"
            placeholder="Year"
            value={filters.year}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, year: e.target.value }))
            }
            className="bg-zinc-800 text-sm border border-zinc-700 px-3 py-2 rounded-md w-28 focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-500"
          />

          {/* Rating */}
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            placeholder="Min Rating"
            value={filters.rating}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, rating: e.target.value }))
            }
            className="bg-zinc-800 text-sm border border-zinc-700 px-3 py-2 rounded-md w-32 focus:outline-none focus:ring-1 focus:ring-red-600 placeholder-gray-500"
          />
        </div>
      </section>

      <section>
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
            gap-4
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
