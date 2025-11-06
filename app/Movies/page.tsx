"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FetchFilteredMovies from "@/Api/FetchFilteredMoviesParams";
import CardMovie from "../Components/CardMovie/CardMovie";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import PaginationButtons from "./components/PaginationButtons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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

  const handleApplyFilters = () => refetch();

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

  useEffect(() => {
    refetch();
  }, [filters]);
console.log(allData,"alldata");

  return (
    <main className="min-h-screen bg-black text-white container">
      <section className="pt-24 pb-6">
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold tracking-wide flex items-center gap-2">
            <SlidersHorizontal size={24} className="text-red-600" />
            Explore Movies
          </h1>

          <div className="flex items-center gap-3">
            <Button
              disabled={
                !filters.sort &&
                !filters.genre &&
                !filters.language &&
                !filters.year &&
                !filters.rating
              }
              onClick={ClearFilter}
              variant="outline"
              className="border border-red-600 cursor-pointer text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-md font-semibold transition"
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Sort */}
          <Select
            value={filters.sort}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, sort: value }))
            }
          >
            <SelectTrigger className="w-44 bg-zinc-800 border-zinc-700 text-sm">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent className="bg-black text-white border-0">
              <SelectItem value="all">Popularity ↓</SelectItem>
              <SelectItem value="rating">Rating ↓</SelectItem>
              <SelectItem value="newest">Newest ↓</SelectItem>
            </SelectContent>
          </Select>

          {/* Genre */}
          <Select
            value={filters.genre}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, genre: value }))
            }
          >
            <SelectTrigger className="w-44 bg-zinc-800 border-zinc-700 text-sm">
              <SelectValue placeholder="Choose Genre" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white border-0">
              <SelectItem value="all">All Genres</SelectItem>
              <SelectItem value="28">Action</SelectItem>
              <SelectItem value="35">Comedy</SelectItem>
              <SelectItem value="18">Drama</SelectItem>
              <SelectItem value="27">Horror</SelectItem>
              <SelectItem value="10749">Romance</SelectItem>
              <SelectItem value="878">Science Fiction</SelectItem>
            </SelectContent>
          </Select>

          {/* Language */}
          <Select
            value={filters.language}
            onValueChange={(value) =>
              setFilters((prev) => ({ ...prev, language: value }))
            }
          >
            <SelectTrigger className="w-44 bg-zinc-800 border-zinc-700 text-sm">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white border-0">
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
              <SelectItem value="ko">Korean</SelectItem>
            </SelectContent>
          </Select>

          {/* Year */}
          <Input
            type="number"
            placeholder="Enter Year"
            value={filters.year}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, year: e.target.value }))
            }
            className="bg-zinc-800 border-zinc-700 text-sm w-28 placeholder-gray-500"
          />

          {/* Rating */}
          <Input
            type="number"
            step="0.1"
            min="0"
            max="10"
            placeholder="Min Rating (0–10)"
            value={filters.rating}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, rating: e.target.value }))
            }
            className="bg-zinc-800 border-zinc-700 text-sm w-36 placeholder-gray-500"
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
        {allData.length === 0 ? (
          <h3 className="text-white text-center mt-10">
            No results found for your filter.
          </h3>
        ) : (
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
        )}

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
