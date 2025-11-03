"use client";
import Image from "next/image";
import { Star, Clock, Calendar } from "lucide-react";

export default function EpisodeDetailsSection({ episode }: { episode: any }) {
  const stillUrl = episode.still_path
    ? `https://image.tmdb.org/t/p/w1280${episode.still_path}`
    : "/placeholder-image.jpg";

  return (
    <section className="relative w-full rounded-2xl overflow-hidden bg-black">
      <div className="relative h-[70vh] w-full">
        <Image
          src={stillUrl}
          alt={episode.name}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute bottom-10 left-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            {episode.name}
          </h1>
          <p className="text-gray-300 mb-4 text-lg">
            Season {episode.season_number} • Episode {episode.episode_number}
          </p>
          <p className="text-gray-300 leading-relaxed line-clamp-4">
            {episode.overview || "No overview available."}
          </p>

          <div className="flex flex-wrap items-center gap-5 text-gray-400 mt-6 text-sm">
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              {episode.vote_average?.toFixed(1) || "N/A"}{" "}
              <span className="text-gray-500">
                ({episode.vote_count || 0} votes)
              </span>
            </span>
            {episode.runtime && (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {episode.runtime} min
              </span>
            )}
            {episode.air_date && (
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(episode.air_date).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
