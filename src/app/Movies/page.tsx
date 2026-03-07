"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FetchFilteredMovies from "@/services/api/legacy/FetchFilteredMoviesParams";
import fetchMovies from "@/services/api/legacy/FetchPopularMovies";
import { Card } from "@/components/media/Card";
import PaginationButtons from "./components/PaginationButtons";
import MobileFilters from "./components/MobileFilters";
import Filters from "./components/Filters";
import HeroSection from "../Components/HeroSection/index";
import NetflixIntroLoader from "../Components/Loading/NetflixIntroLoader";
import type { Movie } from "@/types";

export default function Page() {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<Movie[]>([]);
  const [filteredData, setFilteredData] = useState<Movie[]>([]);

  const [filters, setFilters] = useState({
    sort: "",
    genre: "",
    language: "",
    year: "",
    rating: "",
  });

  const heroMoviesQuery = useQuery({
    queryKey: ["hero-movies"],
    queryFn: () => fetchMovies({}),
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
  }, [filters,refetch]);

  const heroMovies = heroMoviesQuery.data?.slice(0, 5).map((movie: Movie) => ({
    ...movie,
    media_type: "movie" as const,
  }));

  return (
    isLoading && page === 1 ? (
      <NetflixIntroLoader />
    ) : (
      <>
        {heroMovies && <HeroSection movies={heroMovies} />}
        <main className="min-h-screen bg-black text-white container">
          <section className="md:py-20 py-15">
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
            {allData.length === 0 && !isLoading ? (
              <h3 className="text-white text-center mt-10">
                No results found for your filter.
              </h3>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {allData?.map((movie, index) => (
                  <div key={`${movie.id}-${index}`}>
                    <Card
                      id={movie.id}
                      type="movie"
                      title={movie.title}
                      posterUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null}
                      releaseDate={movie.release_date}
                      rating={movie.vote_average || 0}
                      genres={(movie as any).genres?.map((g: any) => g.name) || []}
                      language={movie.original_language}
                      overview={movie.overview}
                    />
                  </div>
                ))}
              </div>
            )}

            {isError && (
              <p className="text-red-500 text-center text-lg">
                Failed to load movies.
              </p>
            )}

            {allData.length > 0 && (
              <PaginationButtons
                LoadMore={LoadMore}
                LoadLess={LoadLess}
                isLoading={isLoading}
                page={page}
              />
            )}
          </section>
        </main>
      </>
    )
  );
}
