"use client";
import React from "react";
import { MovieData } from "../Types/types";
import BentoCard from "./BentoCard";

interface BentoGridProps {
  movies: MovieData[];
  start?: number;
  end?: number;
}

export default function BentoGrid({ movies, start = 0, end = 6 }: BentoGridProps) {
  const displayMovies = movies.slice(start, end);

  return (
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[120px] md:auto-rows-[180px]">
        {displayMovies.map((movie, index) => {
          const isLarge = index === 0 || index === 3;
          return (
            <BentoCard
              key={movie.id}
              movie={movie}
              className={
                isLarge
                  ? "col-span-2 md:col-span-2 md:row-span-2"
                  : "col-span-1 md:col-span-1 md:row-span-1"
              }
            />
          );
        })}
      </div>
    </div>
  );
}
