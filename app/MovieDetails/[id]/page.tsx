"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import FetchProductDetails from "@/Api/FetchMovieDetails";

import HeroSection from "./components/HeroSection";
import CastSection from "./components/CastSection";
import OverviewSection from "./components/OverviewSection";
import GenresSection from "./components/GenresSection";
import SimilarMoviesSection from "./components/SimilarMoviesSection";
import ImagesSection from "./components/ImagesSection";
import VideosSection from "./components/VideosSection";
import ReviewsSection from "./components/ReviewsSection";
import ProductionCompaniesSection from "./components/ProductionCompaniesSection";
import WatchProvidersSection from "./components/WatchProvidersSection";
import ProvidersSection from "./components/ProvidersSection";
import CrewSection from "./components/CrewSection";
import NetflixIntroLoader from "@/app/Components/Loading/NetflixIntroLoader";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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

  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // ===== GSAP Animations for sections =====
  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      if (!section) return;
      gsap.fromTo(
        section,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, [movie]);

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
    <div className="min-h-screen bg-black text-white">
      <HeroSection
        movie={movie}
        backdropUrl={backdropUrl}
        posterUrl={posterUrl}
        trailer={trailer}
      />

      <div className="mx-auto py-12 space-y-12 container">
        {/* 1. Cast before Overview like Netflix */}
        {movie?.credits?.cast && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <CastSection cast={movie.credits.cast} />
          </div>
        )}

        {/* 2. Overview + Genres */}
        <div ref={(el) => el && sectionsRef.current.push(el)}>
          <OverviewSection overview={movie.overview} />
        </div>

        <div ref={(el) => el && sectionsRef.current.push(el)}>
          <GenresSection genres={movie.genres} />
        </div>

        {/* 3. Trailer */}
        {/* {trailer && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <TrailerSection trailerUrl={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0`} />
          </div>
        )} */}

        {/* 4. Similar + Recommended Movies */}
        {movie.similar?.results && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <SimilarMoviesSection
              shows={[]}
              movies={movie?.similar?.results}
              title="Similar Movies"
            />
          </div>
        )}

        {movie.recommendations?.results && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <SimilarMoviesSection
              shows={[]}
              movies={movie?.recommendations?.results}
              title="Recommended Movies"
            />
          </div>
        )}

        {/* 5. Images + Videos */}
        {movie.images?.backdrops && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <ImagesSection
              images={[]}
              backdrops={movie?.images?.backdrops}
              logos={movie?.images?.logos}
              posters={movie?.images?.posters}
            />
          </div>
        )}

        {movie.videos?.results && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <VideosSection videos={movie?.videos?.results} />
          </div>
        )}

        {/* 6. Reviews */}
        {movie.reviews?.results && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <ReviewsSection reviews={movie?.reviews?.results} />
          </div>
        )}

        {/* 7. Production + Watch Providers */}
        {movie.production_companies && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <ProductionCompaniesSection
              companies={movie?.production_companies}
            />
          </div>
        )}

        {movie["watch/providers"]?.results && (
          <>
            <div ref={(el) => el && sectionsRef.current.push(el)}>
              <ProvidersSection providers={movie["watch/providers"]?.results} />
            </div>
            <div ref={(el) => el && sectionsRef.current.push(el)}>
              <WatchProvidersSection
                providers={movie["watch/providers"]?.results}
              />
            </div>
          </>
        )}

        {/* 8. Crew Section (Extra Data if exists) */}
        {movie?.credits?.crew && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <CrewSection crew={movie?.credits.crew} />
          </div>
        )}
      </div>
    </div>
  );
}
