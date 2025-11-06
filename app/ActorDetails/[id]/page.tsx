"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import FetchPersonDetails from "@/Api/FetchPersonDetails";

import Slider from "@/app/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import { Play, Info } from "lucide-react";
import CardMovie from "@/app/Components/CardMovie/CardMovie";
import CardTvShow from "@/app/Components/CardTvShow/CardTvShow";
import HeroSection from "../components/HeroSection";
import Biography from "../components/Biography";
import MovieCredits from "../components/MovieCredits";
import VideosSection from "../components/VideosSection";
import SocialLinks from "../components/SocialLinks";
import TvCredits from "../components/TvCredits";
import AlsoKnownAs from "../components/AlsoKnownAs";
import ImagesGallery from "../components/ImagesGallery";
import AwardsSection from "../components/AwardsSection";
import KnownForSection from "../components/KnownForSection";
import TriviaSection from "../components/TriviaSection";
import NetflixIntroLoader from "@/app/Components/Loading/NetflixIntroLoader";
import ErrorMessage from "@/app/Components/ErrorHandel/ErrorMessage";

// Components


export default function Page() {
  const { id } = useParams();
  const {
    data: person,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["person", id],
    queryFn: () => FetchPersonDetails({ id: id as string }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading)
    return (
      <NetflixIntroLoader/>
    );

  if (!person || isError)
    return (
      <ErrorMessage/>
    );

  const combinedCredits = [
    ...(person.combined_credits?.cast || []),
    ...(person.combined_credits?.crew || [])
  ]

  const Tv = combinedCredits.filter((c) => c.media_type === "tv") || []
  const Movies = combinedCredits.filter((c) => c.media_type === "movie") || [];

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <HeroSection person={person} />

      {/* Content */}
      <div className="bg-black -mt-32 relative z-10 container">
        <Biography text={person.biography} />
        <MovieCredits movies={Movies} />
        <TvCredits shows={Tv} />
        <AlsoKnownAs names={person.also_known_as} />
        <ImagesGallery images={person.images?.profiles} />
        <VideosSection videos={person.videos?.results} />
        <AwardsSection awards={person.awards} />
        <KnownForSection items={person.known_for} />
        <TriviaSection trivia={person.trivia} />
        <SocialLinks ids={person.external_ids} />
      </div>
    </div>
  );
}
