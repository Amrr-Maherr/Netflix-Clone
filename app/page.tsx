"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "../app/Components/HeroSection";
import Section from "../app/Components/Section";
import MoviePromo from "../app/Components/MoviePromo/MoviePromo";
import TopPicksSection from "../app/Components/TopPicksSection/TopPicksSection";
import ContinueWatchingSection from "../app/Components/ContinueWatchingSection/ContinueWatchingSection";
import GenreShowcaseSection from "../app/Components/GenreShowcaseSection/GenreShowcaseSection";
import BecauseYouWatchedSection from "../app/Components/BecauseYouWatchedSection/BecauseYouWatchedSection";
import NewReleasesSection from "../app/Components/NewReleasesSection/NewReleasesSection";
import OnlyOnNetflixSection from "../app/Components/OnlyOnNetflixSection/OnlyOnNetflixSection";
import AwardWinnersSection from "../app/Components/AwardWinnersSection/AwardWinnersSection";
import BingeWorthySection from "../app/Components/BingeWorthySection/BingeWorthySection";
import WeekendWatchSection from "../app/Components/WeekendWatchSection/WeekendWatchSection";
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

      {/* Top 10 Section */}
      {allMoviesQuery.data?.trendingMoviesWeek && (
        <TopPicksSection
          movies={allMoviesQuery.data.trendingMoviesWeek}
          title="Top 10 Movies in Egypt Today"
          mediaType="movie"
        />
      )}

      <div className="py-6 md:py-8">
        <div className="container">
          <Section
            Data={allMoviesQuery.data?.trendingMoviesWeek || []}
            title="Trending Now"
            isMovie={true}
          />
        </div>
      </div>

      {/* New Releases Section */}
      {allMoviesQuery.data?.upcomingMovies && (
        <NewReleasesSection
          movies={allMoviesQuery.data.upcomingMovies}
          title="New Releases This Week"
          mediaType="movie"
        />
      )}

      {/* Continue Watching Section */}
      {allTVShowsQuery.data?.trendingTVWeek && (
        <ContinueWatchingSection
          movies={allTVShowsQuery.data.trendingTVWeek}
          title="Continue Watching"
          mediaType="tv"
        />
      )}

      <div className="py-6 md:py-8">
        <div className="container">
          <Section
            Data={allTVShowsQuery.data?.trendingTVWeek || []}
            title="Trending TV Shows"
            isMovie={false}
          />
        </div>
      </div>

      {/* First Promo - Left Aligned */}
      {allMoviesQuery.data?.popularMovies?.[0] && (
        <MoviePromo
          movie={allMoviesQuery.data.popularMovies[0]}
          mediaType="movie"
          variant="left"
        />
      )}

      {/* Only on Netflix Section */}
      {allTVShowsQuery.data?.popularTV && (
        <OnlyOnNetflixSection
          movies={allTVShowsQuery.data.popularTV}
          mediaType="tv"
        />
      )}

      {/* Genre Showcase - Action */}
      {allMoviesQuery.data?.trendingMoviesDay && (
        <GenreShowcaseSection
          movies={allMoviesQuery.data.trendingMoviesDay}
          genre="Action & Adventure"
          mediaType="movie"
        />
      )}

      <div className="py-6 md:py-8">
        <div className="container">
          <Section
            Data={allMoviesQuery.data?.trendingMoviesDay || []}
            title="Trending Today"
            isMovie={true}
          />
        </div>
      </div>

      {/* Weekend Watch Section */}
      {allMoviesQuery.data?.popularMovies && (
        <WeekendWatchSection
          movies={allMoviesQuery.data.popularMovies}
          mediaType="movie"
        />
      )}

      {/* Because You Watched Section */}
      {allTVShowsQuery.data?.trendingTVDay && (
        <BecauseYouWatchedSection
          movies={allTVShowsQuery.data.trendingTVDay}
          basedOn="Stranger Things"
          mediaType="tv"
        />
      )}

      <div className="py-6 md:py-8">
        <div className="container">
          <Section
            Data={allTVShowsQuery.data?.trendingTVDay || []}
            title="Hot TV Shows Today"
            isMovie={false}
          />
          <Section
            Data={allMoviesQuery.data?.popularMovies || []}
            title="Popular Movies"
            isMovie={true}
          />
        </div>
      </div>

      {/* Second Promo - Right Aligned */}
      {allTVShowsQuery.data?.popularTV?.[1] && (
        <MoviePromo
          movie={allTVShowsQuery.data.popularTV[1]}
          mediaType="tv"
          variant="right"
        />
      )}

      {/* Binge-Worthy Section */}
      {allTVShowsQuery.data?.onTheAirTV && (
        <BingeWorthySection
          movies={allTVShowsQuery.data.onTheAirTV}
          mediaType="tv"
        />
      )}

      {/* Top 10 TV Shows */}
      {allTVShowsQuery.data?.popularTV && (
        <TopPicksSection
          movies={allTVShowsQuery.data.popularTV}
          title="Top 10 TV Shows in Egypt Today"
          mediaType="tv"
        />
      )}

      <div className="py-6 md:py-8">
        <div className="container">
          <Section
            Data={allTVShowsQuery.data?.popularTV || []}
            title="Popular TV Shows"
            isMovie={false}
          />
          <Section
            Data={allMoviesQuery.data?.upcomingMovies || []}
            title="Coming Soon"
            isMovie={true}
          />
        </div>
      </div>

      {/* Award Winners Section */}
      {allMoviesQuery.data?.topRatedMovies && (
        <AwardWinnersSection
          movies={allMoviesQuery.data.topRatedMovies}
          mediaType="movie"
        />
      )}

      {/* Third Promo - Center Aligned */}
      {allMoviesQuery.data?.topRatedMovies?.[2] && (
        <MoviePromo
          movie={allMoviesQuery.data.topRatedMovies[2]}
          mediaType="movie"
          variant="center"
        />
      )}

      {/* Genre Showcase - Drama */}
      {allTVShowsQuery.data?.airingTodayTV && (
        <GenreShowcaseSection
          movies={allTVShowsQuery.data.airingTodayTV}
          genre="Drama Series"
          mediaType="tv"
        />
      )}

      <div className="py-6 md:py-8">
        <div className="container">
          <Section
            Data={allTVShowsQuery.data?.airingTodayTV || []}
            title="Airing Today"
            isMovie={false}
          />
        </div>
      </div>

      {/* New Releases TV */}
      {allTVShowsQuery.data?.airingTodayTV && (
        <NewReleasesSection
          movies={allTVShowsQuery.data.airingTodayTV}
          title="New Episodes This Week"
          mediaType="tv"
        />
      )}

      <div className="py-6 md:py-8">
        <div className="container">
          <Section
            Data={allMoviesQuery.data?.nowPlayingMovies || []}
            title="Now Playing in Theaters"
            isMovie={true}
          />
        </div>
      </div>

      {/* Fourth Promo - Left Aligned */}
      {allTVShowsQuery.data?.topRatedTV?.[3] && (
        <MoviePromo
          movie={allTVShowsQuery.data.topRatedTV[3]}
          mediaType="tv"
          variant="left"
        />
      )}

      {/* Award Winners TV */}
      {allTVShowsQuery.data?.topRatedTV && (
        <AwardWinnersSection
          movies={allTVShowsQuery.data.topRatedTV}
          mediaType="tv"
        />
      )}

      {/* Because You Watched Section 2 */}
      {allMoviesQuery.data?.nowPlayingMovies && (
        <BecauseYouWatchedSection
          movies={allMoviesQuery.data.nowPlayingMovies}
          basedOn="The Dark Knight"
          mediaType="movie"
        />
      )}

      <div className="py-6 md:py-8">
        <div className="container">
          <Section
            Data={allTVShowsQuery.data?.onTheAirTV || []}
            title="Currently Airing"
            isMovie={false}
          />
        </div>
      </div>

      <PricingSection />
      <AskedQuestions />
    </>
  );
}
