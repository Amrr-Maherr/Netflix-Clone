"use client"
import { useState } from "react";
import DynamicSlider from "./Components/Slider/DynamicSlider";

export default function Home() {
const slides = [
  {
    id: 1,
    title: "Batman v Superman: Dawn of Justice",
    teaser: "The world's finest heroes clash...",
    image: "/Assets/Slider/batman-v-superman-3840x2160-18724.jpg",
    buttonText: "Watch Now",
    link: "/AllMovies",
  },
  {
    id: 2,
    title: "Deadpool & Wolverine",
    teaser: "Two unlikely heroes team up...",
    image: "/Assets/Slider/deadpool-wolverine-3840x2160-17290.jpg",
    buttonText: "Learn More",
    link: "/AllMovies",
  },
  {
    id: 3,
    title: "Fast X",
    teaser: "The end of the road begins...",
    image: "/Assets/Slider/fast-x-vin-diesel-3840x2160-10266.jpg",
    buttonText: "Watch Trailer",
    link: "/AllMovies",
  },
  {
    id: 4,
    title: "Mission: Impossible - Dead Reckoning Part One",
    teaser: "Fate has other plans...",
    image: "/Assets/Slider/mission-impossible-3840x2160-11684.jpg",
    buttonText: "Rent Now",
    link: "/AllMovies",
  },
  {
    id: 5,
    title: "Spider-Man: Across the Spider-Verse",
    teaser: "Miles Morales returns...",
    image: "/Assets/Slider/spider-man-across-3840x2160-11595.jpg",
    buttonText: "Stream Now",
    link: "/AllMovies",
  },
  {
    id: 6,
    title: "Superman",
    teaser: "The Man of Steel soars...",
    image:
      "/Assets/Slider/superman-dc-superheroes-henry-cavill-dc-comics-black-3840x2160-8980.jpg",
    buttonText: "Discover More",
    link: "/AllMovies",
  },
  {
    id: 7,
    title: "The Flash",
    teaser: "Worlds collide...",
    image: "/Assets/Slider/the-flash-2023-3840x2160-11352.jpg",
    buttonText: "Buy Now",
    link: "/AllMovies",
  },
  {
    id: 8,
    title: "Thor: Love and Thunder",
    teaser: "The God of Thunder embarks...",
    image:
      "/Assets/Slider/thor-love-and-thunder-chris-hemsworth-as-thor-natalie-3840x2160-8772.jpg",
    buttonText: "Watch Free",
    link: "/AllMovies",
  },
  {
    id: 9,
    title: "Captain America",
    teaser: "A new force emerges...",
    image: "/Assets/Slider/thunderbolt-ross-3840x2160-19876.jpg",
    buttonText: "Explore",
    link: "/AllMovies",
  },
  {
    id: 10,
    title: "Thunderbolts",
    teaser: "Justice has a new team...",
    image: "/Assets/Slider/thunderbolts-5k-3840x2160-21282.jpg",
    buttonText: "See More",
    link: "/AllMovies",
  },
];
  return (
    <>
      <DynamicSlider moviesPoster={slides} />
    </>
  );
}
