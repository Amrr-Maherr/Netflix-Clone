import React from "react";
import { MovieData } from "../Types/types";
import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, Play } from "lucide-react";

interface BentoCardProps {
  movie: MovieData;
  className?: string;
}

export default function BentoCard({ movie, className }: BentoCardProps) {
  console.log(movie, "movie");
  
  return (
    <Link
      href={`/MovieDetails/${movie.id}`}
      className={`relative block group overflow-hidden rounded-3xl bg-black border border-red-900 ${className} hover:border-red-600 transition-colors`}
    >
      <div className="absolute inset-0 w-full h-full">
        {movie.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title || "Movie Poster"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500">
            No Image
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Play Icon */}
      <div className="absolute top-4 right-4 bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Play size={16} className="text-white" />
      </div>

      <div className="absolute bottom-0 left-0 p-4 w-full flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 bg-black/80 text-yellow-400 text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
            <Star size={12} fill="currentColor" />
            {movie.vote_average != null ? movie.vote_average.toFixed(1) : "N/A"}
          </div>
          {movie.release_date && (
            <div className="flex items-center gap-1 text-zinc-300 text-xs">
              <Calendar size={12} />
              {new Date(movie.release_date).getFullYear()}
            </div>
          )}
        </div>

        <h3 className="text-white font-bold text-sm md:text-lg leading-tight line-clamp-1 drop-shadow-md">
          {movie.title}
        </h3>

        <p className="text-zinc-300 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 md:block hidden">
          {movie.overview?.substring(0, 100)}...
        </p>
      </div>
    </Link>
  );
}
