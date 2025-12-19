"use client";

import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import CardTvShow from "../Components/CardTvShow/CardTvShow";
import FetchFilteredTV from "@/Api/FetchFilteredTVParams";
import fetchTvShows from "@/Api/fetchTvShows";
import ErrorMessage from "../Components/ErrorHandel/ErrorMessage";
import Filters from "../Movies/components/Filters";
import MobileFilters from "../Movies/components/MobileFilters";
import PaginationButtons from "../Movies/components/PaginationButtons";
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

  const heroTvShowsQuery = useQuery({
    queryKey: ["hero-tvshows"],
    queryFn: () => fetchTvShows({}),
  });

  const { data, isLoading, isError, refetch } = useQuery({
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

  const clearFilter = () => {
    setFilters({ sort: "", genre: "", language: "", year: "", rating: "" });
    refetch();
  };

  const loadMore = () => setPage((prev) => prev + 1);
  const loadLess = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    if (data?.shows) {
      if (!filteredData) {
        setAllData((prev) => [...prev, ...data.shows]);
      } else {
        setAllData(data.shows);
      }
    }
  }, [data, filteredData]);

  useEffect(() => {
    refetch();
  }, [filters]);

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

  const heroShows = heroTvShowsQuery.data?.slice(0, 5).map((show: any) => ({
    ...show,
    media_type: "tv" as const,
  }));

  return (
    isLoading ? (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="w-10 h-10 border-4 border-red-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : (
      <>
        {heroShows && <HeroSection movies={heroShows} />}
        <main className="min-h-screen bg-black text-white container">
          <section className="md:py-20 py-15">
            <Filters
              ClearFilter={clearFilter}
              setFilters={setFilters}
              filters={filters}
            />
            <MobileFilters
              ClearFilter={clearFilter}
              setFilters={setFilters}
              filters={filters}
            />
          </section>

          <section>
            {allData.length === 0 ? (
              <h3 className="text-white text-center mt-10">
                No results found for your filter.
              </h3>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {allData?.map((show, index) => (
                  <div
                    key={`${show.id}-${index}`}
                    ref={(el) => {
                      if (el) cardsRef.current[index] = el;
                    }}
                  >
                    <CardTvShow TvShow={show} />
                  </div>
                ))}
              </div>
            )}

            {isError && (
              <p className="text-red-500 text-center text-lg">
                Failed to load TV shows.
              </p>
            )}

            {allData.length > 0 && (
              <PaginationButtons
                LoadMore={loadMore}
                LoadLess={loadLess}
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
