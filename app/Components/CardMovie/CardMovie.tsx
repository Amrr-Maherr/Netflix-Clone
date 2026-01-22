import Image from "next/image";
import { Play, Plus, ThumbsUp, Info, Loader2 } from "lucide-react";
import NoImageFallback from "../NoImageFallback/NoImageFallback";
import Link from "next/link";
import { MovieData } from "../../Types/types";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "@/Store/myListSlice";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import FetchMovieDetails from "../../../Api/FetchMovieDetails";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
      {/* Poster Image */}
      <div className="relative aspect-[2/3] w-full">
        {movie?.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title || "Movie Poster"}
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
    {/* Movie Details Modal */}
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none overflow-hidden">
        <DialogTitle className="sr-only">{movieDetails?.title || movie?.title}</DialogTitle>
        <div className="relative min-h-[60vh] flex flex-col md:flex-row">
          {/* Backdrop Image */}
          {(movieDetails?.backdrop_path || movieDetails?.poster_path || movie?.poster_path) && (
            <div className="absolute inset-0">
              <Image
                src={`https://image.tmdb.org/t/p/w1280${movieDetails?.backdrop_path || movieDetails?.poster_path || movie?.poster_path}`}
                alt={movieDetails?.title || movie?.title || "Movie Backdrop"}
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
              {movieDetails?.title || movie?.title}
            </h1>

            {/* Description */}
            <p className="text-gray-200 text-lg mb-6 leading-relaxed max-w-2xl">
              {movieDetails?.overview || movie?.overview || "No description available."}
            </p>

            {/* Movie Details */}
            <div className="space-y-3 mb-8">
              {/* Rating */}
              {movieDetails?.vote_average && (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-300">Rating:</span>
                  <span className="text-yellow-400 font-bold text-lg">
                    {movieDetails.vote_average.toFixed(1)} / 10
                  </span>
                  <span className="text-gray-400 text-sm">
                    ({movieDetails.vote_count?.toLocaleString()} votes)
                  </span>
                </div>
              )}

              {/* Genre */}
              {movieDetails?.genres && movieDetails.genres.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-300">Genre:</span>
                  <span className="text-white">
                    {movieDetails.genres.map((genre: any) => genre.name).join(", ")}
                  </span>
                </div>
              )}

              {/* Release Date & Runtime */}
              <div className="flex items-center gap-6">
                {movieDetails?.release_date && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-300">Release:</span>
                    <span className="text-white">
                      {new Date(movieDetails.release_date).getFullYear()}
                    </span>
                  </div>
                )}
                {movieDetails?.runtime && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-300">Runtime:</span>
                    <span className="text-white">{movieDetails.runtime} min</span>
                  </div>
                )}
              </div>

              {/* Production Companies */}
              {movieDetails?.production_companies && movieDetails.production_companies.length > 0 && (
                <div className="flex items-start gap-3">
                  <span className="text-sm font-medium text-gray-300">Production:</span>
                  <span className="text-white text-sm">
                    {movieDetails.production_companies.slice(0, 3).map((company: any) => company.name).join(", ")}
                    {movieDetails.production_companies.length > 3 && "..."}
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

              <Link href={`/MovieDetails/${movie.id}`}>
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
