"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import NoImageFallback from "@/app/Components/NoImageFallback/NoImageFallback";
import NetflixBadge from "@/app/Components/shared/NetflixBadge";

type SeasonCardProps = {
  season: any;
  tvId: string;
};

export default function SeasonCard({ season, tvId }: SeasonCardProps) {
  const imageUrl = season.poster_path
    ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
    : null;

  return (
    <Link href={`/SeasonDetails/${tvId}/${season.season_number}`}>
      <div className="group relative rounded-xl overflow-hidden bg-zinc-900 transition-transform duration-300">
        {/* Netflix Logo */}
        <NetflixBadge size={40} className="drop-shadow-md" />

        {/* Poster or fallback */}
        <div className="relative w-full aspect-[2/3]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={season.name}
              fill
              className="object-cover transition-transform duration-500"
              quality={100}
              placeholder="blur"
              blurDataURL="/Netflix_Symbol_RGB.png"
            />
          ) : (
            <NoImageFallback text="No Image Available" />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Season info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
          <h3 className="text-lg font-semibold">{season.name}</h3>
          <p className="text-gray-400 text-sm">
            {season.air_date ? new Date(season.air_date).getFullYear() : "—"} •{" "}
            {season.episode_count} Ep
            {season.episode_count > 1 && "s"}
          </p>

          {season.vote_average > 0 && (
            <p className="text-yellow-400 font-semibold text-sm flex items-center gap-1">
              <Star className="w-4 h-4" />
              {season.vote_average.toFixed(1)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
