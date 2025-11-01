"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "../app/Components/HeroSection";
import Section from "../app/Components/Section";
import fetchMovies from "@/Api/FetchPopularMovies";
import fetchTvShows from "@/Api/fetchTvShows";
import CardSkeletonList from "./Components/Loading/CardSkeletonList";
import ErrorMessage from "./Components/ErrorHandel/ErrorMessage";

export default function Home() {
  const [AllData, setAllData] = useState<any[]>([]);
  const {
    data: trendingMovies,
    isLoading: trendingMoviesLoading,
    isError: trendingMoviesError,
  } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: () => fetchMovies({ url: "/trending/movie/week" }),
  });

  const {
    data: topRatedMovies,
    isLoading: topRatedMoviesLoading,
    isError: topRatedMoviesError,
  } = useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: () => fetchMovies({ url: "/movie/top_rated" }),
  });

  const {
    data: popularMovies,
    isLoading: popularMoviesLoading,
    isError: popularMoviesError,
  } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: () => fetchMovies({ url: "/movie/popular" }),
  });

  const {
    data: trendingTV,
    isLoading: trendingTVLoading,
    isError: trendingTVError,
  } = useQuery({
    queryKey: ["trending-tv"],
    queryFn: () => fetchTvShows({ url: "/trending/tv/week" }),
  });

  const {
    data: popularTV,
    isLoading: popularTVLoading,
    isError: popularTVError,
  } = useQuery({
    queryKey: ["popular-tv"],
    queryFn: () => fetchTvShows({ url: "/tv/popular" }),
  });
useEffect(() => {
  if (
    !trendingMoviesLoading &&
    !topRatedMoviesLoading &&
    !popularMoviesLoading
  ) {
    setAllData([
      ...(trendingMovies || []),
      ...(topRatedMovies || []),
      ...(popularMovies || []),
      ...(popularTV || []),
      ...(trendingTV || []),
    ]);
  }
}, [
  trendingMovies,
  topRatedMovies,
  popularMovies,
  trendingMoviesLoading,
  topRatedMoviesLoading,
  popularMoviesLoading,
]);
  // ===== Loading & Error =====
  if (
    trendingMoviesLoading ||
    topRatedMoviesLoading ||
    popularMoviesLoading ||
    trendingTVLoading ||
    popularTVLoading
  )
    return (
      <CardSkeletonList
        isLoading={
          trendingMoviesLoading ||
          topRatedMoviesLoading ||
          popularMoviesLoading ||
          trendingTVLoading ||
          popularTVLoading
        }
      />
    );

  if (
    trendingMoviesError ||
    topRatedMoviesError ||
    popularMoviesError ||
    trendingTVError ||
    popularTVError
  )
    return <ErrorMessage/>;
  return (
    <>
      <HeroSection movies={AllData || []} />

      <Section
        Data={trendingMovies || []}
        title="Trending Movies"
        isMovie={true}
      />
      <Section
        Data={topRatedMovies || []}
        title="Top Rated Movies"
        isMovie={true}
      />
      <Section
        Data={popularMovies || []}
        title="Popular Movies"
        isMovie={true}
      />

      <Section
        Data={trendingTV || []}
        title="Trending TV Shows"
        isMovie={false}
      />
      <Section Data={popularTV || []} title="Popular TV Shows" isMovie={false} />
    </>
  );
}
