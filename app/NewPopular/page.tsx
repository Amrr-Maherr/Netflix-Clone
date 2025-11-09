"use client";
import fetchMovies from "@/Api/FetchPopularMovies";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import NetflixIntroLoader from "../Components/Loading/NetflixIntroLoader";
import ErrorMessage from "../Components/ErrorHandel/ErrorMessage";
import { useEffect, useState } from "react";
import fetchTvShows from "@/Api/fetchTvShows";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  media_type: "movie" | "tv" | "person";
}

export default function Gallery() {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  // Queries
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

  useEffect(() => {
    setAllMovies([
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
    
  // Loading state
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

  // Error state
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
    airingTodayTVQuery.isError
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
  console.log(allMovies,"all");
  
  return (
    <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full py-20 container">
      <AnimatePresence>
        {allMovies.map((movie, index) => (
          <Link
            href={
              movie.media_type === "movie"
                ? `/MovieDetails/${movie.id}`
                : movie.media_type === "tv"
                ? `/TvShowDetails/${movie.id}`
                : `#`
            }
            key={`${movie.id}-${index}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full"
            >
              <Image
                className="w-full h-auto rounded-lg"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title ?? ""}
                width={500}
                height={500}
                loading="lazy"
              />
            </motion.div>
          </Link>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
