import React from "react";
import DataList from "./DataList";
import SplitText from "../Animations/SplitText";

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
        <SplitText
          text={title || "title"}
          className="text-3xl md:text-5xl font-bold mb-4 text-white text-start md:text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          tag="h1"
        />
      </div>
      <DataList Data={Data} isMovie={isMovie} />
    </section>
  );
}
