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
    <div className={`container py-5 md:py-16 px-8 rounded-lg overflow-hidden relative ${isReversed ? 'flex-row-reverse' : ''}`}>
      <div className="relative w-full h-96">
        <Image
          src={backdropPath}
          alt={movieTitle}
          fill
          className="object-cover rounded-lg"
          quality={75}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg"></div>
      </div>

      <div className="absolute bottom-8 left-15 right-8 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{movieTitle}</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6">{overview.substring(0, 200) + "..."}</p>
        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          <span className="flex items-center gap-1">
            <Star size={14} className="text-yellow-400" />
            {movie.vote_average != null ? movie.vote_average.toFixed(1) : "N/A"}
          </span>
          {releaseDate && (
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(releaseDate).getFullYear()}
            </span>
          )}
        </div>
        <Link
          href={`/MovieDetails/${movie.id}`}
          className=" bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded font-semibold transition flex items-center gap-2 w-fit cursor-pointer"
        >
          <PlayCircle size={26} />
          Watch Now
        </Link>
      </div>
    </div>
  );

  return (
    <div className="md:my-12 my-4">
      {content}
    </div>
  );
}
