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

export default function Page() {
  const { id } = useParams();

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => FetchProductDetails({ id: id as string }),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <NetflixIntroLoader/>
    );

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
  const trailerUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0`
    : null;

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection
        movie={movie}
        backdropUrl={backdropUrl}
        posterUrl={posterUrl}
        trailer={trailer}
      />

      <div className="mx-auto py-12 space-y-12 container">
        {/* 1. Cast before Overview like Netflix */}
        {movie?.credits?.cast && <CastSection cast={movie.credits.cast} />}

        {/* 2. Overview + Genres */}
        <OverviewSection overview={movie.overview} />
        <GenresSection genres={movie.genres} />

        {/* 3. Trailer */}
        {trailer && <TrailerSection trailerUrl={trailerUrl || ""} />}

        {/* 4. Similar + Recommended Movies */}
        {movie.similar?.results && (
          <SimilarMoviesSection
            shows={[]}
            movies={movie?.similar?.results}
            title="Similar Movies"
          />
        )}
        {movie.recommendations?.results && (
          <SimilarMoviesSection
            shows={[]}
            movies={movie?.recommendations?.results}
            title="Recommended Movies"
          />
        )}

        {/* 5. Images + Videos */}
        {movie.images?.backdrops && (
          <ImagesSection
            images={[]}
            backdrops={movie?.images?.backdrops}
            logos={movie?.images?.logos}
            posters={movie?.images?.posters}
          />
        )}
        {movie.videos?.results && (
          <VideosSection videos={movie?.videos?.results} />
        )}

        {/* 6. Reviews */}
        {movie.reviews?.results && (
          <ReviewsSection reviews={movie?.reviews?.results} />
        )}

        {/* 7. Production + Watch Providers */}
        {movie.production_companies && (
          <ProductionCompaniesSection companies={movie?.production_companies} />
        )}
        {movie["watch/providers"]?.results && (
          <>
            <ProvidersSection providers={movie["watch/providers"]?.results} />
            <WatchProvidersSection
              providers={movie["watch/providers"]?.results}
            />
          </>
        )}

        {/* 8. Crew Section (Extra Data if exists) */}
        {movie?.credits?.crew && <CrewSection crew={movie?.credits.crew} />}
      </div>
    </div>
  );
}
