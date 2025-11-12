import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Star, Flame, Play } from "lucide-react";
import NoImageFallback from "../NoImageFallback/NoImageFallback";
import Logo from "../../../public/Netflix_Symbol_RGB.png";
type MovieData = {
  id: number;
  title?: string;
  poster_path?: string;
  vote_average?: number | null;
  popularity?: number;
  overview?: string;
  release_date?: string;
};

type CardMovieProps = {
  movie: MovieData;
};

export default function CardMovie({ movie }: CardMovieProps) {
  return (
    <Link href={`/MovieDetails/${movie.id}`} className="h-full">
      <div className="relative bg-zinc-900 rounded-md h-full overflow-hidden group cursor-pointer transform transition-all duration-500 hover:z-20">
        {/* Poster */}
          <div className="relative w-full h-0 pb-[150%]">
            <div className="absolute top-0  z-50">
              <Image width={50} height={50} priority src={Logo.src} alt="" />
            </div>
            {movie?.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={movie.title || "Movie Poster"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                quality={75}
                loading="lazy"
              />
            ) : (
              <NoImageFallback text="No Image Available" />
            )}
          </div>

        {/* Netflix-like fade overlay */}
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
              <span>{movie.release_date?.slice(0, 4)}</span>
            )}

            {movie.popularity && (
              <span className="flex items-center gap-1">
                <Flame size={14} className="text-red-500" />
                {movie?.popularity.toFixed(0)}
              </span>
            )}
          </div>

          <p className="text-gray-300 text-xs mb-3 line-clamp-3 leading-snug">
            {movie?.overview}
          </p>

          <Button className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1.5 rounded-sm w-fit transition-all duration-300 flex items-center gap-1">
            <Play size={14} />
            Play
          </Button>
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
      </div>
    </Link>
  );
}
