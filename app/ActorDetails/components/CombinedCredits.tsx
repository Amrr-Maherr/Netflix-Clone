"use client";

import Slider from "@/app/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import CardMovie from "@/app/Components/CardMovie/CardMovie";
import CardTvShow from "@/app/Components/CardTvShow/CardTvShow";
import { useVisibleSlidesCount } from "@/lib/useVisibleSlidesCount";

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
              <CardMovie movie={item} />
            ) : (
              <CardTvShow TvShow={item} />
            )}
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
}
