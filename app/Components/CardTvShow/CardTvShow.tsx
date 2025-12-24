import Image from "next/image";
import { Play, Plus, ThumbsUp, Info, Loader2 } from "lucide-react";
import NoImageFallback from "../NoImageFallback/NoImageFallback";
import Link from "next/link";
import { TvShowData } from "../../Types/types";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "@/Store/myListSlice";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import FetchTVDetails from "../../../Api/FetchTVDetails";
import toast from "react-hot-toast";

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

type CardTvShowProps = {
  TvShow: TvShowData;
};

export default function CardTvShow({ TvShow }: CardTvShowProps) {
  const dispatch = useDispatch();
  const myList: MyListItem[] = useSelector((state: { myList: MyListItem[] }) => state.myList);

  const isInList = myList.some((item) => item.id === TvShow.id);
  const [isOpen, setIsOpen] = useState(false);
  const [tvDetails, setTvDetails] = useState<TvDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [addingToList, setAddingToList] = useState(false);

  const handleAddToList = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddingToList(true);

    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (isInList) {
      dispatch(removeFromList(TvShow.id));
      toast.success(`${TvShow.name} removed from My List`, {
        duration: 2000,
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151',
        },
      });
    } else {
      dispatch(addToList(TvShow));
      toast.success(`${TvShow.name} added to My List`, {
        duration: 2000,
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151',
        },
      });
    }

    setAddingToList(false);
  };

  const handleMoreInfo = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const details = await FetchTVDetails({ id: TvShow.id!.toString() });
      setTvDetails(details);
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching TV show details:", error);
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <>
    <div
      onClick={() => window.location.href = `/TvShowDetails/${TvShow.id}`}
      className="relative bg-zinc-900 rounded-sm overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10"
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] w-full">
        {TvShow?.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${TvShow.poster_path}`}
            alt={TvShow.name || "TV Show Poster"}
            fill
            className="object-cover"
            quality={75}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
        ) : (
          <NoImageFallback text="No Image Available" />
        )}
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        {/* Title */}
        <h3 className="text-white text-lg font-bold mb-2 leading-tight">
          {TvShow?.name}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
          {TvShow.overview ? truncateText(TvShow.overview, 120) : "No description available."}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Play Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/TvShowDetails/${TvShow.id}`;
              }}
              aria-label="Play TV show"
              className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors"
            >
              <Play size={20} fill="currentColor" />
            </button>

            {/* Add to My List */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToList(e);
              }}
              disabled={addingToList}
              aria-label={isInList ? "Remove from My List" : "Add to My List"}
              className="border-2 border-gray-400 text-white rounded-full p-2 hover:border-white transition-colors disabled:opacity-50"
            >
              {addingToList ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Plus size={20} className={isInList ? "rotate-45" : ""} />
              )}
            </button>

            {/* Like */}
            <button
              onClick={(e) => e.stopPropagation()}
              aria-label="Like TV show"
              className="border-2 border-gray-400 text-white rounded-full p-2 hover:border-white transition-colors"
            >
              <ThumbsUp size={20} />
            </button>
          </div>

          {/* More Info */}
          <button
            onClick={handleMoreInfo}
            disabled={loading}
            aria-label="More info"
            className="border-2 border-gray-400 text-white rounded-full p-2 hover:border-white transition-colors disabled:opacity-50"
          >
            <Info size={20} />
          </button>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
          {TvShow.first_air_date && (
            <span>{new Date(TvShow.first_air_date).getFullYear()}</span>
          )}
          {TvShow.adult && (
            <span className="border border-gray-400 px-1 py-0.5 rounded text-xs">18+</span>
          )}
        </div>
      </div>
    </div>

    {/* TV Show Details Modal */}
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                quality={90}
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
                  onClick={() => setIsOpen(false)}
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
    </>
  );
}
