"use client";

import Slider from "@/app/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import CardTvShow from "@/app/Components/CardTvShow/CardTvShow";

export default function TvCredits({ shows }: { shows: any[] }) {
  if (!shows?.length) return null;

  return (
    <div className="mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        TV Credits ({shows.length})
      </h2>
      <Slider slidesPerView={6} slidesPerViewMobile={1.5} spaceBetween={16}>
        {shows.map((show) => (
          <SwiperSlide key={show.credit_id || show.id}>
            <CardTvShow TvShow={show} />
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
}
