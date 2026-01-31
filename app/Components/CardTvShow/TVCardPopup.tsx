import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Play, Plus, ThumbsUp, Info, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "@/Store/myListSlice";
import { TvShowData } from "@/Types/TvShow";

type MyListItem =
  | TvShowData
  | { id: number; title?: string; name?: string; poster_path?: string };

interface TvDetailsType {
  name?: string;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  genres?: { name: string }[];
  first_air_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  production_companies?: { name: string }[];
  backdrop_path?: string;
  poster_path?: string;
}

interface TVCardPopupProps {
  isOpen: boolean;
  onClose: () => void;
  TvShow: TvShowData;
  tvDetails: TvDetailsType | null;
  isInList: boolean;
  handleAddToList: (e: React.MouseEvent) => Promise<void>;
  addingToList: boolean;
}

export default function TVCardPopup({
  isOpen,
  onClose,
  TvShow,
  tvDetails,
  isInList,
  handleAddToList,
  addingToList,
}: TVCardPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-5xl w-full max-h-[90vh] p-0 bg-zinc-900 border-none overflow-hidden rounded-sm">
        <DialogTitle className="sr-only">
          {tvDetails?.name || TvShow?.name}
        </DialogTitle>

        <div className="relative w-full h-full flex flex-col md:flex-row">
          {/* Backdrop Image */}
          {(tvDetails?.backdrop_path ||
            tvDetails?.poster_path ||
            TvShow?.poster_path) && (
            <div className="relative w-full h-48 md:h-auto md:w-2/5 flex-shrink-0">
              <Image
                src={`https://image.tmdb.org/t/p/w1280${tvDetails?.backdrop_path || tvDetails?.poster_path || TvShow?.poster_path}`}
                alt={tvDetails?.name || TvShow?.name || "TV Show Backdrop"}
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
                {tvDetails?.name || TvShow?.name}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-gray-300">
                {tvDetails?.vote_average && (
                  <div className="flex items-center gap-1">
                    <ThumbsUp size={14} className="text-yellow-400" />
                    <span>{tvDetails.vote_average.toFixed(1)}</span>
                  </div>
                )}

                {tvDetails?.first_air_date && (
                  <span>
                    {new Date(tvDetails.first_air_date).getFullYear()}
                  </span>
                )}

                {tvDetails?.number_of_seasons && (
                  <span>{tvDetails.number_of_seasons} Seasons</span>
                )}

                {tvDetails?.number_of_episodes && (
                  <span>{tvDetails.number_of_episodes} Episodes</span>
                )}

                {TvShow.adult && (
                  <span className="border border-gray-400 px-1.5 py-0.5 rounded text-xs">
                    18+
                  </span>
                )}
              </div>

              {/* Genres */}
              {tvDetails?.genres && tvDetails.genres.length > 0 && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-600/80 text-white border border-red-500/50">
                    {tvDetails.genres[0].name}
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
                {tvDetails?.overview ||
                  TvShow?.overview ||
                  "No description available."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToList(e);
                }}
                disabled={addingToList}
                className="flex-1 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white py-3 px-4 rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {addingToList ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Plus size={16} />
                )}
                <span>{isInList ? "In My List" : "Add to List"}</span>
              </button>

              <Link href={`/TvShowDetails/${TvShow.id}`}>
                <button
                  onClick={onClose}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Play size={16} fill="currentColor" />
                  <span>Play</span>
                </button>
              </Link>

              <button
                onClick={onClose}
                className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white py-3 px-4 rounded-md font-semibold transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Info size={16} />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
