"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import FetchMultiSearch from "@/Api/FetchMultiSearch";
import CardMovie from "@/app/Components/CardMovie/CardMovie";
import CardTvShow from "@/app/Components/CardTvShow/CardTvShow";
import NetflixIntroLoader from "@/app/Components/Loading/NetflixIntroLoader";
import ErrorMessage from "@/app/Components/ErrorHandel/ErrorMessage";
import { Search, Film, Tv, X } from "lucide-react";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const newUrl = `/search?q=${encodeURIComponent(searchInput.trim())}`;
      window.location.href = newUrl;
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    window.location.href = "/";
  };

  if (!query) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-2xl px-6">
          <div className="mb-8">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Search Netflix</h1>
            <p className="text-gray-400 text-lg">
              Find movies, TV shows, documentaries and more
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search for movies, TV shows..."
                className="w-full h-14 px-6 bg-zinc-900 text-white border-zinc-800 focus:border-red-600 focus:ring-red-600 text-lg placeholder:text-zinc-500 rounded-lg focus:outline-none transition-colors"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance", "Thriller", "Documentary"].map((genre) => (
              <button
                key={genre}
                onClick={() => {
                  setSearchInput(genre);
                  const newUrl = `/search?q=${encodeURIComponent(genre)}`;
                  window.location.href = newUrl;
                }}
                className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-white h-12 px-4 rounded-lg transition-colors"
              >
                {genre}
              </button>
            ))}
          </div>
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

  return (
    <div className="min-h-screen bg-black">
      {/* Simple Header */}

      {/* Results Content */}
      <div className="md:py-10 py-20 container">
        <SearchResultsGrid 
          results={activeTab === "all" ? allResults : activeTab === "movies" ? movies : tvShows}
          title={activeTab === "all" ? "All Results" : activeTab === "movies" ? "Movies" : "TV Shows"}
        />
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<NetflixIntroLoader />}>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchResultsGrid({ results, title }: { results: any[]; title: string }) {
  if (results.length === 0) {
    return (
      <div className="text-center py-20 h-screen flex items-center justify-center flex-col">
        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search size={32} className="text-zinc-600" />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">
          No results found
        </h2>
        <p className="text-zinc-400 mb-6">
          Try searching with different keywords
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-20">
      {/* Netflix-style Grid */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-6">{title}</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {results.map((item: any) => {
          if (item.media_type === "movie") {
            return (
              <div key={item.id} className="transform transition-all duration-300 hover:scale-105 hover:z-10">
                <CardMovie movie={item} />
              </div>
            );
          } else if (item.media_type === "tv") {
            return (
              <div key={item.id} className="transform transition-all duration-300 hover:scale-105 hover:z-10">
                <CardTvShow TvShow={item} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
