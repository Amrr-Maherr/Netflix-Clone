"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import FetchMultiSearch from "@/Api/FetchMultiSearch";
import CardMovie from "@/app/Components/CardMovie/CardMovie";
import CardTvShow from "@/app/Components/CardTvShow/CardTvShow";
import NetflixIntroLoader from "@/app/Components/Loading/NetflixIntroLoader";
import ErrorMessage from "@/app/Components/ErrorHandel/ErrorMessage";
import { Film, Tv } from "lucide-react";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState("all");

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ["search", query],
    queryFn: () => FetchMultiSearch({ query }),
    enabled: !!query,
  });

  // Filter results by media type
  const movies = searchResults?.filter((item: any) => item.media_type === "movie") || [];
  const tvShows = searchResults?.filter((item: any) => item.media_type === "tv") || [];
  const allResults = searchResults || [];

  const getDisplayResults = () => {
    switch (activeTab) {
      case "movies":
        return movies;
      case "tv":
        return tvShows;
      default:
        return allResults;
    }
  };

  if (!query) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Search</h1>
          <p className="text-gray-400">Enter a search query to find movies and TV shows</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <NetflixIntroLoader />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load search results" />;
  }

  const displayResults = getDisplayResults();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-400">
          Found {allResults.length} results
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 mb-6">
        <div className="flex gap-2 bg-gray-900 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "all"
                ? "bg-red-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            All ({allResults.length})
          </button>
          <button
            onClick={() => setActiveTab("movies")}
            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
              activeTab === "movies"
                ? "bg-red-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            <Film size={16} />
            Movies ({movies.length})
          </button>
          <button
            onClick={() => setActiveTab("tv")}
            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
              activeTab === "tv"
                ? "bg-red-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            <Tv size={16} />
            TV Shows ({tvShows.length})
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div className="px-6 pb-6">
        {displayResults.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No results found for "{query}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {displayResults.map((item: any) => {
              if (item.media_type === "movie") {
                return (
                  <div key={item.id}>
                    <CardMovie movie={item} />
                  </div>
                );
              } else if (item.media_type === "tv") {
                return (
                  <div key={item.id}>
                    <CardTvShow TvShow={item} />
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
