"use client";

import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import FetchFilteredMovies from "@/Api/FetchFilteredMoviesParams";
import fetchMovies from "@/Api/FetchPopularMovies";
import CardMovie from "../Components/CardMovie/CardMovie";
import PaginationButtons from "../Movies/components/PaginationButtons";
import HeroSection from "../Components/HeroSection/index";
import { MovieData } from "@/app/Types/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<MovieData[]>([]);

  const cardsRef = useRef<HTMLDivElement[]>([]);

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
        page === 1 ? data.movies : [...prev, ...data.movies]
      );
    }
  }, [data, page]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, [allData]);

  const heroKidsMovies = heroKidsMoviesQuery.data?.slice(0, 5).map((movie: any) => ({
    ...movie,
    media_type: "movie" as const,
  }));

  return (
    <>
      {heroKidsMovies && <HeroSection movies={heroKidsMovies} />}
      <main className="min-h-screen bg-black text-white container">
        <section className="md:py-20 py-15">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-screen">
              <div className="w-10 h-10 border-4 border-red-800 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : !isLoading && allData.length === 0 ? (
            <h3 className="text-white text-center mt-10">
              No kids movies found.
            </h3>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {allData?.map((movie, index) => (
                <div
                  key={`${movie.id}-${index}`}
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                >
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
    </>
  );
}
