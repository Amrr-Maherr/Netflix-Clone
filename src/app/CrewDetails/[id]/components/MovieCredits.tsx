"use client";

import Slider from "@/app/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import { Card } from "@/components/media/Card";
import { useVisibleSlidesCount } from "@/hooks/use-visible-slides";

export default function MovieCredits({ movies }: { movies: any[] }) {
  const slidesCount = useVisibleSlidesCount();

  if (!movies?.length) return null;

  return (
    <div className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Movie Credits ({movies.length})
      </h2>
      <Slider slidesPerView={slidesCount} slidesPerViewMobile={1.5} spaceBetween={16}>
        {movies.map((movie) => (
          <SwiperSlide key={movie.credit_id || movie.id}>
            <Card
              id={movie.id}
              type="movie"
              title={movie.title}
              posterUrl={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null}
              releaseDate={movie.release_date}
              rating={movie.vote_average || 0}
              genres={movie.genres?.map((g: any) => g.name) || []}
              language={movie.original_language}
              overview={movie.overview}
            />
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
}
