"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Info } from "lucide-react";
import { DataTypes } from "../Types/types";

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
    <div className="relative w-full h-screen overflow-hidden mt-3 md:mt-8">
      {/* Background Image */}
      <Image
        src={backdropPath}
        alt={movieTitle}
        fill
        className="object-cover"
        quality={75}
        priority
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

      {/* Content */}
      <div className={`absolute inset-0 flex items-center justify-start`}>
        <div className="max-w-xl px-4 sm:px-8 md:px-16 text-white text-left">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 leading-tight drop-shadow-lg">
            {movieTitle}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed drop-shadow-md max-w-lg">
            {overview.length > 200
              ? `${overview.substring(0, 200)}...`
              : overview}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 sm:gap-4">
            <Link
              href={
                media_type === "movie"
                  ? `/MovieDetails/${movie.id || ""}`
                  : `/TvShowDetails/${movie.id || ""}`
              }
            >
              <button className="bg-white text-black px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-md font-bold text-sm sm:text-base md:text-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                <Play size={24} fill="currentColor" />
                Play
              </button>
            </Link>

            <button className="bg-gray-500/70 text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-md font-bold text-sm sm:text-base md:text-lg hover:bg-gray-500/50 transition-colors flex items-center gap-2 backdrop-blur-sm">
              <Info size={24} />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
