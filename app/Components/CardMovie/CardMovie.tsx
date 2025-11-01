import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type MovieData = {
  id: number;
  title: string;
  name:string
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
};

type CardMovieProps = {
  movie: MovieData;
};

export default function CardMovie({ movie }: CardMovieProps) {
  return (
    <div className="bg-black rounded overflow-hidden relative group cursor-pointer">
      <div className="relative w-full h-0 pb-[150%]">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          fill
          className="object-cover rounded"
          quality={100}
          loading="lazy"
        />
      </div>

      {/* Info under image */}
      <div className="p-2">
        <h3 className="text-white mt-2 text-sm font-medium truncate">
          {movie.title}
        </h3>
        <p className="text-gray-400 text-xs my-2">{movie.release_date}</p>
        <p className="text-yellow-400 text-xs">⭐ {movie.vote_average}</p>
      </div>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-70 text-white p-2 opacity-0 group-hover:opacity-95 transition-all duration-300 flex flex-col justify-end rounded">
        <p className="text-xs line-clamp-3">{movie.overview}</p>
        <Button className="mt-2 bg-red-600 text-white text-xs py-1 px-2 rounded hover:bg-red-700 cursor-pointer">
          Watch
        </Button>
      </div>
    </div>
  );
}
