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
        className="flex items-center gap-4 p-2 w-full mb-2 rounded-md cursor-pointer
                   bg-white/10 backdrop-blur-md border border-white/20"
      >
        <div className="overflow-hidden w-20 h-28 rounded-md flex-shrink-0 relative">
          {imageSrc ? (
            <Image
              width={100}
              height={100}
              priority
              quality={75}
              src={imageSrc}
              alt={item.title || item.name || "No title"}
              className="w-full h-full object-cover rounded-md transform transition-transform duration-300 hover:scale-110"
            />
          ) : (
            <NoImageFallback text="No Image Available" />
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-white font-semibold text-sm md:text-base">
            {item.title || item.name}
          </p>
          <p className="text-gray-200 text-xs md:text-sm">
            {mediaTypeFormatted}
          </p>
          {date && <p className="text-gray-200 text-xs md:text-sm">{date}</p>}
        </div>
      </Link>
    </DialogClose>
  );
}
