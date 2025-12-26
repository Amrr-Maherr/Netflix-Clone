import Image from "next/image";
import { Plus, Loader2 } from "lucide-react";
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
        <DialogContent className="w-full p-0 bg-black border-none overflow-hidden max-h-[90vh]">
          <DialogTitle className="sr-only">{movieDetails?.title || movie?.title}</DialogTitle>
          <div className="flex flex-col lg:flex-row">
            {/* Backdrop Background */}
            {(movieDetails?.backdrop_path || movieDetails?.poster_path || movie?.poster_path) && (
              <div className="absolute inset-0">
                <Image
                  src={`https://image.tmdb.org/t/p/w1280${movieDetails?.backdrop_path || movieDetails?.poster_path || movie?.poster_path}`}
                  alt={movieDetails?.title || movie?.title || "Movie Backdrop"}
                  fill
                  className="object-cover"
                  quality={90}
                />
                <div className="absolute inset-0 bg-black/60"></div>
              </div>
            )}

            {/* Poster */}
            <div className="lg:w-1/3 flex-shrink-0 p-4 relative z-10">
              {(movieDetails?.poster_path || movie?.poster_path) ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path || movie?.poster_path}`}
                  alt={movieDetails?.title || movie?.title || "Movie Poster"}
                  width={300}
                  height={450}
                  className="w-full h-auto rounded-lg shadow-2xl"
                  quality={90}
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-gray-800 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>

            {/* Movie Information */}
            <div className="lg:w-2/3 flex flex-col justify-center p-6 text-white relative z-10">
              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                {movieDetails?.title || movie?.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                {movieDetails?.release_date && (
                  <span className="text-white font-semibold">
                    {new Date(movieDetails.release_date).getFullYear()}
                  </span>
                )}
                {movieDetails?.vote_average && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 font-bold">★</span>
                    <span className="text-white">
                      {movieDetails.vote_average.toFixed(1)}
                    </span>
                  </div>
                )}
                {movieDetails?.runtime && (
                  <span className="text-gray-300">
                    {movieDetails.runtime} min
                  </span>
                )}
              </div>

              {/* Genres */}
              {movieDetails?.genres && movieDetails.genres.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {movieDetails.genres.slice(0, 3).map((genre) => (
                      <span
                        key={genre.name}
                        className="px-3 py-1 bg-gray-700 text-white text-sm rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview */}
              <p className="text-gray-200 text-lg leading-relaxed mb-8 max-w-2xl">
                {movieDetails?.overview || movie?.overview || "No description available."}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToList(e);
                  }}
                  disabled={addingToList}
                  className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {addingToList ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Plus size={20} />
                  )}
                  {isInList ? "Remove from List" : "Add to List"}
                </button>

                <Link href={`/MovieDetails/${movie.id}`}>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
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
