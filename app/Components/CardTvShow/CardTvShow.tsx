import Image from "next/image";
import { Play, Plus, ThumbsUp, Info, Loader2, Clock, TrendingUp, Globe } from "lucide-react";
import NoImageFallback from "../NoImageFallback/NoImageFallback";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "@/Store/myListSlice";
import { useState } from "react";
import FetchTVDetails from "../../../Api/FetchTVDetails";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import TVCardPopup from "./TVCardPopup";
import NetflixBadge from "../shared/NetflixBadge";
import { TvShowData } from "@/Types/TvShow";

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
  const router = useRouter();

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
      const details = await FetchTVDetails({ id: TvShow.id.toString() });
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
        onClick={() => router.push(`/TvShowDetails/${TvShow.id}`)}
        className="relative bg-zinc-900 rounded-sm overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10"
      >
        <NetflixBadge size={40} className="drop-shadow-md" />
        {/* Poster Image */}
        <div className="relative aspect-[2/3] w-full">
          {TvShow?.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${TvShow.poster_path}`}
              alt={TvShow.name || "TV Show Poster"}
              fill
              className="object-cover"
              quality={100}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              placeholder="blur"
              blurDataURL="/Netflix_Symbol_RGB.png"
              priority
            />
          ) : (
            <NoImageFallback text="No Image Available" />
          )}
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          {/* Bottom Section - Always Visible */}
          <div className="space-y-2">
            {/* Title - Always Visible */}
            <h3 className="text-sm font-bold leading-tight line-clamp-2 text-white transition-colors">
              {TvShow?.name}
            </h3>

            {/* Genre Badge */}
            {TvShow?.genres && TvShow.genres.length > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-600/80 text-white border border-red-500/50">
                {TvShow.genres[0].name}
              </span>
            )}

            {/* Episodes, Popularity, and Language Indicators */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Episode Count */}
              {TvShow?.number_of_episodes && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs text-gray-300 bg-black/40 border border-gray-600/30">
                  <Clock size={10} className="mr-1" />
                  {TvShow.number_of_episodes} Ep
                </span>
              )}
              
              {/* Popularity Score */}
              {TvShow?.popularity && TvShow.popularity > 0 && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs text-gray-300 bg-black/40 border border-gray-600/30">
                  <TrendingUp size={10} className="mr-1" />
                  {Math.round(TvShow.popularity)}
                </span>
              )}
              
              {/* Language Flag */}
              {TvShow?.original_language && (
                <span className="inline-flex items-center px-2 py-1 rounded text-xs text-gray-300 bg-black/40 border border-gray-600/30">
                  <Globe size={10} className="mr-1" />
                  {TvShow.original_language.toUpperCase()}
                </span>
              )}
            </div>

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
                    router.push(`/TvShowDetails/${TvShow.id}`);
                  }}
                  aria-label="Play TV show"
                  className="bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/30 transition-colors border border-white/30"
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
                  className="border-2 border-white/50 text-white rounded-full p-2 hover:border-white/80 transition-colors disabled:opacity-50 backdrop-blur-sm bg-black/20"
                >
                  {addingToList ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Plus size={20} className={isInList ? "rotate-45" : ""} />
                  )}
                </button>
              </div>

              {/* More Info */}
              <button
                onClick={handleMoreInfo}
                disabled={loading}
                aria-label="More info"
                className="border-2 border-white/50 text-white rounded-full p-2 hover:border-white/80 transition-colors disabled:opacity-50 backdrop-blur-sm bg-black/20"
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
      </div>

      <TVCardPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        TvShow={TvShow}
        tvDetails={tvDetails}
        isInList={isInList}
        handleAddToList={handleAddToList}
        addingToList={addingToList}
      />
    </>
  );
}
