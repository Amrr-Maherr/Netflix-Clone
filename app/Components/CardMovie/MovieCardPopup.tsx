import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Play, Plus, ThumbsUp, Info, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "@/Store/myListSlice";
import { MovieData } from "@/Types/Movie";

type MyListItem = MovieData | { id: number; title?: string; name?: string; poster_path?: string; };

interface MovieDetailsType {
  title?: string;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  genres?: { name: string }[];
  release_date?: string;
  runtime?: number;
  production_companies?: { name: string }[];
  backdrop_path?: string;
  poster_path?: string;
}

interface MovieCardPopupProps {
  isOpen: boolean;
  onClose: () => void;
  movie: MovieData;
  movieDetails: MovieDetailsType | null;
  isInList: boolean;
  handleAddToList: (e: React.MouseEvent) => Promise<void>;
  addingToList: boolean;
}

export default function MovieCardPopup({
  isOpen,
  onClose,
  movie,
  movieDetails,
  isInList,
  handleAddToList,
  addingToList
}: MovieCardPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-5xl w-full max-h-[90vh] p-0 bg-zinc-900 border-none overflow-hidden rounded-sm">
        <DialogTitle className="sr-only">
          {movieDetails?.title || movie?.title}
        </DialogTitle>

        <div className="relative w-full h-full flex flex-col md:flex-row">
          {/* Backdrop Image */}
          {(movieDetails?.backdrop_path ||
            movieDetails?.poster_path ||
            movie?.poster_path) && (
            <div className="relative w-full h-48 md:h-auto md:w-2/5 flex-shrink-0">
              <Image
                src={`https://image.tmdb.org/t/p/w1280${movieDetails?.backdrop_path || movieDetails?.poster_path || movie?.poster_path}`}
                alt={movieDetails?.title || movie?.title || "Movie Backdrop"}
                fill
                className="object-cover"
                quality={100}
                placeholder="blur"
                blurDataURL="/Netflix_Symbol_RGB.png"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/70 to-transparent md:bg-gradient-to-t"></div>
            </div>
          )}

          {/* Content */}
          <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col overflow-y-auto text-white">
            {/* Top Section - Title and Meta */}
            <div className="flex-1 min-h-0">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
                {movieDetails?.title || movie?.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-gray-300">
                {movieDetails?.vote_average && (
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={14} className="text-yellow-400" />
                    <span>{movieDetails.vote_average.toFixed(1)}</span>
                  </div>
                )}

                {movieDetails?.release_date && (
                  <span>{new Date(movieDetails.release_date).getFullYear()}</span>
                )}

                {movieDetails?.runtime && (
                  <span>{movieDetails.runtime} min</span>
                )}

                {movie.adult && (
                  <span className="border border-gray-400 px-1.5 py-0.5 rounded text-xs">18+</span>
                )}
              </div>

              {/* Genres */}
              {movieDetails?.genres && movieDetails.genres.length > 0 && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-600/80 text-white border border-red-500/50">
                    {movieDetails.genres[0].name}
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
                {movieDetails?.overview ||
                  movie?.overview ||
                  "No description available."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToList(e);
                }}
                disabled={addingToList}
                className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white py-2.5 px-3 rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
              >
                {addingToList ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Plus size={14} />
                )}
                <span>{isInList ? "In My List" : "Add to List"}</span>
              </button>

              <Link href={`/MovieDetails/${movie.id}`}>
                <button
                  onClick={onClose}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 px-3 rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  <Play size={14} fill="currentColor" />
                  <span>Play</span>
                </button>
              </Link>

              <button
                onClick={onClose}
                className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white py-2.5 px-3 rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm"
              >
                <Info size={14} />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}