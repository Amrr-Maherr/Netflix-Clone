"use client";

import Slider from "@/app/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import { Card } from "@/components/media/Card";
import { useVisibleSlidesCount } from "@/hooks/use-visible-slides";

export default function CombinedCredits({ credits }: { credits: any[] }) {
  const slidesCount = useVisibleSlidesCount();

  if (!credits?.length) return null;

  return (
    <div className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Combined Credits ({credits.length})
      </h2>
      <Slider slidesPerView={slidesCount} slidesPerViewMobile={1.5} spaceBetween={16}>
        {credits.map((item) => (
          <SwiperSlide key={item.credit_id || item.id}>
            {item.media_type === "movie" ? (
              <Card
                id={item.id}
                type="movie"
                title={item.title}
                posterUrl={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null}
                releaseDate={item.release_date}
                rating={item.vote_average || 0}
                genres={item.genres?.map((g: { name: string }) => g.name) || []}
                language={item.original_language}
                overview={item.overview}
              />
            ) : (
              <Card
                id={item.id}
                type="tv"
                title={item.name}
                posterUrl={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null}
                firstAirDate={item.first_air_date}
                rating={item.vote_average || 0}
                genres={item.genres?.map((g: { name: string }) => g.name) || []}
                language={item.original_language}
                overview={item.overview}
              />
            )}
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
}
