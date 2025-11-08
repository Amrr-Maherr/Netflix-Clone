"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CardMovie from "../Components/CardMovie/CardMovie";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import PaginationButtons from "../Movies/components/PaginationButtons";
import FetchFilteredTV from "@/Api/FetchFilteredTVParams";
import ErrorMessage from "../Components/ErrorHandel/ErrorMessage";

export default function page() {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<any[]>([]);

  const [filters, setFilters] = useState({
    sort: "",
    genre: "",
    language: "",
    year: "",
    rating: "",
  });

  const { data, isLoading, isError, refetch} = useQuery({
    queryKey: ["filtered-series", page],
    queryFn: () =>
      FetchFilteredTV({
        page,
        sort_by:
          filters.sort === "rating"
            ? "vote_average.desc"
            : filters.sort === "newest"
            ? "first_air_date.desc"
            : "popularity.desc",
        with_genres: filters.genre || undefined,
        with_original_language: filters.language || undefined,
        first_air_date_year: filters.year ? Number(filters.year) : undefined,
        vote_average_gte: filters.rating ? Number(filters.rating) : undefined,
      }),
  });

  const handleApplyFilters = () => refetch();

  const clearFilter = () => {
    setFilters({
      sort: "",
      genre: "",
      language: "",
      year: "",
      rating: "",
    });
    refetch();
  };

  const loadMore = () => setPage((prev) => prev + 1);
  const loadLess = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    if (data?.shows) {
      setAllData(data.shows);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [filters]);
    
    if (isError) {
        return <ErrorMessage onRetry={refetch} />;
}
  return (
    <main className="min-h-screen bg-black text-white container">
      <section className="py-20">
        {/* Filters */}
        <div className="flex items-center justify-center flex-wrap gap-4">
          <Button
            disabled={
              !filters.sort &&
              !filters.genre &&
              !filters.language &&
              !filters.year &&
              !filters.rating
            }
            onClick={clearFilter}
            variant="outline"
            className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-md font-semibold transition"
          >
            Clear
          </Button>

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
              <SelectItem value="10759">Action & Adventure</SelectItem>
              <SelectItem value="35">Comedy</SelectItem>
              <SelectItem value="18">Drama</SelectItem>
              <SelectItem value="9648">Mystery</SelectItem>
              <SelectItem value="10765">Sci-Fi & Fantasy</SelectItem>
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
          <p className="text-gray-400 text-center text-lg">Loading series...</p>
        )}
        {isError && (
          <p className="text-red-500 text-center text-lg">
            Failed to load series.
          </p>
        )}
        {!isLoading && allData.length === 0 ? (
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
            {allData?.map((show, index) => (
              <CardMovie movie={show} key={`${show.id}-${index}`} />
            ))}
          </div>
        )}
        <PaginationButtons
          LoadMore={loadMore}
          LoadLess={loadLess}
          isLoading={isLoading}
          page={page}
        />
      </section>
    </main>
  );
}
