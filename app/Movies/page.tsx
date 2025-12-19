"use client";

import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import FetchFilteredMovies from "@/Api/FetchFilteredMoviesParams";
import fetchMovies from "@/Api/FetchPopularMovies";
import CardMovie from "../Components/CardMovie/CardMovie";
import PaginationButtons from "./components/PaginationButtons";
import MobileFilters from "./components/MobileFilters";
import Filters from "./components/Filters";
import HeroSection from "../Components/HeroSection/index";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  const cardsRef = useRef<HTMLDivElement[]>([]);

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

  const heroMovies = heroMoviesQuery.data?.slice(0, 5).map((movie: any) => ({
    ...movie,
    media_type: "movie" as const,
  }));

  return (
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
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-screen">
              <div className="w-10 h-10 border-4 border-red-800 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : !isLoading && allData.length === 0 ? (
            <h3 className="text-white text-center mt-10">
              No results found for your filter.
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
              Failed to load movies.
            </p>
          )}

          {!isLoading && allData.length > 0 && (
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
