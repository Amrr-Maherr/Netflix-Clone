import Image from "next/image";
import { Play, Plus, ThumbsUp, Info, Loader2 } from "lucide-react";
import NoImageFallback from "../NoImageFallback/NoImageFallback";
import Link from "next/link";
import { MovieData } from "../../Types/types";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "@/Store/myListSlice";
import { useState } from "react";
import FetchMovieDetails from "../../../Api/FetchMovieDetails";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import MovieCardPopup from "./MovieCardPopup";

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

type CardMovieProps = {
  movie: MovieData;
};

export default function CardMovie({ movie }: CardMovieProps) {
  const dispatch = useDispatch();
  const myList: MyListItem[] = useSelector((state: { myList: MyListItem[] }) => state.myList);
  const router = useRouter();

  const isInList = myList.some((item) => item.id === movie.id);
  const [isOpen, setIsOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
  const [addingToList, setAddingToList] = useState(false);

  const handleAddToList = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setAddingToList(true);

    // Add a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (isInList) {
      dispatch(removeFromList(movie.id));
      toast.success(`${movie.title} removed from My List`, {
        duration: 2000,
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151',
        },
      });
    } else {
      dispatch(addToList(movie));
      toast.success(`${movie.title} added to My List`, {
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
      const details = await FetchMovieDetails({ id: movie.id.toString() });
      setMovieDetails(details);
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
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
      onClick={() => router.push(`/MovieDetails/${movie.id}`)}
      className="relative bg-zinc-900 rounded-sm overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10"
      >
        <div className="absolute top-3 left-3 z-50">
                  <Image
                    width={40}
                    height={40}
                    src="/Netflix_Symbol_RGB.png"
                    alt="Netflix Logo"
                    priority
                    className="drop-shadow-md"
                  />
                </div>
      {/* Poster Image */}
      <div className="relative aspect-[2/3] w-full">
        {movie?.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || "Movie Poster"}
            fill
            className="object-cover"
            quality={100}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            placeholder="blur"
            blurDataURL="/images/Netflix_Symbol_RGB.png"
            priority
          />
        ) : (
          <NoImageFallback text="No Image Available" />
        )}
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        {/* Title */}
        <h3 className="text-white text-lg font-bold mb-2 leading-tight">
          {movie?.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
          {movie.overview ? truncateText(movie.overview, 120) : "No description available."}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Play Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/MovieDetails/${movie.id}`);
              }}
              aria-label="Play movie"
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
              aria-label="Like movie"
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
          {movie.release_date && (
            <span>{new Date(movie.release_date).getFullYear()}</span>
          )}
          {movie.adult && (
            <span className="border border-gray-400 px-1 py-0.5 rounded text-xs">18+</span>
          )}
        </div>
      </div>
    </div>

    <MovieCardPopup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      movie={movie}
      movieDetails={movieDetails}
      isInList={isInList}
      handleAddToList={handleAddToList}
      addingToList={addingToList}
    />
    </>
  );
}
