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

  // ======== Movies Queries ========
  const trendingMoviesWeekQuery = useQuery({
    queryKey: ["trending-movies-week"],
    queryFn: () => fetchMovies({ url: "/trending/movie/week" }),
  });

  const trendingMoviesDayQuery = useQuery({
    queryKey: ["trending-movies-day"],
    queryFn: () => fetchMovies({ url: "/trending/movie/day" }),
  });

  const popularMoviesQuery = useQuery({
    queryKey: ["popular-movies"],
    queryFn: () => fetchMovies({ url: "/movie/popular" }),
  });

  const topRatedMoviesQuery = useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: () => fetchMovies({ url: "/movie/top_rated" }),
  });

  const upcomingMoviesQuery = useQuery({
    queryKey: ["upcoming-movies"],
    queryFn: () => fetchMovies({ url: "/movie/upcoming" }),
  });

  const nowPlayingMoviesQuery = useQuery({
    queryKey: ["now-playing-movies"],
    queryFn: () => fetchMovies({ url: "/movie/now_playing" }),
  });

  // ======== TV Shows Queries ========
  const trendingTVWeekQuery = useQuery({
    queryKey: ["trending-tv-week"],
    queryFn: () => fetchTvShows({ url: "/trending/tv/week" }),
  });

  const trendingTVDayQuery = useQuery({
    queryKey: ["trending-tv-day"],
    queryFn: () => fetchTvShows({ url: "/trending/tv/day" }),
  });

  const popularTVQuery = useQuery({
    queryKey: ["popular-tv"],
    queryFn: () => fetchTvShows({ url: "/tv/popular" }),
  });

  const topRatedTVQuery = useQuery({
    queryKey: ["top-rated-tv"],
    queryFn: () => fetchTvShows({ url: "/tv/top_rated" }),
  });

  const airingTodayTVQuery = useQuery({
    queryKey: ["airing-today-tv"],
    queryFn: () => fetchTvShows({ url: "/tv/airing_today" }),
  });

  const onTheAirTVQuery = useQuery({
    queryKey: ["on-the-air-tv"],
    queryFn: () => fetchTvShows({ url: "/tv/on_the_air" }),
  });

  // ===== Combine all movies & TV for HeroSection =====
  useEffect(() => {
    if (
      !trendingMoviesWeekQuery.isLoading &&
      !trendingMoviesDayQuery.isLoading &&
      !popularMoviesQuery.isLoading &&
      !topRatedMoviesQuery.isLoading &&
      !upcomingMoviesQuery.isLoading &&
      !nowPlayingMoviesQuery.isLoading &&
      !trendingTVWeekQuery.isLoading &&
      !trendingTVDayQuery.isLoading &&
      !popularTVQuery.isLoading &&
      !topRatedTVQuery.isLoading &&
      !airingTodayTVQuery.isLoading &&
      !onTheAirTVQuery.isLoading
    ) {
      setAllData([
        ...(trendingMoviesWeekQuery.data || []),
        ...(trendingTVWeekQuery.data || []),
        ...(trendingMoviesDayQuery.data || []),
        ...(trendingTVDayQuery.data || []),
        ...(popularMoviesQuery.data || []),
        ...(popularTVQuery.data || []),
        ...(topRatedMoviesQuery.data || []),
        ...(topRatedTVQuery.data || []),
        ...(upcomingMoviesQuery.data || []),
        ...(airingTodayTVQuery.data || []),
        ...(nowPlayingMoviesQuery.data || []),
        ...(onTheAirTVQuery.data || []),
      ]);
    }
  }, [
    trendingMoviesWeekQuery.data,
    trendingMoviesDayQuery.data,
    popularMoviesQuery.data,
    topRatedMoviesQuery.data,
    upcomingMoviesQuery.data,
    nowPlayingMoviesQuery.data,
    trendingTVWeekQuery.data,
    trendingTVDayQuery.data,
    popularTVQuery.data,
    topRatedTVQuery.data,
    airingTodayTVQuery.data,
    onTheAirTVQuery.data,
    trendingMoviesWeekQuery.isLoading,
    trendingMoviesDayQuery.isLoading,
    popularMoviesQuery.isLoading,
    topRatedMoviesQuery.isLoading,
    upcomingMoviesQuery.isLoading,
    nowPlayingMoviesQuery.isLoading,
    trendingTVWeekQuery.isLoading,
    trendingTVDayQuery.isLoading,
    popularTVQuery.isLoading,
    topRatedTVQuery.isLoading,
    airingTodayTVQuery.isLoading,
    onTheAirTVQuery.isLoading,
  ]);

  // ===== Loading & Error Handling =====
  const isAnyLoading =
    trendingMoviesWeekQuery.isLoading ||
    trendingMoviesDayQuery.isLoading ||
    popularMoviesQuery.isLoading ||
    topRatedMoviesQuery.isLoading ||
    upcomingMoviesQuery.isLoading ||
    nowPlayingMoviesQuery.isLoading ||
    trendingTVWeekQuery.isLoading ||
    trendingTVDayQuery.isLoading ||
    popularTVQuery.isLoading ||
    topRatedTVQuery.isLoading ||
    airingTodayTVQuery.isLoading ||
    onTheAirTVQuery.isLoading;

  const isAnyError =
    trendingMoviesWeekQuery.isError ||
    trendingMoviesDayQuery.isError ||
    popularMoviesQuery.isError ||
    topRatedMoviesQuery.isError ||
    upcomingMoviesQuery.isError ||
    nowPlayingMoviesQuery.isError ||
    trendingTVWeekQuery.isError ||
    trendingTVDayQuery.isError ||
    popularTVQuery.isError ||
    topRatedTVQuery.isError ||
    airingTodayTVQuery.isError ||
    onTheAirTVQuery.isError;

  // ===== Refetch all queries =====
  const handleRefetchAll = () => {
    trendingMoviesWeekQuery.refetch();
    trendingMoviesDayQuery.refetch();
    popularMoviesQuery.refetch();
    topRatedMoviesQuery.refetch();
    upcomingMoviesQuery.refetch();
    nowPlayingMoviesQuery.refetch();
    trendingTVWeekQuery.refetch();
    trendingTVDayQuery.refetch();
    popularTVQuery.refetch();
    topRatedTVQuery.refetch();
    airingTodayTVQuery.refetch();
    onTheAirTVQuery.refetch();
  };

  if (isAnyLoading) return <CardSkeletonList isLoading={true} />;

  if (isAnyError) return <ErrorMessage onRetry={handleRefetchAll} />;

  return (
    <>
      <HeroSection movies={AllData || []} />

      {/* Movies Sections */}
      <Section
        Data={trendingMoviesWeekQuery.data || []}
        title="Trending Movies (Week)"
        isMovie={true}
      />
      <Section
        Data={trendingMoviesDayQuery.data || []}
        title="Trending Movies (Day)"
        isMovie={true}
      />
      <Section
        Data={popularMoviesQuery.data || []}
        title="Popular Movies"
        isMovie={true}
      />
      <Section
        Data={topRatedMoviesQuery.data || []}
        title="Top Rated Movies"
        isMovie={true}
      />
      <Section
        Data={upcomingMoviesQuery.data || []}
        title="Upcoming Movies"
        isMovie={true}
      />
      <Section
        Data={nowPlayingMoviesQuery.data || []}
        title="Now Playing Movies"
        isMovie={true}
      />

      {/* TV Sections */}
      <Section
        Data={trendingTVWeekQuery.data || []}
        title="Trending TV Shows (Week)"
        isMovie={false}
      />
      <Section
        Data={trendingTVDayQuery.data || []}
        title="Trending TV Shows (Day)"
        isMovie={false}
      />
      <Section
        Data={popularTVQuery.data || []}
        title="Popular TV Shows"
        isMovie={false}
      />
      <Section
        Data={topRatedTVQuery.data || []}
        title="Top Rated TV Shows"
        isMovie={false}
      />
      <Section
        Data={airingTodayTVQuery.data || []}
        title="Airing Today TV Shows"
        isMovie={false}
      />
      <Section
        Data={onTheAirTVQuery.data || []}
        title="On The Air TV Shows"
        isMovie={false}
      />
    </>
  );
}
