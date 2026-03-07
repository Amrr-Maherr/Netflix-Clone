import React from "react";
import { Card } from "@/components/media/Card";
import Slider from "../Slider/Slider";
import { useVisibleSlidesCount } from "@/hooks/use-visible-slides";
import type { Movie, TVShow } from "@/types";

type DataListProps = {
  Data: (Movie | TVShow)[];
  isMovie: boolean;
};


export default function DataList({ Data, isMovie }: DataListProps) {
  const slidesCount = useVisibleSlidesCount();

  return (
    <Slider
      slidesPerView={slidesCount}
      slidesPerViewMobile={1.5}
      spaceBetween={20}
      swiperOptions={{ autoplay: { delay: 3000 }, loop: true }}
    >
      {isMovie
        ? (Data as Movie[])?.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              type="movie"
              title={movie.title}
              posterUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null}
              releaseDate={movie.release_date}
              rating={movie.vote_average || 0}
              genres={(movie as any).genres?.map((g: any) => g.name) || []}
              language={movie.original_language}
              overview={movie.overview}
            />
          ))
        : (Data as TVShow[])?.map((show) => (
            <Card
              key={show.id}
              id={show.id}
              type="tv"
              title={show.name}
              posterUrl={show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : null}
              firstAirDate={show.first_air_date}
              rating={show.vote_average || 0}
              genres={(show as any).genres?.map((g: any) => g.name) || []}
              language={show.original_language}
              overview={show.overview}
            />
          ))}
    </Slider>
  );
}
