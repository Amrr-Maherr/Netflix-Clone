import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star, Flame, Play } from "lucide-react";
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
import { MovieData } from "@/app/Data/MovieData";

type CardMovieProps = {
  movie: MovieData;
};

export default function CardMovie({ movie }: CardMovieProps) {
  console.dir(movie,"movie")
  return (
    <Dialog>
      {/* Card as trigger */}
      <DialogTrigger asChild>
        <div className="relative bg-zinc-900 rounded-md h-full overflow-hidden group cursor-pointer transform transition-all duration-500 hover:z-20">
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
      <DialogContent className="sm:max-w-md bg-black border-0 mt-5">
        <DialogHeader>
          <DialogTitle className="text-white">{movie.title}</DialogTitle>
          {movie.original_title && movie.original_title !== movie.title && (
            <span className="text-gray-400 text-sm block">
              Original Title: {movie.original_title}
            </span>
          )}
          <DialogDescription>
            {movie.overview || "No description available."}
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 relative w-full h-64">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${
                movie.backdrop_path || movie.poster_path
              }`}
              alt={movie.title || "Movie Poster"}
              fill
              className="object-cover rounded-md"
              quality={75}
              priority
            />
          ) : (
            <NoImageFallback text="No Image Available" />
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-between text-sm text-gray-500 mb-4 gap-2">
          <span className="flex items-center gap-1">
            <Star size={14} className="inline text-yellow-400" />{" "}
            {movie.vote_average != null ? movie.vote_average.toFixed(1) : "N/A"}{" "}
            {movie.vote_count != null && `(${movie.vote_count} votes)`}
          </span>

          {movie.release_date && <span>Release: {movie.release_date}</span>}

          {movie.popularity != null && (
            <span className="flex items-center gap-1">
              <Flame size={14} className="inline text-red-500" />{" "}
              {movie.popularity.toFixed(0)}
            </span>
          )}

          {movie.original_language && (
            <span>Language: {movie.original_language}</span>
          )}

          {movie.adult && (
            <span className="px-2 py-0.5 bg-red-600 text-white rounded text-xs">
              18+
            </span>
          )}

          {movie.video && (
            <span className="px-2 py-0.5 bg-blue-600 text-white rounded text-xs">
              Video Available
            </span>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild className="cursor-pointer">
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Link
            href={`/MovieDetails/${movie.id}`}
            className="flex items-center justify-center gap-2 cursor-pointer"
          >
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              <Play size={16} />
              See Movie Details
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
