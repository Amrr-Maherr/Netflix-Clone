"use client";

import Slider from "@/app/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import CardMovie from "@/app/Components/CardMovie/CardMovie";
import { useVisibleSlidesCount } from "@/lib/useVisibleSlidesCount";

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
            <CardMovie movie={movie} />
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
}
