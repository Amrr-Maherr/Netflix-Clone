"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FetchFilteredMovies from "@/Api/FetchFilteredMoviesParams";
import CardMovie from "../Components/CardMovie/CardMovie";
import PaginationButtons from "./components/PaginationButtons";
import MobileFilters from "./components/MobileFilters";
import Filters from "./components/Filters";

export default function Page() {
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
  return (
    <main className="min-h-screen bg-black text-white container">
      <section className="md:py-20 py-15">
        {/* Filters */}
        <Filters
          ClearFilter={ClearFilter}
          setFilters={setFilters}
          filters={filters}
        />
        <MobileFilters
          ClearFilter={ClearFilter}
          setFilters={setFilters}
          filters={filters}
        />
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
            {allData?.map((movie, index) => (
              <CardMovie movie={movie} key={`${movie.id}-${index}`} />
            ))}
          </div>
        )}
        {!isLoading && (
          <PaginationButtons
            LoadMore={LoadMore}
            LoadLess={LoadLess}
            isLoading={isLoading}
            page={page}
          />
        )}
      </section>
    </main>
  );
}
