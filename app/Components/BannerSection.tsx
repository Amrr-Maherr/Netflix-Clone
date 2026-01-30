"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Info } from "lucide-react";
import { DataTypes } from "../Types/types";
import { Button } from "@/components/ui/button";

interface BannerSectionProps {
  movie: DataTypes;
  isReversed?: boolean;
  media_type: "movie" | "tv";
}

export default function BannerSection({ movie, media_type }: BannerSectionProps) {
  const movieTitle = ('title' in movie ? movie.title : ('name' in movie ? movie.name : undefined)) || "Unknown Title";
  const overview = movie.overview || "No description available.";
  const backdropPath = `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path || ''}`;

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden my-5 md:my-20">
      {/* Background Image */}
      <Image
        src={backdropPath}
        alt={movieTitle}
        fill
        className="object-cover"
        quality={100}
        placeholder="blur"
        blurDataURL="/Netflix_Symbol_RGB.png"
        priority
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-end pb-20 md:pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white text-left">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 max-w-3xl truncate">
            {movieTitle}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-6 max-w-2xl line-clamp-3">
            {overview.length > 200
              ? `${overview.substring(0, 200)}...`
              : overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              href={
                media_type === "movie"
                  ? `/MovieDetails/${movie.id || ""}`
                  : `/TvShowDetails/${movie.id || ""}`
              }
            >
              <Button className="bg-white text-black hover:bg-gray-200 px-6 py-2 sm:px-8 sm:py-3 rounded-md font-bold text-sm sm:text-base flex items-center gap-2 transition-all duration-200">
                <Play size={20} fill="currentColor" />
                Play
              </Button>
            </Link>

            <Button variant="secondary" className="bg-gray-500/70 hover:bg-gray-500/50 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-md font-bold text-sm sm:text-base flex items-center gap-2 backdrop-blur-sm transition-all duration-200">
              <Info size={20} />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
