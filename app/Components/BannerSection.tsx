"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Calendar, Star } from "lucide-react";
import { DataTypes } from "../Types/types";

interface BannerSectionProps {
  movie: DataTypes;
  isReversed?: boolean;
}

export default function BannerSection({ movie, isReversed = false }: BannerSectionProps) {
  const movieTitle = (movie as any).title || (movie as any).name || "Unknown Title";
  const overview = movie.overview || "No description available.";
  const backdropPath = `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path || ''}`;
  const releaseDate = (movie as any).release_date || (movie as any).first_air_date;

  const content = (
    <div className={`relative rounded-lg overflow-hidden w-full h-[600px] md:h-dvh ${isReversed ? 'flex-row-reverse' : ''}`}>
      <Image
        src={backdropPath}
        alt={movieTitle}
        fill
        className="object-cover"
        quality={75}
        priority
      />
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

      <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-8 md:right-8 text-white z-10">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">{movieTitle}</h1>
        <p className="text-base md:text-lg max-w-2xl mb-6 drop-shadow-md leading-relaxed">{overview.substring(0, 150) + (overview.length > 150 ? "..." : "")}</p>
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <span className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full">
            <Star size={16} className="text-yellow-400" />
            {movie.vote_average != null ? movie.vote_average.toFixed(1) : "N/A"}
          </span>
          {releaseDate && (
            <span className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full">
              <Calendar size={16} />
              {new Date(releaseDate).getFullYear()}
            </span>
          )}
        </div>
        <Link
          href={`/MovieDetails/${movie.id}`}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 drop-shadow-lg"
        >
          <PlayCircle size={24} />
          Watch Now
        </Link>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:my-12 my-4">
      {content}
    </div>
  );
}
