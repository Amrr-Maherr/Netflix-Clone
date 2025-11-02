import Image from "next/image";
import { Star, Clock, Calendar, Globe, Play, ExternalLink } from "lucide-react";

interface HeroSectionProps {
  movie: any;
  backdropUrl: string | null;
  posterUrl: string;
  trailer: any;
}

export default function HeroSection({
  movie,
  backdropUrl,
  posterUrl,
  trailer,
}: HeroSectionProps) {
  return (
    <>
      {backdropUrl && (
        <div
          className="relative w-full h-[70vh] md:h-[80vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/80 to-transparent"></div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-end">
              <div className="relative w-48 h-72 md:w-64 md:h-96 shadow-2xl rounded-lg overflow-hidden border border-gray-700">
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-4xl md:text-6xl font-bold mb-2">
                  {movie.title}
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-4 italic">
                  {movie.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span>
                      {movie.vote_average.toFixed(1)} ({movie.vote_count} votes)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-5 h-5" />
                    <span>
                      {new Date(movie.release_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-5 h-5" />
                    <span>{movie.runtime} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-5 h-5" />
                    <span>{movie.spoken_languages[0]?.name ?? "Unknown"}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  {trailer && (
                    <a
                      href={`https://www.youtube.com/watch?v=${trailer.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-semibold transition"
                    >
                      <Play className="w-5 h-5" />
                      Watch Trailer
                    </a>
                  )}
                  {movie.homepage && (
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-5 py-3 rounded-lg font-semibold transition"
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
      )}
    </>
  );
}
