import Image from "next/image";
import { Plus, Loader2, Play } from "lucide-react";
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
import Link from "next/link";
import { MovieData } from "../../Types/types";

type MyListItem = MovieData | { id: number; title?: string; name?: string; poster_path?: string; };

interface MovieDetailsType {
  title?: string;
  overview?: string;
  vote_average?: number;
  vote_count?: number;
  genres?: { name: string }[];
  release_date?: string;
  runtime?: number;
  production_companies?: { name: string; logo_path?: string; origin_country?: string }[];
  backdrop_path?: string;
  poster_path?: string;
}

type MoviePopupProps = {
  movie: MovieData;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  movieDetails: MovieDetailsType | null;
  loading: boolean;
};

export default function MoviePopup({ movie, isOpen, setIsOpen, movieDetails, loading }: MoviePopupProps) {
  const dispatch = useDispatch();
  const myList: MyListItem[] = useSelector((state: { myList: MyListItem[] }) => state.myList);

  const isInList = myList.some((item) => item.id === movie.id);
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

  return (
    <>
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
                      {movieDetails.genres.map((genre) => genre.name).join(", ")}
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
                      {movieDetails.production_companies.slice(0, 3).map((company) => company.name).join(", ")}
                      {movieDetails.production_companies.length > 3 && "..."}
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Link href={`/MovieDetails/${movie.id}`}>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    <Play size={20} fill="currentColor" />
                    Play
                  </button>
                </Link>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToList(e);
                  }}
                  disabled={addingToList}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  {addingToList ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Plus size={20} />
                  )}
                  {isInList ? 'Remove from List' : 'Add to List'}
                </button>

                {/* Like Button - Commented out as per user's preference */}
                {/* <button
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <ThumbsUp size={20} />
                  Like
                </button> */}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Export the handleMoreInfo function or use a ref to trigger it from parent
export const useMoviePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMoreInfo = async (movie: MovieData) => {
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

  return {
    isOpen,
    setIsOpen,
    movieDetails,
    loading,
    handleMoreInfo,
  };
};
