import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Play, Plus, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "@/Store/myListSlice";
import { TvShowData } from "@/app/Data/TvShowData";

type MyListItem = TvShowData | { id: number; title?: string; name?: string; poster_path?: string; };

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
  addingToList
}: TVCardPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none overflow-hidden">
        <DialogTitle className="sr-only">{tvDetails?.name || TvShow?.name}</DialogTitle>
        <div className="relative min-h-[60vh] flex flex-col md:flex-row">
          {/* Backdrop Image */}
          {(tvDetails?.backdrop_path || tvDetails?.poster_path || TvShow?.poster_path) && (
            <div className="absolute inset-0">
              <Image
                src={`https://image.tmdb.org/t/p/w1280${tvDetails?.backdrop_path || tvDetails?.poster_path || TvShow?.poster_path}`}
                alt={tvDetails?.name || TvShow?.name || "TV Show Backdrop"}
                fill
                className="object-cover"
                quality={100}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          )}

          {/* Content Overlay */}
          <div className="relative z-10 flex-1 p-6 md:p-8 flex flex-col justify-end text-white">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {tvDetails?.name || TvShow?.name}
            </h1>

            {/* Description */}
            <p className="text-gray-200 text-lg mb-6 leading-relaxed max-w-2xl">
              {tvDetails?.overview || TvShow?.overview || "No description available."}
            </p>

            {/* TV Show Details */}
            <div className="space-y-3 mb-8">
              {/* Rating */}
              {tvDetails?.vote_average && (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-300">Rating:</span>
                  <span className="text-yellow-400 font-bold text-lg">
                    {tvDetails.vote_average.toFixed(1)} / 10
                  </span>
                  <span className="text-gray-400 text-sm">
                    ({tvDetails.vote_count?.toLocaleString()} votes)
                  </span>
                </div>
              )}

              {/* Genre */}
              {tvDetails?.genres && tvDetails.genres.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-300">Genre:</span>
                  <span className="text-white">
                    {tvDetails.genres.map((genre: any) => genre.name).join(", ")}
                  </span>
                </div>
              )}

              {/* First Air Date & Seasons/Episodes */}
              <div className="flex items-center gap-6">
                {tvDetails?.first_air_date && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-300">First Air:</span>
                    <span className="text-white">
                      {new Date(tvDetails.first_air_date).getFullYear()}
                    </span>
                  </div>
                )}
                {tvDetails?.number_of_seasons && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-300">Seasons:</span>
                    <span className="text-white">{tvDetails.number_of_seasons}</span>
                  </div>
                )}
                {tvDetails?.number_of_episodes && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-300">Episodes:</span>
                    <span className="text-white">{tvDetails.number_of_episodes}</span>
                  </div>
                )}
              </div>

              {/* Production Companies */}
              {tvDetails?.production_companies && tvDetails.production_companies.length > 0 && (
                <div className="flex items-start gap-3">
                  <span className="text-sm font-medium text-gray-300">Production:</span>
                  <span className="text-white text-sm">
                    {tvDetails.production_companies.slice(0, 3).map((company: any) => company.name).join(", ")}
                    {tvDetails.production_companies.length > 3 && "..."}
                  </span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToList(e);
                }}
                disabled={addingToList}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {addingToList ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Plus size={16} />
                )}
                {isInList ? 'Remove from List' : 'Add to List'}
              </button>

              <Link href={`/TvShowDetails/${TvShow.id}`}>
                <button
                  onClick={onClose}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}