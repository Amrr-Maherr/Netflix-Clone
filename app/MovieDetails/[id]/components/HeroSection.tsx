"use client";
import Image from "next/image";
import { Star, Clock, Calendar, Globe, Play, ExternalLink } from "lucide-react";

interface HeroSectionProps {
  movie?: any;
  tv?: any;
  backdropUrl: string | null;
  posterUrl: string;
  trailer: any;
}

export default function HeroSection({
  movie,
  tv,
  backdropUrl,
  posterUrl,
  trailer,
}: HeroSectionProps) {
  const data = movie || tv;
  const trailerKey = trailer?.key;
  const title = data.title || data.name;
  const tagline = data.tagline;
  const date = data.release_date || data.first_air_date;
  const runtime =
    data.runtime ||
    (Array.isArray(data.episode_run_time) ? data.episode_run_time[0] : null);

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] bg-black overflow-hidden">
      {/* Trailer Video */}
      {trailerKey ? (
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&playlist=${trailerKey}&controls=0&modestbranding=1&showinfo=0`}
            title="Trailer"
            className="absolute inset-0 w-full h-full object-cover"
            allow="autoplay; fullscreen"
          ></iframe>
        </div>
      ) : (
        backdropUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          ></div>
        )
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-end">
          {/* Poster */}
          <div className="relative w-48 h-72 md:w-64 md:h-96 shadow-2xl rounded-lg overflow-hidden border border-gray-700 transform transition hover:scale-105 hidden md:block">
            <Image src={posterUrl} alt={title} fill className="object-cover" />
          </div>

          {/* Info */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-2 drop-shadow-lg">
              {title}
            </h1>
            {tagline && (
              <p className="text-lg md:text-xl text-gray-300 mb-4 italic drop-shadow">
                {tagline}
              </p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base mb-4">
              {data.vote_average && (
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span>
                    {data.vote_average.toFixed(1)} ({data.vote_count} votes)
                  </span>
                </div>
              )}
              {date && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(date).toLocaleDateString()}</span>
                </div>
              )}
              {runtime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-5 h-5" />
                  <span>{runtime} min</span>
                </div>
              )}
              {data.spoken_languages?.length > 0 && (
                <div className="flex items-center gap-1">
                  <Globe className="w-5 h-5" />
                  <span>{data.spoken_languages[0]?.name ?? "Unknown"}</span>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-4 flex gap-3">
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105"
                >
                  <Play className="w-5 h-5" />
                  Watch Trailer
                </a>
              )}
              {data.homepage && (
                <a
                  href={data.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition transform hover:scale-105"
                >
                  <ExternalLink className="w-5 h-5" />
                  Official Site
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
