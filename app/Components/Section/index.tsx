import React from "react";
import DataList from "./DataList";
import SplitText from "../Animations/SplitText";
import RotatingText from "../Animations/RotatingText";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

type IndexProps = {
  Data: Movie[];
  title: string;
  animationText?: [];
  isMovie:boolean
};

export default function Index({ Data, title, isMovie, animationText }: IndexProps) {
  return (
    <section className="container">
      <div className="my-10 flex items-center justify-end flex-row-reverse gap-2 flex-wrap">
        <RotatingText
          texts={[
            "Trending",
            "Popular",
            "Top Rated",
            "Must Watch",
            "New",
            "Hot",
            "Blockbuster",
            "Binge",
            "Epic",
            "Critics' Choice",
            "Fan Favorite",
            "Now Showing",
            "Action",
            "Drama",
            "Comedy",
            "Thriller",
            "Adventure",
            "Unmissable",
          ]}
          mainClassName="text-3xl md:text-5xl font-bold mb-4 text-white text-start! bg-red-500 p-2 rounded-lg"
          staggerFrom={"random"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
          rotationInterval={2000}
        />
        <SplitText
          text={title || "title"}
          className="text-3xl md:text-5xl font-bold mb-4 text-white text-start!"
          delay={100}
          duration={0.2}
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
