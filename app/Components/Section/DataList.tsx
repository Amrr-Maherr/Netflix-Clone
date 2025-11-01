import React from "react";
import CardMovie from "../CardMovie/CardMovie";
import CardTvShow from "../CardTvShow/CardTvShow";

type Movie = {
  id: number;
  title?: string;
  name?: string; // TV shows often use "name" instead of "title"
  poster_path: string;
  vote_average?: number;
  release_date?: string;
  overview?: string;
};

type DataListProps = {
  Data: Movie[];
  isMovie: boolean;
};

export default function DataList({ Data, isMovie }: DataListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-6 md:gap-8">
      {isMovie
        ? Data?.map((movie) => (
            <CardMovie
              key={movie.id}
              movie={{
                ...movie,
                title: movie.title ?? movie.name ?? "Untitled",
                vote_average: movie.vote_average ?? 0,
                overview: movie.overview ?? "No overview available",
              }}
            />
          ))
        : Data?.map((show) => (
            <CardTvShow
              key={show.id}
              TvShow={{
                ...show,
                name: show.name ?? show.title ?? "Unknown Show",
                vote_average: show.vote_average ?? 0,
                overview: show.overview ?? "No overview available",
              }}
            />
          ))}
    </div>
  );
}
