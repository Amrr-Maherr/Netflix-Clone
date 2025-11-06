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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border-4 border-t-red-600 border-gray-800 rounded-full animate-spin"></div>
          <p className="text-2xl text-white font-sans">Loading...</p>
        </div>
      </div>
    );

  if (!person || isError)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-600 text-2xl">
        Person not found
      </div>
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
