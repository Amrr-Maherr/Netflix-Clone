"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import FetchTVDetails from "@/Api/FetchTVDetails";

import HeroSection from "@/app/MovieDetails/[id]/components/HeroSection";
import OverviewSection from "@/app/MovieDetails/[id]/components/OverviewSection";
import GenresSection from "@/app/MovieDetails/[id]/components/GenresSection";
import CastSection from "@/app/MovieDetails/[id]/components/CastSection";
import CrewSection from "@/app/MovieDetails/[id]/components/CrewSection";
import TrailerSection from "@/app/MovieDetails/[id]/components/TrailerSection";
import SimilarShowsSection from "@/app/MovieDetails/[id]/components/SimilarMoviesSection";
import ImagesSection from "@/app/MovieDetails/[id]/components/ImagesSection";
import VideosSection from "@/app/MovieDetails/[id]/components/VideosSection";
import ReviewsSection from "@/app/MovieDetails/[id]/components/ReviewsSection";
import ProductionCompaniesSection from "@/app/MovieDetails/[id]/components/ProductionCompaniesSection";
import ProvidersSection from "@/app/MovieDetails/[id]/components/ProvidersSection";
import WatchProvidersSection from "@/app/MovieDetails/[id]/components/WatchProvidersSection";

import EpisodeDetailsSection from "../../TvShowDetails/components/EpisodeDetailsSection";
import SeasonsSection from "../../TvShowDetails/components/SeasonsSection";
import SeasonsOverviewSection from "../components/SeasonsOverviewSection";
import ShowMetadataSection from "../components/ShowMetadataSection";
import CreatedBySection from "../components/CreatedBySection";
import NetworksSection from "../components/NetworksSection";
import ProductionCountriesSection from "../components/ProductionCountriesSection";
import KeywordsSection from "../components/KeywordsSection";
import ContentRatingSection from "../components/ContentRatingSection";

import ErrorMessage from "@/app/Components/ErrorHandel/ErrorMessage";
import NetflixIntroLoader from "@/app/Components/Loading/NetflixIntroLoader";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function TvPage() {
  const { id } = useParams();

  const {
    data: tv,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tv-details", id],
    queryFn: () => FetchTVDetails({ id: id as string }),
    enabled: !!id,
  });

  const sectionsRef = useRef<HTMLDivElement[]>([]);

  // GSAP animations for all sections
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
  }, [tv]);

  if (isLoading) return <NetflixIntroLoader />;

  if (isError || !tv) return <ErrorMessage />;

  const backdropUrl = tv.backdrop_path
    ? `https://image.tmdb.org/t/p/original${tv.backdrop_path}`
    : null;

  const posterUrl = tv.poster_path
    ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
    : "/placeholder-poster.jpg";

  const trailer =
    tv.videos?.results?.[0] ||
    tv.videos?.results?.[1] ||
    tv.videos?.results?.[2] ||
    tv.videos?.results?.[3];

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection
        tv={tv}
        backdropUrl={backdropUrl}
        posterUrl={posterUrl}
        trailer={trailer}
      />

      <div className="mx-auto py-12 space-y-12 container">
        {/* Seasons Overview */}
        {tv.number_of_seasons && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <SeasonsOverviewSection
              numberOfSeasons={tv.number_of_seasons}
              numberOfEpisodes={tv.number_of_episodes}
            />
          </div>
        )}

        {/* Last & Next Episode */}
        {tv.last_episode_to_air && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <EpisodeDetailsSection episode={tv.last_episode_to_air} />
          </div>
        )}
        {tv.next_episode_to_air && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <EpisodeDetailsSection episode={tv.next_episode_to_air} />
          </div>
        )}

        {/* Overview & Genres */}
        <div ref={(el) => el && sectionsRef.current.push(el)}>
          <OverviewSection overview={tv.overview} />
        </div>
        <div ref={(el) => el && sectionsRef.current.push(el)}>
          <GenresSection genres={tv.genres} />
        </div>

        {/* Created By & Cast & Crew */}
        {tv.created_by && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <CreatedBySection creators={tv.created_by} />
          </div>
        )}
        {tv.credits?.cast && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <CastSection cast={tv.credits.cast} />
          </div>
        )}
        {tv.credits?.crew && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <CrewSection crew={tv.credits.crew} />
          </div>
        )}

        {/* Seasons */}
        {tv.seasons && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <SeasonsSection seasons={tv.seasons} tvId={tv.id} />
          </div>
        )}

        {/* Similar & Recommended Shows */}
        {tv.similar?.results && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <SimilarShowsSection
              shows={tv.similar.results}
              movies={[]}
              title="Similar TV Shows"
            />
          </div>
        )}
        {tv.recommendations?.results && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <SimilarShowsSection
              shows={tv.recommendations.results}
              movies={[]}
              title="Recommended TV Shows"
            />
          </div>
        )}

        {/* Images & Videos */}
        {tv.images?.backdrops && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <ImagesSection
              images={[]}
              backdrops={tv.images.backdrops}
              logos={tv.images.logos}
              posters={tv.images.posters}
            />
          </div>
        )}
        {tv.videos?.results && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <VideosSection videos={tv.videos.results} />
          </div>
        )}

        {/* Reviews */}
        {tv.reviews?.results && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <ReviewsSection reviews={tv.reviews.results} />
          </div>
        )}

        {/* Production Companies */}
        {tv.production_companies && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <ProductionCompaniesSection companies={tv.production_companies} />
          </div>
        )}

        {/* Networks & Countries */}
        {tv.networks && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <NetworksSection networks={tv.networks} />
          </div>
        )}
        {tv.production_countries && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <ProductionCountriesSection countries={tv.production_countries} />
          </div>
        )}

        {/* Keywords & Content Ratings */}
        {tv.keywords?.results && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <KeywordsSection keywords={tv.keywords.results} />
          </div>
        )}
        {tv.content_ratings?.results && (
          <div ref={(el) => el && sectionsRef.current.push(el)}>
            <ContentRatingSection ratings={tv.content_ratings.results} />
          </div>
        )}

        {/* Watch Providers */}
        {tv["watch/providers"]?.results && (
          <>
            <div ref={(el) => el && sectionsRef.current.push(el)}>
              <ProvidersSection providers={tv["watch/providers"].results} />
            </div>
            <div ref={(el) => el && sectionsRef.current.push(el)}>
              <WatchProvidersSection
                providers={tv["watch/providers"].results}
              />
            </div>
          </>
        )}

        {/* Metadata */}
        <div ref={(el) => el && sectionsRef.current.push(el)}>
          <ShowMetadataSection tv={tv} />
        </div>
      </div>
    </div>
  );
}
