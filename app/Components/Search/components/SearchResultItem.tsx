"use client";

import { DialogClose } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import NoImageFallback from "../../NoImageFallback/NoImageFallback";
import { ResultItem } from "../SearchComponent";


export default function SearchResultItem({ item }: { item: ResultItem }) {
  const linkHref =
    item.media_type === "movie"
      ? `/MovieDetails/${item.id}`
      : item.media_type === "tv"
      ? `/TvShowDetails/${item.id}`
      : item.media_type === "person"
      ? `/ActorDetails/${item.id}`
      : "#";

  const imageSrc =
    item.poster_path || item.profile_path
      ? `https://image.tmdb.org/t/p/w92${item.poster_path || item.profile_path}`
      : null;

  const mediaTypeFormatted =
    item.media_type.charAt(0).toUpperCase() + item.media_type.slice(1);

  const date = item.release_date || item.first_air_date;

  return (
    <DialogClose asChild>
      <Link
        href={linkHref}
        className="flex items-center gap-6 p-4 w-full mb-3 rounded-lg cursor-pointer
                   bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10
                   transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
      >
        <div className="overflow-hidden w-24 h-36 rounded-lg flex-shrink-0 relative shadow-md">
          {imageSrc ? (
            <Image
              width={100}
              height={100}
              priority
              quality={100}
              src={imageSrc}
              alt={item.title || item.name || "No title"}
              className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <NoImageFallback text="No Image" />
          )}
        </div>

        <div className="flex flex-col justify-center flex-1">
          <p className="text-white font-bold text-lg md:text-xl mb-1">
            {item.title || item.name}
          </p>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-300 bg-white/20 px-2 py-1 rounded-full">
              {mediaTypeFormatted}
            </span>
            {date && (
              <span className="text-gray-400">
                {new Date(date).getFullYear()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </DialogClose>
  );
}
