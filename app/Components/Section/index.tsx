import React from "react";
import DataList from "./DataList";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

type IndexProps = {
  Data: Movie[];
  title: string;
  isMovie:boolean
};

export default function Index({ Data, title, isMovie }: IndexProps) {
  return (
    <section className="container">
      <div className="my-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white truncate">
          {title || "title"}
        </h1>
      </div>
      <DataList Data={Data} isMovie={isMovie} />
    </section>
  );
}
