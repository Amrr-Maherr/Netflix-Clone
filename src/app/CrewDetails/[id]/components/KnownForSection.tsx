"use client";

import Slider from "@/app/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import { Card } from "@/components/media/Card";
import { useVisibleSlidesCount } from "@/hooks/use-visible-slides";

export default function KnownForSection({ items }: { items: any[] }) {
  const slidesCount = useVisibleSlidesCount();

  if (!items?.length) return null;

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-white mb-6">Known For</h2>
      <Slider slidesPerView={slidesCount} slidesPerViewMobile={1.5} spaceBetween={12}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <Card
              id={item.id}
              type={item.media_type === "movie" ? "movie" : "tv"}
              title={item.title || item.name}
              posterUrl={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null}
              releaseDate={item.release_date}
              firstAirDate={item.first_air_date}
              rating={item.vote_average || 0}
              genres={item.genres?.map((g: any) => g.name) || []}
              language={item.original_language}
              overview={item.overview}
            />
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
}
