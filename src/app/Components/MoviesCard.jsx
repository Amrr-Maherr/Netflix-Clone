import Link from "next/link";
import { motion } from "framer-motion";

export default function Card({ movie }) {
  return (
    <Link href={`/movie/${movie.id}`} className="mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
        className="w-64 m-4 rounded-md overflow-hidden shadow-md bg-gray-800 text-white cursor-pointer"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={256}
          height={384}
          className="w-full h-auto object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-400 line-clamp-3">{movie.overview}</p>
          <p className="text-xs text-gray-500 mt-2">
            Vote Average: {movie.vote_average}
          </p>
          <p className="text-xs text-gray-500">
            Release Date: {movie.release_date}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
