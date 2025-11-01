import React from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

type IndexProps = {
  Data: Movie[];
};

export default function Index({ Data }: IndexProps) {
  return (
    <section className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Data?.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto"
            />
            <h3 className="text-white mt-2 text-sm font-medium">
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
