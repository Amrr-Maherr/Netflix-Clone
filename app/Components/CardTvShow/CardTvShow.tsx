import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TvShowData = {
  id: number;
  name: string;
  poster_path: string;
  vote_average?: number;
  popularity?: number;
  overview: string;
  first_air_date?: string;
};

type CardTvShowProps = {
  TvShow: TvShowData;
};

export default function CardTvShow({ TvShow }: CardTvShowProps) {
  return (
    <Link href={`/TvShowDetails/${TvShow.id}`}>
      <div className="bg-black rounded overflow-hidden relative group cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        {/* Poster */}
        <div className="relative w-full h-0 pb-[150%]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${TvShow.poster_path}`}
            alt={TvShow.name}
            fill
            className="object-cover rounded"
            quality={100}
            loading="lazy"
          />
        </div>

        {/* Info under image */}
        {/* <div className="p-2">
        <h3 className="text-white mt-2 text-sm font-medium truncate">
          {TvShow.name}
        </h3>
        <p className="text-gray-400 text-xs my-1">
          Vote Average: {TvShow.vote_average?.toFixed(1)}
        </p>
      </div> */}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-80 text-white p-3 opacity-0 group-hover:opacity-95 transition-all duration-300 flex flex-col justify-end rounded">
          <h3 className="text-sm font-semibold truncate">{TvShow.name}</h3>
          <p className="text-gray-300 text-xs mt-1">
            First Air Date: {TvShow.first_air_date || "Unknown"}
          </p>
          {TvShow.popularity && (
            <p className="text-gray-400 text-xs mt-1">
              Popularity: {TvShow.popularity.toFixed(1)}
            </p>
          )}
          <p className="text-xs line-clamp-3 mt-2">{TvShow.overview}</p>
          <Button className="mt-2 bg-red-600 text-white text-xs py-1 px-2 rounded hover:bg-red-700 cursor-pointer">
            Watch
          </Button>
        </div>
      </div>
    </Link>
  );
}
