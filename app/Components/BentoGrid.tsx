"use client";
import React from "react";
import { MovieData } from "../Data/MovieData";
import Image from "next/image";
import Link from "next/link";

interface BentoGridProps {
  movies: MovieData[];
}

interface BentoCardProps {
  movie: MovieData;
}

const BentoCard = ({ movie }: BentoCardProps) => {
  return (
    <Link href={`/MovieDetails/${movie.id}`}>
      <div className="relative bg-zinc-900 rounded-lg overflow-hidden h-full group cursor-pointer transform transition-all duration-300 hover:scale-105">
        {/* Image */}
        <div className="relative w-full h-full min-h-[200px]">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || "Movie Poster"}
              fill
              className="object-cover"
              quality={75}
            />
          ) : null}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3">
          <h3 className="text-white font-semibold text-sm md:text-base leading-tight truncate">
            {movie.title}
          </h3>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
          ⭐ {movie.vote_average != null ? movie.vote_average.toFixed(1) : "N/A"}
        </div>
      </div>
    </Link>
  );
};

export default function BentoGrid({ movies }: BentoGridProps) {
  const selectedMovies = movies.slice(0, 5);

  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-6 w-full max-w-5xl mx-auto h-[500px] md:h-[600px]">
      {/* Large card 1 - spans 2 columns */}
      <div className="col-span-2 row-span-1">
        {selectedMovies[0] && <BentoCard movie={selectedMovies[0]} />}
      </div>

      {/* Small card 1 */}
      <div className="col-span-1 row-span-1">
        {selectedMovies[1] && <BentoCard movie={selectedMovies[1]} />}
      </div>

      {/* Small card 2 */}
      <div className="col-span-1 row-span-1">
        {selectedMovies[2] && <BentoCard movie={selectedMovies[2]} />}
      </div>

      {/* Large card 2 - spans 2 columns */}
      <div className="col-span-2 row-span-1">
        {selectedMovies[3] && <BentoCard movie={selectedMovies[3]} />}
      </div>

      {/* Small card 3 */}
      <div className="col-span-1 row-span-1">
        {selectedMovies[4] && <BentoCard movie={selectedMovies[4]} />}
      </div>

      {/* Small card 4 */}
      <div className="col-span-1 row-span-1">
        {selectedMovies[5] && <BentoCard movie={selectedMovies[5]} />}
      </div>
      
    </div>
  );
}
