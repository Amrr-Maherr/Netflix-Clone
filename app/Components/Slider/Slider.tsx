"use client";
import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import { SwiperOptions } from "swiper/types";

interface SliderProps {
  children: ReactNode;
  slidesPerView?: number;
  slidesPerViewMobile?: number;
  spaceBetween?: number;
  className?: string;
  swiperOptions?: SwiperOptions;
  modules?: any[];
  useFadeEffect?: boolean;
}

export default function Slider({
  children,
  slidesPerView = 4,
  slidesPerViewMobile = 1,
  spaceBetween = 20,
  className,
  swiperOptions = {},
  modules = [Pagination, Autoplay],
  useFadeEffect = false,
}: SliderProps) {
  const effect = useFadeEffect ? "fade" : "slide";
  const activeModules = useFadeEffect ? [...modules, EffectFade] : modules;

  return (
    <Swiper
      slidesPerView={slidesPerViewMobile}
      spaceBetween={spaceBetween}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        ...(swiperOptions.autoplay as any),
      }}
      loop={swiperOptions.loop ?? true}
      pagination={swiperOptions.pagination ?? false}
      speed={swiperOptions.speed ?? 800}
      effect={effect}
      fadeEffect={useFadeEffect ? { crossFade: true } : undefined}
      modules={activeModules}
      breakpoints={{
        640: { slidesPerView: Math.min(slidesPerView, 2), spaceBetween },
        768: { slidesPerView: Math.min(slidesPerView, 3), spaceBetween },
        1024: { slidesPerView, spaceBetween },
        ...swiperOptions.breakpoints,
      }}
      className={`mySwiper ${className || ""}`}
      {...swiperOptions}
    >
      {React.Children.map(children, (child, index) => (
        <SwiperSlide key={index} className="flex justify-center">
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
