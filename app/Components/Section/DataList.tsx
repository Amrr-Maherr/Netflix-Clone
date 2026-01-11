import React from "react";
import CardMovie from "../CardMovie/CardMovie";
import CardTvShow from "../CardTvShow/CardTvShow";
import Slider from "../Slider/Slider";
import "./DataList.css"; // Import the custom CSS file

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
  arrowSizeClass?: string; // Class to control arrow icon size
  fixedArrows?: boolean; // Whether to show fixed arrows
};

export default function DataList({ Data, isMovie, arrowSizeClass = "", fixedArrows = false }: DataListProps) {
  const sliderClasses = [arrowSizeClass];
  if (fixedArrows) {
    sliderClasses.push("swiper-arrows-fixed");
  }

  return (
    <Slider
      slidesPerView={6}
      slidesPerViewMobile={1.5}
      spaceBetween={20}
      className={sliderClasses.join(" ")} // Pass the arrow classes to the slider
      swiperOptions={{ autoplay: { delay: 3000 }, loop: true }}
      showNavigation={true}
    >
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
    </Slider>
  );
}
