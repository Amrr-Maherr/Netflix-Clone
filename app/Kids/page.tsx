"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import FetchFilteredMovies from "@/Api/FetchFilteredMoviesParams";
import fetchMovies from "@/Api/FetchPopularMovies";
import CardMovie from "../Components/CardMovie/CardMovie";
import PaginationButtons from "../Movies/components/PaginationButtons";
import HeroSection from "../Components/HeroSection/index";
import NetflixIntroLoader from "../Components/Loading/NetflixIntroLoader";
import type { Movie } from "@/Types";

export default function Page() {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<Movie[]>([]);

  const heroKidsMoviesQuery = useQuery({
    queryKey: ["hero-kids-movies"],
    queryFn: () => fetchMovies({}),
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["kids-movies", page],
    queryFn: () =>
      FetchFilteredMovies({
        page,
        with_genres: "10751", // Family genre for kids
        sort_by: "popularity.desc",
      }),
  });

  const LoadMore = () => setPage((prev) => prev + 1);
  const LoadLess = () => setPage((prev) => prev - 1);

  useEffect(() => {
    if (data?.movies) {
      setAllData((prev) =>
        page === 1 ? data.movies : [...prev, ...data.movies],
      );
    }
  }, [data, page]);

  // Animation effects removed

  const heroKidsMovies = heroKidsMoviesQuery.data
    ?.slice(0, 5)
    .map((movie: Movie) => ({
      ...movie,
      media_type: "movie" as const,
    }));

  return (
    <>
      {heroKidsMovies && <HeroSection movies={heroKidsMovies} />}
      <main className="min-h-screen bg-black text-white container">
        <section className="md:py-20 py-15">
          {isLoading && page === 1 ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <NetflixIntroLoader />
            </div>
          ) : allData.length === 0 && !isLoading ? (
            <h3 className="text-white text-center mt-10">
              No kids movies found.
            </h3>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {allData?.map((movie, index) => (
                <div key={`${movie.id}-${index}`}>
                  <CardMovie movie={movie} />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <p className="text-red-500 text-center text-lg">
              Failed to load kids movies.
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
  );
}
