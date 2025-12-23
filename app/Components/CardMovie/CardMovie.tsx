import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star, Flame, Play, Clock } from "lucide-react";
import NoImageFallback from "../NoImageFallback/NoImageFallback";
import Logo from "../../../public/Netflix_Symbol_RGB.png";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { MovieData } from "../../Types/types";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type CardMovieProps = {
  movie: MovieData;
};

export default function CardMovie({ movie }: CardMovieProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (movie.poster_path || movie.backdrop_path) {
      setLightboxOpen(true);
    }
  };

  const slides = movie.poster_path || movie.backdrop_path ? [
    {
      src: `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`,
      alt: movie.title || "Movie Poster",
    },
  ] : [];

  return (
    <>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
      />
      <Dialog>
      {/* Card as trigger */}
      <DialogTrigger asChild>
        <div className="relative bg-zinc-900 rounded-md h-full overflow-hidden group cursor-pointer transform transition-all duration-500 hover:z-20">
          {/* Rating Badge */}
          <div className="absolute top-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 z-10">
            <Star size={12} className="text-yellow-400" />
            {movie.vote_average != null ? movie.vote_average.toFixed(1) : "N/A"}
          </div>

          {/* Trending Badge */}
          {movie.popularity != null && movie.popularity > 100 && (
            <div className="absolute top-11 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 z-10">
              <Flame size={12} className="text-yellow-400" />
              Trending
            </div>
          )}

          {/* Poster */}
          <div className="relative w-full h-0 pb-[150%]">
            <div className="absolute top-0 z-50">
              <Image width={50} height={50} src={Logo.src} alt="" />
            </div>

            {movie?.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || "Movie Poster"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                quality={75}
              />
            ) : (
              <NoImageFallback text="No Image Available" />
            )}
          </div>

          {/* Overlay info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
            <h3 className="text-white text-sm md:text-base font-semibold mb-1 truncate drop-shadow-md">
              {movie?.title}
            </h3>

            <div className="flex items-center text-gray-300 text-xs gap-3 mb-2">
              <span className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400" />
                {movie.vote_average != null
                  ? movie.vote_average.toFixed(1)
                  : "N/A"}
              </span>

              {movie.release_date && (
                <span>{movie.release_date.slice(0, 4)}</span>
              )}

              {movie.popularity != null && (
                <span className="flex items-center gap-1">
                  <Flame size={14} className="text-red-500" />
                  {movie.popularity.toFixed(0)}
                </span>
              )}
            </div>
          </div>

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
        </div>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent className="sm:max-w-4xl bg-black/95 border-0 mt-5 max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Poster Section */}
          <div className="md:col-span-1">
            <div className="relative w-full h-96 md:h-full cursor-pointer" onClick={handleImageClick}>
              {movie.poster_path || movie.backdrop_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${
                    movie.backdrop_path || movie.poster_path
                  }`}
                  alt={movie.title || "Movie Poster"}
                  fill
                  className="object-cover rounded-md hover:opacity-80 transition-opacity"
                  quality={75}
                  priority
                />
              ) : (
                <NoImageFallback text="No Image Available" />
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="md:col-span-2 space-y-4">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-white text-xl font-bold">{movie.title}</DialogTitle>
              {movie.original_title && movie.original_title !== movie.title && (
                <span className="text-gray-400 text-sm block">
                  Original Title: {movie.original_title}
                </span>
              )}
              <DialogDescription>
                {movie.overview || "No description available."}
              </DialogDescription>
            </DialogHeader>

            {/* Stats & Badges */}
            <div className="flex flex-wrap gap-2 mb-4 text-gray-400">
              <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-600/20 text-yellow-300 rounded text-sm">
                <Star size={14} />
                {movie.vote_average != null ? movie.vote_average.toFixed(1) : "N/A"}{" "}
                {movie.vote_count != null && `(${movie.vote_count} votes)`}
              </span>

              {movie.release_date && (
                <span className="px-2 py-0.5 bg-gray-700 text-white rounded text-sm">
                  Release: {movie.release_date}
                </span>
              )}

              {movie.popularity != null && (
                <span className="flex items-center gap-1 px-2 py-0.5 bg-red-600/20 text-red-400 rounded text-sm">
                  <Flame size={14} />
                  {movie.popularity.toFixed(0)}
                </span>
              )}

              {movie.original_language && (
                <span className="px-2 py-0.5 bg-gray-700 text-white rounded text-sm">
                  Language: {movie.original_language.toUpperCase()}
                </span>
              )}

              {movie.adult && (
                <span className="px-2 py-0.5 bg-red-600 text-white rounded text-xs font-bold">
                  18+
                </span>
              )}

              {movie.video && (
                <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-xs">
                  Video
                </span>
              )}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
              <DialogClose asChild className="cursor-pointer">
                <Button variant="outline" className="w-full sm:w-auto">
                  Close
                </Button>
              </DialogClose>
              <Link
                href={`/MovieDetails/${movie.id}`}
                className="flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
              >
                <Button className="bg-red-600 hover:bg-red-700 text-white w-full">
                  <Play size={16} />
                  See Movie Details
                </Button>
              </Link>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
