"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import fetchMovies from "@/Api/FetchPopularMovies";
import fetchTvShows from "@/Api/fetchTvShows";
import { useQuery } from "@tanstack/react-query";
import NetflixIntroLoader from "../Components/Loading/NetflixIntroLoader";
import ErrorMessage from "../Components/ErrorHandel/ErrorMessage";
import CardMovie from "../Components/CardMovie/CardMovie";
import CardTvShow from "../Components/CardTvShow/CardTvShow";
import HeroSection from "../Components/HeroSection/index";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  media_type: "movie" | "tv" | "person";
}

export default function Gallery() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // ====== Queries ======
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

  // ===== TV Shows Queries =====
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

  // ===== Merge all data =====
  const allMovies = useMemo(() => [
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
  ].filter(movie => movie.media_type === "movie" || movie.media_type === "tv"), [
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
  ]);

  // ===== GSAP animation for cards =====
  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, [allMovies]);

  // ===== Loading & Error =====
  if (
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
    onTheAirTVQuery.isLoading
  )
    return <NetflixIntroLoader />;

  if (
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
    onTheAirTVQuery.isError
  )
    return (
      <ErrorMessage
        onRetry={() => {
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
        }}
      />
    );

  const heroItems = allMovies.slice(0, 25).map((movie: Movie) => ({
    ...movie,
    media_type: movie.media_type,
  }));

  return (
    <>
      {heroItems.length > 0 && <HeroSection movies={heroItems} />}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 w-full py-20 container">
      {allMovies.map((movie, index) => (
        <div
          key={`${movie.id}-${index}`}
          ref={(el) => {
            if (el) cardsRef.current[index] = el;
          }}
          className="w-full"
        >
          {movie.media_type === "movie" ? (
            <CardMovie movie={movie} />
          ) : movie.media_type === "tv" ? (
            <CardTvShow TvShow={movie} />
          ) : null}
        </div>
      ))}
    </div>
    </>
  );
}
