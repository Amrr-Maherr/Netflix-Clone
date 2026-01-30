"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import FetchProductDetails from "@/Api/FetchMovieDetails";

import HeroSection from "./components/HeroSection";
import CastSection from "./components/CastSection";
import OverviewSection from "./components/OverviewSection";
import GenresSection from "./components/GenresSection";
import TrailerSection from "./components/TrailerSection";
import SimilarMoviesSection from "./components/SimilarMoviesSection";
import ImagesSection from "./components/ImagesSection";
import VideosSection from "./components/VideosSection";
import ReviewsSection from "./components/ReviewsSection";
import ProductionCompaniesSection from "./components/ProductionCompaniesSection";
import WatchProvidersSection from "./components/WatchProvidersSection";
import ProvidersSection from "./components/ProvidersSection";
import CrewSection from "./components/CrewSection";
import NetflixIntroLoader from "@/app/Components/Loading/NetflixIntroLoader";
import { useRef } from "react";
import PageHead from "@/app/Components/PageHead";
import VideoGallery from "@/app/Components/VideoGallery/VideoGallery";
import KeywordsTags from "@/app/Components/KeywordsTags/KeywordsTags";

export default function Page() {
  const { id } = useParams();
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => FetchProductDetails({ id: id as string }),
    enabled: !!id,
  });

  if (isLoading) return <NetflixIntroLoader />;

  if (isError || !movie)
    return (
      <div className="flex items-center justify-center h-screen bg-black text-red-500 text-xl">
        Error loading movie data
      </div>
    );

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-poster.jpg";

  const trailer =
    movie.videos?.results?.[0] ||
    movie.videos?.results?.[1] ||
    movie.videos?.results?.[2] ||
    movie.videos?.results?.[3];

  return (
    <>
    <PageHead title={movie.title} description={movie.overview} image={posterUrl} />
    <div className="min-h-screen bg-black text-white">
      <HeroSection
        movie={movie}
        backdropUrl={backdropUrl}
        posterUrl={posterUrl}
        trailer={trailer}
      />

      <div className="mx-auto py-12 space-y-12 container">
        {movie?.credits?.cast && (
          // <div
          //   ref={(el) => {
          //     if (el && !sectionsRef.current.includes(el))
          //       sectionsRef.current.push(el);
          //   }}
          // >
          <CastSection cast={movie.credits.cast} />
          // </div>
        )}
        {movie.overview && <OverviewSection overview={movie.overview} />}
        {movie.genres && <GenresSection genres={movie.genres} />}

        {movie.similar?.results && (
          <SimilarMoviesSection
            shows={[]}
            movies={movie.similar.results}
            title="Similar Movies"
          />
        )}
        {movie.recommendations?.results && (
          <SimilarMoviesSection
            shows={[]}
            movies={movie.recommendations.results}
            title="Recommended Movies"
          />
        )}

        {movie.images?.backdrops && (
          <ImagesSection
            images={[]}
            backdrops={movie.images.backdrops}
            logos={movie.images.logos}
            posters={movie.images.posters}
          />
        )}
        {movie.videos?.results && (
          <VideoGallery videos={movie.videos.results} />
        )}
        {movie.keywords?.results && (
          <KeywordsTags keywords={movie.keywords.results} />
        )}
        {movie.reviews?.results && (
          <ReviewsSection reviews={movie.reviews.results} />
        )}
        {movie.production_companies && (
          <ProductionCompaniesSection companies={movie.production_companies} />
        )}
        {movie["watch/providers"]?.results && (
          <>
            <ProvidersSection providers={movie["watch/providers"].results} />
            <WatchProvidersSection
              providers={movie["watch/providers"].results}
            />
          </>
        )}

        {movie?.credits?.crew && (
          // <div
          //   ref={(el) => {
          //     if (el && !sectionsRef.current.includes(el))
          //       sectionsRef.current.push(el);
          //   }}
          // >
          <CrewSection crew={movie.credits.crew} />
          // </div>
        )}
      </div>
    </div>
    </>
  );
}
