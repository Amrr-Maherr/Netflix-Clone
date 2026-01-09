import Image from "next/image";
import { Play, Plus, ThumbsUp, Info, Loader2 } from "lucide-react";
import NoImageFallback from "../NoImageFallback/NoImageFallback";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MovieData } from "../../Types/types";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "@/Store/myListSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import MoviePopup, { useMoviePopup } from "./MoviePopup";

type MyListItem = MovieData | { id: number; title?: string; name?: string; poster_path?: string; };

type CardMovieProps = {
  movie: MovieData;
};

export default function CardMovie({ movie }: CardMovieProps) {
  const dispatch = useDispatch();
  const myList: MyListItem[] = useSelector((state: { myList: MyListItem[] }) => state.myList);

  const isInList = myList.some((item) => item.id === movie.id);
  const [addingToList, setAddingToList] = useState(false);
  const { isOpen, setIsOpen, movieDetails, loading, handleMoreInfo } = useMoviePopup();

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

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <>
    <Link href={`/MovieDetails/${movie.id}`}>
      <div
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
            <Button
              size="icon"
              variant="destructive"
              aria-label="Play movie"
              className="rounded-full"
            >
              <Play size={20} fill="currentColor" />
            </Button>

            {/* Add to My List */}
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToList(e);
              }}
              disabled={addingToList}
              aria-label={isInList ? "Remove from My List" : "Add to My List"}
              className="rounded-full bg-black/80 hover:bg-white/20 text-white border-none disabled:opacity-50"
            >
              {addingToList ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Plus size={20} className={isInList ? "rotate-45" : ""} />
              )}
            </Button>
          </div>

          {/* More Info */}
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => { e.stopPropagation(); handleMoreInfo(movie); }}
            disabled={loading}
            aria-label="More info"
            className="rounded-full bg-black/80 hover:bg-white/20 text-white border-none disabled:opacity-50"
          >
            <Info size={20} />
          </Button>
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
    </Link>

    <MoviePopup movie={movie} isOpen={isOpen} setIsOpen={setIsOpen} movieDetails={movieDetails} loading={loading} />
    </>
  );
}
