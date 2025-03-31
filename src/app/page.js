"use client";
import { useState } from "react";
import DynamicSlider from "./Components/PosterSlider/DynamicSlider";

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
    {
      id: 11,
      title: "Avatar: The Way of Water",
      teaser: "Return to Pandora...",
      image: "/Assets/Slider/avatar-the-way-of-water-3840x2160-8995.jpg.jpg",
      buttonText: "Stream Now",
      link: "/AllMovies",
    },
    {
      id: 12,
      title: "Black Adam",
      teaser: "The world needed a hero...",
      image: "/Assets/Slider/black-adam-dc-comics-4k-3840x2160-9236.jpg.jpg",
      buttonText: "Rent Now",
      link: "/AllMovies",
    },
    {
      id: 13,
      title: "Guardians of the Galaxy Vol. 3",
      teaser: "The Guardians face their final mission...",
      image:
        "/Assets/Slider/guardians-of-the-galaxy-vol-3-2023-marvel-4k-3840x2160-11748.jpg.jpg",
      buttonText: "Watch Now",
      link: "/AllMovies",
    },
    {
      id: 14,
      title: "John Wick: Chapter 4",
      teaser: "No rules. No friends. No escape...",
      image: "/Assets/Slider/john-wick-chapter-4-4k-3840x2160-11011.jpg.jpg",
      buttonText: "Buy Now",
      link: "/AllMovies",
    },
    {
      id: 15,
      title: "Oppenheimer",
      teaser: "The world will remember his name...",
      image: "/Assets/Slider/oppenheimer-movie-2023-4k-3840x2160-16488.jpg.jpg",
      buttonText: "Explore",
      link: "/AllMovies",
    },
    {
      id: 16,
      title: "End Game",
      teaser: "Higher. Further. Faster. Together...",
      image:
        "/Assets/Slider/the-marvels-2023-marvel-studios-4k-3840x2160-17646.jpg.jpg",
      buttonText: "See More",
      link: "/AllMovies",
    },
    {
      id: 17,
      title: "Aquaman and the Lost Kingdom",
      teaser: "The tide is turning...",
      image:
        "/Assets/Slider/aquaman-and-the-lost-kingdom-2023-dc-3840x2160-17865.jpg.jpg",
      buttonText: "Discover",
      link: "/AllMovies",
    },
    {
      id: 18,
      title: "Wonka",
      teaser: "Every good thing in this world...",
      image: "/Assets/Slider/wonka-2023-movie-4k-3840x2160-17897.jpg.jpg",
      buttonText: "Watch Trailer",
      link: "/AllMovies",
    },
    {
      id: 19,
      title: "Dune: Part Two",
      teaser: "Beyond fear, destiny awaits...",
      image: "/Assets/Slider/dune-part-two-movie-4k-3840x2160-18922.jpg.jpg",
      buttonText: "See Details",
      link: "/AllMovies",
    },
    {
      id: 20,
      title: "Godzilla x Kong: The New Empire",
      teaser: "Witness the rise of a new empire...",
      image:
        "/Assets/Slider/godzilla-x-kong-the-new-empire-movie-3840x2160-21358.jpg.jpg",
      buttonText: "Get Tickets",
      link: "/AllMovies",
    },
    {
      id: 21,
      title: "Kung Fu Panda 4",
      teaser: "Po returns for a new adventure...",
      image: "/Assets/Slider/kung-fu-panda-4-movie-2024-3840x2160-20128.jpg.jpg",
      buttonText: "Watch Now",
      link: "/AllMovies",
    },
    {
      id: 22,
      title: "Ghostbusters: Frozen Empire",
      teaser: "This summer, something freezing is coming...",
      image:
        "/Assets/Slider/ghostbusters-frozen-empire-movie-4k-3840x2160-20292.jpg.jpg",
      buttonText: "Learn More",
      link: "/AllMovies",
    },
    {
      id: 23,
      title: "Kingdom of the Planet of the Apes",
      teaser: "What a wonderful day...",
      image:
        "/Assets/Slider/kingdom-of-the-planet-of-the-apes-movie-3840x2160-21636.jpg.jpg",
      buttonText: "Discover",
      link: "/AllMovies",
    },
    {
      id: 24,
      title: "Furiosa: A Mad Max Saga",
      teaser: "Witness the origins of a legend...",
      image:
        "/Assets/Slider/furiosa-a-mad-max-saga-movie-4k-3840x2160-21637.jpg.jpg",
      buttonText: "Explore",
      link: "/AllMovies",
    },
  ];
  console.log(slides);
  
  const [moviesPoster, setmoviesPoster] = useState(slides);
  return (
    <>
      <DynamicSlider moviesPoster={moviesPoster} />
    </>
  );
}
