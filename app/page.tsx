"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "../app/Components/HeroSection";
import Section from "../app/Components/Section";

// import BannerSection from "./Components/BannerSection";
import { fetchAllMovies } from "../Api/FetchAllMovies";
import { fetchAllTVShows } from "../Api/FetchAllTVShows";
import CardSkeletonList from "./Components/Loading/CardSkeletonList";
import ErrorMessage from "./Components/ErrorHandel/ErrorMessage";
import NetflixIntroLoader from "./Components/Loading/NetflixIntroLoader";
import PricingSection from "./Components/PricingSection/PricingSection";
import AskedQuestions from "./Components/AskedQuestionsSection/AskedQuestions";

export default function Home() {
  // ======== Movies Query ========
  const allMoviesQuery = useQuery({
    queryKey: ["all-movies"],
    queryFn: () => fetchAllMovies(),
  });

  // ======== TV Shows Query ========
  const allTVShowsQuery = useQuery({
    queryKey: ["all-tv-shows"],
    queryFn: () => fetchAllTVShows(),
  });

  // ===== Combine all movies & TV for HeroSection =====
  const AllData = [
    ...(allMoviesQuery.data?.trendingMoviesWeek || []),
    ...(allTVShowsQuery.data?.trendingTVWeek || []),
    ...(allMoviesQuery.data?.trendingMoviesDay || []),
    ...(allTVShowsQuery.data?.trendingTVDay || []),
    ...(allMoviesQuery.data?.popularMovies || []),
    ...(allTVShowsQuery.data?.popularTV || []),
    ...(allMoviesQuery.data?.topRatedMovies || []),
    ...(allTVShowsQuery.data?.topRatedTV || []),
    ...(allMoviesQuery.data?.upcomingMovies || []),
    ...(allTVShowsQuery.data?.airingTodayTV || []),
    ...(allMoviesQuery.data?.nowPlayingMovies || []),
    ...(allTVShowsQuery.data?.onTheAirTV || []),
  ];

  // ===== Loading & Error Handling =====
  const isAnyLoading =
    allMoviesQuery.isLoading || allTVShowsQuery.isLoading;

  const isAnyError =
    allMoviesQuery.isError || allTVShowsQuery.isError;

  // ===== Refetch all queries =====
  const handleRefetchAll = () => {
    allMoviesQuery.refetch();
    allTVShowsQuery.refetch();
  };

  if (isAnyLoading) return <NetflixIntroLoader />;

  if (isAnyError) return <ErrorMessage onRetry={handleRefetchAll} />;

  if (isAnyError) return <ErrorMessage onRetry={handleRefetchAll} />;

  return (
    <>
      <HeroSection movies={AllData || []} />

      {/* <BannerSection movie={allTVShowsQuery.data?.trendingTVWeek?.[0] || {}} media_type="tv" /> */}

      <Section
        Data={allMoviesQuery.data?.trendingMoviesWeek || []}
        title="Trending Now"
        isMovie={true}
      />
      <Section
        Data={allTVShowsQuery.data?.trendingTVWeek || []}
        title="Trending TV Shows"
        isMovie={false}
      />
      <Section
        Data={allMoviesQuery.data?.trendingMoviesDay || []}
        title="Trending Today"
        isMovie={true}
      />
      <Section
        Data={allTVShowsQuery.data?.trendingTVDay || []}
        title="Hot TV Shows Today"
        isMovie={false}
      />

      {/* <BannerSection
        movie={allMoviesQuery.data?.trendingMoviesDay?.[0] || {}}
        media_type="movie"
      /> */}

      <Section
        Data={allMoviesQuery.data?.popularMovies || []}
        title="Popular Movies"
        isMovie={true}
      />
      <Section
        Data={allTVShowsQuery.data?.popularTV || []}
        title="Popular TV Shows"
        isMovie={false}
      />

      {/* <BannerSection movie={allTVShowsQuery.data?.popularTV?.[0] || {}} media_type="tv" /> */}

      <Section
        Data={allMoviesQuery.data?.upcomingMovies || []}
        title="Coming Soon"
        isMovie={true}
      />
      <Section
        Data={allTVShowsQuery.data?.airingTodayTV || []}
        title="Airing Today"
        isMovie={false}
      />

      {/* <BannerSection movie={allMoviesQuery.data?.topRatedMovies?.[0] || {}} media_type="movie" /> */}

      <Section
        Data={allMoviesQuery.data?.nowPlayingMovies || []}
        title="Now Playing in Theaters"
        isMovie={true}
      />
      <Section
        Data={allTVShowsQuery.data?.onTheAirTV || []}
        title="Currently Airing"
        isMovie={false}
      />

      {/* <BannerSection movie={allTVShowsQuery.data?.topRatedTV?.[0] || {}} media_type="tv" /> */}
      <PricingSection />
      <AskedQuestions />
    </>
  );
}
