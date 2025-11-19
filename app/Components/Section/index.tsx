"use client";
import React, { useEffect, useRef } from "react";
import DataList from "./DataList";
import SplitText from "../Animations/SplitText";
import RotatingText from "../Animations/RotatingText";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Movie = {
  id: number;
  title: string;
  poster_path: string;
};

type IndexProps = {
  Data: Movie[];
  title: string;
  animationText?: [];
  isMovie: boolean;
};

export default function Index({ Data, title, isMovie }: IndexProps) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: false,
          once: false,
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="container mx-auto px-4">
      <div className="my-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
        <SplitText
          text={title || "Netflix Section"}
          className="text-3xl md:text-5xl font-extrabold tracking-tight text-white uppercase drop-shadow-md"
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

        <RotatingText
          texts={[
            "Trending Now",
            "Popular on Netflix",
            "Top Picks for You",
            "Only on Netflix",
            "New Releases",
            "Because You Watched",
            "Must Watch",
            "Binge-Worthy",
            "Fan Favorites",
            "Critically Acclaimed",
            "Epic Stories",
            "Blockbusters",
            "Watch Again",
            "Hidden Gems",
            "Recently Added",
            "Action & Adventure",
            "Thrilling Series",
            "Feel-Good Movies",
            "Netflix Originals",
            "Unmissable Hits",
          ]}
          className="text-2xl md:text-4xl font-bold text-red-600 uppercase tracking-wide drop-shadow-sm"
          staggerFrom={"random"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden pb-1"
          transition={{ type: "spring", damping: 25, stiffness: 150 }}
          rotationInterval={2000}
          loop
        />
      </div>

      <DataList Data={Data} isMovie={isMovie} />
    </section>
  );
}
