import React from "react";
import CardMovie from "../CardMovie/CardMovie";
import CardTvShow from "../CardTvShow/CardTvShow";
import Slider from "../Slider/Slider";
import { useVisibleSlidesCount } from "../../../lib/useVisibleSlidesCount";
import type { Movie, TVShow } from "@/Types";

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
            <CardMovie
              key={movie.id}
              movie={movie}
            />
          ))
        : (Data as TVShow[])?.map((show) => (
            <CardTvShow
              key={show.id}
              TvShow={show}
            />
          ))}
    </Slider>
  );
}
