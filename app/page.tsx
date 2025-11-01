"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "../app/Components/HeroSection";
import Section from "../app/Components/Section";
import fetchMovies from "@/Api/FetchPopularMovies";

export default function Home() {
  const {
    data: popularData,
    isLoading: popularLoading,
    isError: popularError,
  } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: () => fetchMovies({ url: "/movie/popular" }),
  });

  const {
    data: topRatedData,
    isLoading: topRatedLoading,
    isError: topRatedError,
  } = useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: () => fetchMovies({ url: "/movie/top_rated" }),
  });

  const {
    data: upcomingData,
    isLoading: upcomingLoading,
    isError: upcomingError,
  } = useQuery({
    queryKey: ["upcoming-movies"],
    queryFn: () => fetchMovies({ url: "/movie/upcoming" }),
  });

  const {
    data: nowPlayingData,
    isLoading: nowPlayingLoading,
    isError: nowPlayingError,
  } = useQuery({
    queryKey: ["now-playing-movies"],
    queryFn: () => fetchMovies({ url: "/movie/now_playing" }),
  });

  const {
    data: trendingData,
    isLoading: trendingLoading,
    isError: trendingError,
  } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: () => fetchMovies({ url: "/trending/movie/week" }),
  });

  if (
    popularLoading ||
    topRatedLoading ||
    upcomingLoading ||
    nowPlayingLoading ||
    trendingLoading
  )
    return <p>Loading...</p>;

  if (
    popularError ||
    topRatedError ||
    upcomingError ||
    nowPlayingError ||
    trendingError
  )
    return <p>Something went wrong 😢</p>;

  return (
    <>
      <HeroSection />
      <Section Data={trendingData || []} title="Trending Movies" />
      <Section Data={topRatedData || []} title="Top Rated Movies" />
      <Section Data={popularData || []} title="Popular Movies" />
      <Section Data={upcomingData || []} title="Upcoming Movies" />
      <Section Data={nowPlayingData || []} title="Now Playing Movies" />
    </>
  );
}
