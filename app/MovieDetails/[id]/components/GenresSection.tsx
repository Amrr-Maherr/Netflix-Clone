"use client";

import { useRouter } from "next/navigation";

interface Genre {
  id: number;
  name: string;
}

interface GenresSectionProps {
  genres: Genre[];
}

export default function GenresSection({ genres }: GenresSectionProps) {
  const router = useRouter();

  if (!genres?.length) return null;

  const handleGenreClick = (genre: Genre) => {
    const searchQuery = encodeURIComponent(genre.name);
    router.push(`/search?q=${searchQuery}`);
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-6">Genres</h2>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre)}
            className="px-4 py-2 bg-red-600/80 hover:bg-red-600 text-white rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-600/25 border border-red-500/50 hover:border-red-400 cursor-pointer"
          >
            {genre.name}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Click on any genre to find similar content
      </p>
    </section>
  );
}
