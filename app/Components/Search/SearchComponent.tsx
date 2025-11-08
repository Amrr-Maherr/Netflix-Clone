"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import FetchMultiSearch from "@/Api/FetchMultiSearch";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

type ResultItem = {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  poster_path?: string;
  profile_path?: string;
  release_date?: string;
  first_air_date?: string;
};

export default function SearchComponent() {
  const [query, setQuery] = useState<string>("");

  const { data, isLoading, isError } = useQuery<ResultItem[]>({
    queryKey: ["Search", query],
    queryFn: () => FetchMultiSearch({ query }),
    enabled: !!query,
    retry: 1,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-5 ml-auto cursor-pointer">
          <Search className="text-white w-6 h-6" />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[825px] w-full bg-black/90 backdrop-blur-md border-0 z-999 p-6 rounded-md">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-white text-2xl font-bold">
            Search
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Type to find movies, shows, or actors.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Input
            id="search"
            name="search"
            placeholder="Search for a movie, show, or actor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-red-600 focus:border-transparent text-lg p-4"
          />
        </div>

        <div className="mt-6 max-h-96 overflow-y-auto scrollbar-custom">
          {isLoading ? (
            <p className="text-gray-400">Loading...</p>
          ) : isError ? (
            <p className="text-red-400">
              Something went wrong. Please try again.
            </p>
          ) : data && data.length > 0 ? (
            data.map((item) => (
              <Link
                href={
                  item.media_type === "movie"
                    ? `/MovieDetails/${item.id}`
                    : item.media_type === "tv"
                    ? `/TvShowDetails/${item.id}`
                    : item.media_type === "person"
                    ? `/ActorDetails/${item.id}`
                    : `#`
                }
                key={item.id}
              >
                <div className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer">
                  <Image
                    width={100}
                    height={100}
                    priority
                    quality={75}
                    src={
                      item.poster_path || item.profile_path
                        ? `https://image.tmdb.org/t/p/w92${
                            item.poster_path || item.profile_path
                          }`
                        : "https://via.placeholder.com/92x138?text=No+Image"
                    }
                    alt={item.title || item.name || "No title"}
                    className="w-20 h-28 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-white font-semibold">
                      {item.title || item.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {item.media_type.charAt(0).toUpperCase() +
                        item.media_type.slice(1)}
                    </p>
                    {item.release_date && (
                      <p className="text-gray-400 text-sm">
                        {item.release_date}
                      </p>
                    )}
                    {item.first_air_date && (
                      <p className="text-gray-400 text-sm">
                        {item.first_air_date}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : query ? (
            <p className="text-gray-400">No results found.</p>
          ) : (
            <p className="text-gray-400">Start typing to search.</p>
          )}
        </div>

        <DialogFooter>
          <DialogClose className="mt-4 text-red-600 hover:text-red-500 cursor-pointer">
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
