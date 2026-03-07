"use client";

import Slider from "@/app/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import { Card } from "@/components/media/Card";
import { useVisibleSlidesCount } from "@/hooks/use-visible-slides";

export default function TvCredits({ shows }: { shows: any[] }) {
  const slidesCount = useVisibleSlidesCount();

  if (!shows?.length) return null;

  return (
    <div className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        TV Credits ({shows.length})
      </h2>
      <Slider slidesPerView={slidesCount} slidesPerViewMobile={1.5} spaceBetween={16}>
        {shows.map((show) => (
          <SwiperSlide key={show.credit_id || show.id}>
            <Card
              id={show.id}
              type="tv"
              title={show.name}
              posterUrl={show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : null}
              firstAirDate={show.first_air_date}
              rating={show.vote_average || 0}
              genres={show.genres?.map((g: any) => g.name) || []}
              language={show.original_language}
              overview={show.overview}
            />
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
}
