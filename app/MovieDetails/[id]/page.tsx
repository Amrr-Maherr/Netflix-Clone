"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import FetchProductDetails from "@/Api/FetchMovieDetails";
import HeroSection from "./components/HeroSection";
import OverviewSection from "./components/OverviewSection";
import GenresSection from "./components/GenresSection";
import TrailerSection from "./components/TrailerSection";
import CastSection from "./components/CastSection";
import CrewSection from "./components/CrewSection";
import ImagesSection from "./components/ImagesSection";
import ProvidersSection from "./components/ProvidersSection";
import SimilarMoviesSection from "./components/SimilarMoviesSection";

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
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        <span className="ml-3 text-xl">Loading movie details…</span>
      </div>
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

  const trailer = movie.videos?.results?.[0];
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

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <OverviewSection overview={movie.overview} />
        <GenresSection genres={movie.genres} />
        {trailer && <TrailerSection trailerUrl={trailerUrl || ""} />}
        {movie.credits?.cast && <CastSection cast={movie.credits.cast} />}
        {movie.credits?.crew && <CrewSection crew={movie.credits.crew} />}
        {movie.images?.backdrops && (
          <ImagesSection backdrops={movie.images.backdrops} />
        )}
        {movie["watch/providers"]?.results && (
          <ProvidersSection providers={movie["watch/providers"].results} />
        )}
        {movie.similar?.results && (
          <SimilarMoviesSection movies={movie.similar.results} />
        )}
      </div>
    </div>
  );
}
