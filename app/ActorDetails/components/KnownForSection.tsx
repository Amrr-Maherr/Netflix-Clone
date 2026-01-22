"use client";

import Slider from "@/app/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import CardMovie from "@/app/Components/CardMovie/CardMovie";
import CardTvShow from "@/app/Components/CardTvShow/CardTvShow";
import { useVisibleSlidesCount } from "@/lib/useVisibleSlidesCount";

export default function KnownForSection({ items }: { items: any[] }) {
  const slidesCount = useVisibleSlidesCount();

  if (!items?.length) return null;

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-white mb-6">Known For</h2>
      <Slider slidesPerView={slidesCount} slidesPerViewMobile={1.5} spaceBetween={12}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
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
