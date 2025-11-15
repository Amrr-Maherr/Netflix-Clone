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

  if (isLoading)
    return (
      <NetflixIntroLoader/>
    );

  if (isError || !tv)
    return (
      <ErrorMessage/>
    );

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

  const trailerUrl = trailer
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0`
    : null;

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
          <SeasonsOverviewSection
            numberOfSeasons={tv.number_of_seasons}
            numberOfEpisodes={tv.number_of_episodes}
          />
        )}

        {/* Last & Next Episode */}
        {tv.last_episode_to_air && (
          <EpisodeDetailsSection episode={tv.last_episode_to_air} />
        )}
        {tv.next_episode_to_air && (
          <EpisodeDetailsSection episode={tv.next_episode_to_air} />
        )}

        {/* Overview & Genres */}
        <OverviewSection overview={tv.overview} />
        <GenresSection genres={tv.genres} />

        {/* Created By & Cast & Crew (Netflix style) */}
        {tv.created_by && <CreatedBySection creators={tv.created_by} />}
        {tv.credits?.cast && <CastSection cast={tv.credits.cast} />}
        {tv.credits?.crew && <CrewSection crew={tv.credits.crew} />}

        {/* Seasons */}
        {tv.seasons && <SeasonsSection seasons={tv.seasons} tvId={tv.id}/>}

        {/* Trailer */}
        {/* {trailer && <TrailerSection trailerUrl={trailerUrl || ""} />} */}

        {/* Similar & Recommended Shows */}
        {tv.similar?.results && (
          <SimilarShowsSection
            shows={tv.similar.results}
            title="Similar TV Shows"
            movies={[]}
          />
        )}
        {tv.recommendations?.results && (
          <SimilarShowsSection
            shows={tv.recommendations.results}
            title="Recommended TV Shows"
            movies={[]}
          />
        )}

        {/* Images & Videos */}
        {tv.images?.backdrops && (
          <ImagesSection
            images={[]}
            backdrops={tv.images.backdrops}
            logos={tv.images.logos}
            posters={tv.images.posters}
          />
        )}
        {tv.videos?.results && <VideosSection videos={tv.videos.results} />}

        {/* Reviews */}
        {tv.reviews?.results && <ReviewsSection reviews={tv.reviews.results} />}

        {/* Production Companies */}
        {tv.production_companies && (
          <ProductionCompaniesSection companies={tv.production_companies} />
        )}

        {/* Networks & Countries */}
        {tv.networks && <NetworksSection networks={tv.networks} />}
        {tv.production_countries && (
          <ProductionCountriesSection countries={tv.production_countries} />
        )}

        {/* Keywords & Content Ratings */}
        {tv.keywords?.results && (
          <KeywordsSection keywords={tv.keywords.results} />
        )}
        {tv.content_ratings?.results && (
          <ContentRatingSection ratings={tv.content_ratings?.results} />
        )}

        {/* Watch Providers */}
        {tv["watch/providers"]?.results && (
          <>
            <ProvidersSection providers={tv["watch/providers"].results} />
            <WatchProvidersSection providers={tv["watch/providers"].results} />
          </>
        )}

        {/* Metadata */}
        <ShowMetadataSection tv={tv} />
      </div>
    </div>
  );
}
